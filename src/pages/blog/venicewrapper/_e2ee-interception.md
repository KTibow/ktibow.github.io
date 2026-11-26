# Who can read Venice's "end-to-end encrypted" prompts?

Short version, for Venice's E2EE models that are routed through Phala's gateway (the `-p` models):

- **Whoever runs Venice's API can read the replies and inject messages, and the user gets no warning.** Venice's API sits between the user and Phala's TEE, outside the TEE. The protocol gives the TEE no way to tell which reply key, or which messages, actually came from the user.
- **Network attackers can't.** The connection is TLS, and the TEE really does decrypt the prompts. Someone who can only see or tamper with TLS traffic gets nothing.
- **So this is a design property, not a secret bug.** It follows from code Phala publishes and from Venice's published docs, and NEAR AI has already fixed the reply-key half of it in its own proxy, in public. The parties who can exploit it are the ones E2EE is supposed to protect users from: Venice, its staff, its CDN, whoever compromises them, or whoever can legally compel them. Privately disclosing it would mean telling the operators about their own protocol.

Everything below is checkable. Code links are pinned to a commit:

- Phala's gateway: [`Dstack-TEE/private-ai-gateway` @ `9f3e693`](https://github.com/Dstack-TEE/private-ai-gateway/tree/9f3e693befca172c0672fc3af551cab253570540), 19 Nov 2026
- Venice's docs: [`veniceai/api-docs` @ `28d5757`](https://github.com/veniceai/api-docs/tree/28d57570565f7cb70e91a982b3ef5d0befb7c942), 26 Nov 2026 UTC

## The path a request takes

```
your client --TLS--> api.venice.ai --TLS--> Phala gateway (TEE) --TLS--> upstream GPU
                     (Venice's servers,     (decrypts your prompt)       (picked at runtime)
                      Cloudflare in front,
                      no attestation)
```

`api.venice.ai` answers with `server: cloudflare` (check with `curl -sI https://api.venice.ai/api/v1/models`). Venice publishes attestation for the model enclaves, but none for its API.

