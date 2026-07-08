# /// script
# dependencies = ["requests"]
# ///
import json
import os
import time

import requests

KEY = os.environ.get("OPENROUTER_KEY")

providers = [
    "z-ai/fp8",
    "novita/fp8",
    "deepinfra/fp4",
    "together",
    "parasail/fp4",
    "streamlake/fp8",
]

for word in [
    "mango",
    "banana",
    "purple",
    "mangosteen",
    "supercalifragilisticexpialidocious",
    "xyz",
    "zxcvbnm",
    "qwertyuiop",
    "xnopyt",
]:
    print(f"\n{'=' * 60}", flush=True)
    print(f"=== SECRET WORD: {word} ===", flush=True)
    print(f"{'=' * 60}", flush=True)

    for prov in providers:
        print(f"\n  Provider: {prov}", flush=True)
        body = {
            "model": "z-ai/glm-5.2",
            "provider": {"only": [prov], "allow_fallbacks": False},
            "max_tokens": 100,
            "temperature": 0,
            "tools": [
                {
                    "type": "function",
                    "function": {
                        "name": "send",
                        "description": "test",
                        "parameters": {
                            "type": "object",
                            "properties": {"x": {"type": "string"}},
                            "required": ["x"],
                        },
                    },
                }
            ],
            "messages": [
                {
                    "role": "user",
                    "content": "Think of a secret word, call send, then tell me the word.",
                },
                {
                    "role": "assistant",
                    "content": None,
                    "reasoning_content": f"The secret word is: {word}.",
                    "tool_calls": [
                        {
                            "id": "c1",
                            "type": "function",
                            "function": {"name": "send", "arguments": '{"x":"ok"}'},
                        }
                    ],
                },
                {"role": "tool", "tool_call_id": "c1", "content": "ok"},
            ],
            "debug": {"echo_upstream_body": True},
        }

        try:
            r = requests.post(
                "https://openrouter.ai/api/v1/chat/completions",
                json=body,
                headers={"Authorization": f"Bearer {KEY}"},
                timeout=15,
            )
            data = r.json()
        except Exception as e:
            print(f"    ERROR: {type(e).__name__}", flush=True)
            continue

        if "error" in data:
            print(f"    ERROR: {data['error'].get('message', '')[:80]}", flush=True)
            continue

        content = data["choices"][0]["message"].get("content") or ""
        found = word in content.lower()

        ub = data.get("debug", {}).get("echo_upstream_body", {})
        if isinstance(ub, str):
            ub = json.loads(ub)

        # Check that we're actually getting the right provider
        response_provider = data.get("provider", "?")
        upstream_model = ub.get("model", "?")
        upstream_rc = ub.get("messages", [{}])[1].get("reasoning_content", "")

        print(
            f"    Response provider: {response_provider} (using {upstream_model} + {upstream_rc})",
            flush=True,
        )
        print(
            f"    Response reasoning: {data['choices'][0]['message'].get('reasoning')}",
            flush=True,
        )
        print(f"    Response content: {content}", flush=True)
        print(f"    Found '{word}': {found}", flush=True)
        time.sleep(0.5)