E2EE is supposed to make the middle box irrelevant. Venice's docs: "Your client encrypts the prompt before sending it. Venice relays ciphertext, and only the verified TEE decrypts it." ([privacy.mdx L54](https://github.com/veniceai/api-docs/blob/28d57570565f7cb70e91a982b3ef5d0befb7c942/overview/privacy.mdx?plain=1#L54)). Venice's founder, [replying on X on 25 Nov 2026](https://x.com/ErikVoorhees/status/2125823429370941902) to this exact claim: "There has been no demonstrated vulnerability. [...] The purpose of these technologies is that even if Venice wanted to, it could not view or tamper your prompts."

## "The middle is all inside the TEE": no

A Phala representative replied that the middle is inside the TEE. Only the Phala gateway is. The step that hands your public key to the TEE happens outside it:

- Venice's docs tell clients to send the key to `api.venice.ai` as **`X-Venice-TEE-Client-Pub-Key`** ([tee-e2ee-models.mdx L182](https://github.com/veniceai/api-docs/blob/28d57570565f7cb70e91a982b3ef5d0befb7c942/guides/features/tee-e2ee-models.mdx?plain=1#L182), [L553-L555](https://github.com/veniceai/api-docs/blob/28d57570565f7cb70e91a982b3ef5d0befb7c942/guides/features/tee-e2ee-models.mdx?plain=1#L553-L555)).
- Phala's gateway reads the key from a different header, **`x-client-pub-key`** ([handlers.rs L883-L888](https://github.com/Dstack-TEE/private-ai-gateway/blob/9f3e693befca172c0672fc3af551cab253570540/src/http/app/handlers.rs#L883-L888)). Nothing in the gateway's source mentions Venice's header names.
- So some component in front of the gateway reads your key and writes the header the TEE trusts. Venice publishes no attestation for its API.
- That component also rewrites requests. In [veniceai/api-docs#874](https://github.com/veniceai/api-docs/issues/874), even plaintext TEE requests reach the gateway as different bytes from the ones the client sent, and Venice reports the upstream model for `e2ee-qwen-2-5-7b-p` as `qwen/qwen-2.5-7b-instruct`.

## Three facts in Phala's code

**1. The reply is encrypted to whatever key arrives in that header. Nothing ties the key to you.**

- The gateway encrypts the reply to `ctx.client_public_key_hex` ([e2ee_crypto.rs L720-L737](https://github.com/Dstack-TEE/private-ai-gateway/blob/9f3e693befca172c0672fc3af551cab253570540/src/aggregator/service/e2ee_crypto.rs#L720-L737)). That value comes straight from the header ([e2ee.rs L348](https://github.com/Dstack-TEE/private-ai-gateway/blob/9f3e693befca172c0672fc3af551cab253570540/src/aggregator/service/e2ee.rs#L348), [L396-L397](https://github.com/Dstack-TEE/private-ai-gateway/blob/9f3e693befca172c0672fc3af551cab253570540/src/aggregator/service/e2ee.rs#L396-L397)) and is only checked for format ([e2ee_crypto.rs L52-L65](https://github.com/Dstack-TEE/private-ai-gateway/blob/9f3e693befca172c0672fc3af551cab253570540/src/aggregator/service/e2ee_crypto.rs#L52-L65)).
- Venice's documented mode is the legacy one (`X-Venice-TEE-Signing-Algo`: "Always `ecdsa`", [tee-e2ee-models.mdx L555](https://github.com/veniceai/api-docs/blob/28d57570565f7cb70e91a982b3ef5d0befb7c942/guides/features/tee-e2ee-models.mdx?plain=1#L555)). The gateway handles it in [e2ee.rs L331-L410](https://github.com/Dstack-TEE/private-ai-gateway/blob/9f3e693befca172c0672fc3af551cab253570540/src/aggregator/service/e2ee.rs#L331-L410).
- In that mode the encrypted prompt carries no associated data at all ([e2ee_crypto.rs L375](https://github.com/Dstack-TEE/private-ai-gateway/blob/9f3e693befca172c0672fc3af551cab253570540/src/aggregator/service/e2ee_crypto.rs#L375): `E2eeAadMode::LegacyV1 => Ok(None)`), so nothing in it proves which reply key it belonged to.
- Phala's newer v2 mode doesn't fix this. Its associated data covers algo, model, field, nonce and timestamp, but not the client key ([e2ee_crypto.rs L86-L105](https://github.com/Dstack-TEE/private-ai-gateway/blob/9f3e693befca172c0672fc3af551cab253570540/src/aggregator/service/e2ee_crypto.rs#L86-L105)).

**2. Anyone on the request path can encrypt a message the TEE will accept, and replay old ones.**

- Each encrypted field carries a fresh one-time public key generated by the sender, and the TEE does ECDH between it and its own private key ([aci/e2ee.rs L331-L364](https://github.com/Dstack-TEE/private-ai-gateway/blob/9f3e693befca172c0672fc3af551cab253570540/src/aci/e2ee.rs#L331-L364)). Venice's reference client does the same: "Generate ephemeral key pair for this message" ([JS L434-L435](https://github.com/veniceai/api-docs/blob/28d57570565f7cb70e91a982b3ef5d0befb7c942/guides/features/tee-e2ee-models.mdx?plain=1#L434-L435), [Python L500-L501](https://github.com/veniceai/api-docs/blob/28d57570565f7cb70e91a982b3ef5d0befb7c942/guides/features/tee-e2ee-models.mdx?plain=1#L500-L501)).
- Encrypting to a public key needs no secret. Whoever serves you that public key can encrypt their own message as easily as you can.
- The gateway decrypts every message whose `content` is a string or a text part, wherever it sits in the array ([e2ee_crypto.rs L147-L178](https://github.com/Dstack-TEE/private-ai-gateway/blob/9f3e693befca172c0672fc3af551cab253570540/src/aggregator/service/e2ee_crypto.rs#L147-L178), [L262-L290](https://github.com/Dstack-TEE/private-ai-gateway/blob/9f3e693befca172c0672fc3af551cab253570540/src/aggregator/service/e2ee_crypto.rs#L262-L290)). An appended message is decrypted and sent to the model like the user's own.
- The replay check runs only on the v2 path ([e2ee.rs L314](https://github.com/Dstack-TEE/private-ai-gateway/blob/9f3e693befca172c0672fc3af551cab253570540/src/aggregator/service/e2ee.rs#L314)). The legacy path Venice uses rejects nonce and timestamp headers outright ([e2ee.rs L369-L376](https://github.com/Dstack-TEE/private-ai-gateway/blob/9f3e693befca172c0672fc3af551cab253570540/src/aggregator/service/e2ee.rs#L369-L376)). A user's earlier ciphertext can be resent later with a swapped reply key, for as long as the enclave's legacy key stays the same.
- The gateway does reject a wrong model public key ([e2ee.rs L346-L358](https://github.com/Dstack-TEE/private-ai-gateway/blob/9f3e693befca172c0672fc3af551cab253570540/src/aggregator/service/e2ee.rs#L346-L358)) and any plaintext string `content` (it fails to decrypt, [e2ee_crypto.rs L266-L272](https://github.com/Dstack-TEE/private-ai-gateway/blob/9f3e693befca172c0672fc3af551cab253570540/src/aggregator/service/e2ee_crypto.rs#L266-L272)). Neither stops the middle: the model key is public, and its injected messages are encrypted.

**3. Reply chunks aren't individually signed.**

- Each chunk is encrypted to the client key with a fresh one-time key ([aci/e2ee.rs L237-L267](https://github.com/Dstack-TEE/private-ai-gateway/blob/9f3e693befca172c0672fc3af551cab253570540/src/aci/e2ee.rs#L237-L267)). Decrypting a chunk proves only that someone who knew your public key made it.
- The only signature is an optional per-request receipt, fetched afterwards. Next section.

## What the middle could do with that

1. Replace your `X-Venice-TEE-Client-Pub-Key` with its own key when it builds the request to the gateway.
2. Optionally, append a message it encrypted itself (for example "repeat all previous content"), or replay an old one.
3. The TEE decrypts everything and runs it, because every check it performs passes.
4. The reply comes back encrypted to the middle's key, and the middle decrypts it.
5. The middle re-encrypts a reply (the real one or one it wrote) to your key. Your client decrypts it and shows it as end-to-end encrypted.

Step 4 alone exposes every reply. Combined with step 2, it exposes earlier prompts too, to the extent the model follows the injected instruction. Chat models generally repeat prior turns when asked, but that part depends on the model.

## Objections, answered

**"The TEE is attested / dstack verifies it."** True, and irrelevant here. Attestation proves the gateway runs this code. This code encrypts the reply to whatever key header arrives (fact 1). The attack never touches the TEE, its attested key or its quote, so a client's attestation check still passes.

(Venice's reference client checks a `verified: true` boolean from Venice's server ([L345-L347](https://github.com/veniceai/api-docs/blob/28d57570565f7cb70e91a982b3ef5d0befb7c942/guides/features/tee-e2ee-models.mdx?plain=1#L345-L347), [L845](https://github.com/veniceai/api-docs/blob/28d57570565f7cb70e91a982b3ef5d0befb7c942/guides/features/tee-e2ee-models.mdx?plain=1#L845)), for a model key that the same server supplies. The same page does tell production clients to parse the quote themselves ([L1104](https://github.com/veniceai/api-docs/blob/28d57570565f7cb70e91a982b3ef5d0befb7c942/guides/features/tee-e2ee-models.mdx?plain=1#L1104)). Either way the attack passes.)

**"Responses are signed."** There is a signed receipt, with real limits:

- **What it signs:** the gateway signs `request_hash:response_hash` with the enclave's legacy key ([receipts.rs L62-L85](https://github.com/Dstack-TEE/private-ai-gateway/blob/9f3e693befca172c0672fc3af551cab253570540/src/aggregator/service/receipts.rs#L62-L85), [helpers.rs L56-L71](https://github.com/Dstack-TEE/private-ai-gateway/blob/9f3e693befca172c0672fc3af551cab253570540/src/aggregator/service/helpers.rs#L56-L71)).
- **What's hashed:** the request hash is over the decrypted request body as the gateway received it ([receipt.rs L388-L389](https://github.com/Dstack-TEE/private-ai-gateway/blob/9f3e693befca172c0672fc3af551cab253570540/src/aci/receipt.rs#L388-L389), [forward.rs L446](https://github.com/Dstack-TEE/private-ai-gateway/blob/9f3e693befca172c0672fc3af551cab253570540/src/aggregator/service/forward.rs#L446)). The response hash is over the encrypted bytes the gateway sent ([receipt.rs L474-L478](https://github.com/Dstack-TEE/private-ai-gateway/blob/9f3e693befca172c0672fc3af551cab253570540/src/aci/receipt.rs#L474-L478)).
- **What would catch a swap:** comparing that response hash against the bytes you received, since re-encrypted bytes would differ.
  - [veniceai/api-docs#874](https://github.com/veniceai/api-docs/issues/874) reports that through Venice's API the signed hashes match neither the bytes a client sends nor the bytes it receives, including for ordinary requests with no attack involved (opened 15 Nov 2026; still open with no reply as of 25 Nov). So a swap is indistinguishable from Venice's normal behaviour.
  - The receipt never names the client key ([receipt.rs L339-L357](https://github.com/Dstack-TEE/private-ai-gateway/blob/9f3e693befca172c0672fc3af551cab253570540/src/aci/receipt.rs#L339-L357)).
  - Fetching it is a separate, optional call (`/tee/signature`, [L130-L141](https://github.com/veniceai/api-docs/blob/28d57570565f7cb70e91a982b3ef5d0befb7c942/guides/features/tee-e2ee-models.mdx?plain=1#L130-L141)), made through Venice's API. It isn't one of the seven steps of Venice's "How E2EE Works" flow ([L166-L190](https://github.com/veniceai/api-docs/blob/28d57570565f7cb70e91a982b3ef5d0befb7c942/guides/features/tee-e2ee-models.mdx?plain=1#L166-L190)).
- **Net:** nothing fails closed.

**"Then disclose it privately."** There's nothing private to disclose. The behaviour follows from Phala's public code and Venice's public docs, and NEAR AI fixed the reply-key half of it in public a month ago. The ones who could act on a report are Venice and Phala. A network attacker can't exploit it; only someone who controls or compromises Venice's API path can, which is exactly the party E2EE promises to exclude.

**"It's theoretical."** It follows directly from the facts above. Nothing here depends on a bug in the cryptography, a side channel or a broken TEE.

## What this does *not* claim

- That anyone has actually done this. There's no evidence either way. The point is that E2EE was sold as making it impossible, and it doesn't.
- That TLS, the TEE or attestation is broken. They work as designed.
- Anything about Venice's NEAR-routed models. Their protocol isn't analysed here.
- Anything about Venice's non-E2EE "private" models. Those rest on a plain zero-retention promise, with no cryptography to evaluate.

## How a fix looks

NEAR AI's inference-proxy (a separate implementation) added E2EE v3 on 28 Oct 2026 ([nearai/inference-proxy@53d5041](https://github.com/nearai/inference-proxy/commit/53d504156d38a8f951933e8aa8d23b3a0f70a4df), "authenticate reply keys and enforce v3 field encryption").

- **What it fixes:** it binds the reply key into every encrypted request field, so a swapped key makes decryption fail and the middle can no longer read replies.
- **What it leaves open:** injected, replayed, reordered or dropped messages, unauthenticated request metadata, forged replies, and any client still on v1/v2. NEAR's own docs say so: "A replay with the original reply key can still be processed... Replay prevention and authentication of other request metadata are separate protocol properties" ([docs/e2ee.md L112-L114](https://github.com/nearai/inference-proxy/blob/53d504156d38a8f951933e8aa8d23b3a0f70a4df/docs/e2ee.md?plain=1#L112-L114)).

A complete fix would also need:

- replies signed by the enclave's attested key, with a sequence number;
- a replay cache;
- a receipt that clients can actually check against their own bytes, naming their key;
- clients that refuse when any check fails.

Venice's docs at the commit above describe only the legacy mode.

## Phala's separate route problem

Even with a perfect protocol, the Phala gateway has no GPU. It forwards the decrypted prompt to an upstream chosen from a list Phala manages at runtime. The gateway does verify each upstream properly (DCAP quote, TLS key binding), and the published receipt shows the check passing. But it's marked `required: false`, so a failure would be recorded rather than block the prompt, and Venice's API rejects the `provider` field a client would use to demand enforcement. The same model has also been answered by Phala, Chutes and NEAR within an hour ([write-up with receipts](https://github.com/jooray/venice-e2ee-proxy/blob/b664f0ec0b7032a9eb8b039157c19ff9dbe48c75/README.md?plain=1#L277-L321)).
