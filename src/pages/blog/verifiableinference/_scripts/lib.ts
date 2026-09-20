// Shared helpers for the verifiable inference scripts. Scoring assumes a GLM-style chat template on Fireworks:
// <|assistant|><think>reasoning</think>content, ending in one of STOP_TOKENS.

import { readFileSync, writeFileSync } from 'node:fs';

export const FIREWORKS_CHAT = 'https://api.fireworks.ai/inference/v1/chat/completions';
export const STOP_TOKENS = new Set(['<|user|>', '<|observation|>', '<|endoftext|>']);

export type Sample = {
  id: string | null;
  fingerprint: string | null;
  reasoning: string;
  content: string;
  /** the provider's own logprobs for every generated token, when it returns them */
  logprobs?: Position[];
  /** the formatted prompt's length, and token ids of it and of every generated token, when the provider says */
  promptTokens?: number;
  /** how many tokens the provider says it generated, reasoning included */
  completionTokens?: number;
  promptIds?: number[];
  ids?: number[];
};
export type Samples = {
  prompt: string;
  url: string;
  model: string;
  extra: Record<string, unknown>;
  samples: Sample[];
};
/** One scored position: the realized token, its logprob (null for the final stop decision) and the top 5. */
export type Position = { token: string; logprob: number | null; top: [string, number][] };
export type Scored = {
  prompt: string;
  scorer: string;
  source: { url: string; model: string };
  paths: { id: string | null; bits: number; positions: Position[] }[];
};

export const env = (name: string) => {
  const value = process.env[name];
  if (!value) throw new Error(`set ${name}`);
  return value;
};

export const readJson = <T>(path: string): T => JSON.parse(readFileSync(path, 'utf8'));
export const writeJson = (path: string, data: unknown) =>
  writeFileSync(path, JSON.stringify(data) + '\n');

export const pool = async <T, R>(
  items: T[],
  concurrency: number,
  fn: (item: T, i: number) => Promise<R>,
) => {
  const results: R[] = new Array(items.length);
  let next = 0;
  const worker = async () => {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i], i);
    }
  };
  await Promise.all(Array.from({ length: concurrency }, worker));
  return results;
};

type TokenLogprob = {
  token: string;
  bytes?: number[] | null;
  logprob: number;
  top_logprobs: { token: string; bytes?: number[] | null; logprob: number }[];
};
/** vLLM's prompt_logprobs: per prompt token (null for the first), token id -> its logprob and rank */
type PromptLogprobs = (Record<string, { logprob: number; rank: number }> | null)[];
type ChatResponse = {
  id?: string;
  system_fingerprint?: string;
  usage?: { prompt_tokens?: number; completion_tokens?: number };
  // vLLM with return_token_ids
  prompt_token_ids?: number[];
  choices: {
    message: { content?: string | null; reasoning_content?: string; reasoning?: string };
    logprobs?: { content: TokenLogprob[] };
    token_ids?: number[];
    // Fireworks with raw_output
    raw_output?: { prompt_token_ids: number[]; completion_token_ids: number[] };
    // vLLM completions
    prompt_logprobs?: PromptLogprobs;
  }[];
};

export const postJson = async (url: string, key: string, body: unknown, tries = 4) => {
  let error = '';
  for (let attempt = 0; attempt < tries; attempt++) {
    try {
      const r = await fetch(url, {
        method: 'POST',
        headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(600_000),
      });
      if (r.ok) return (await r.json()) as ChatResponse;
      error = `${r.status} ${(await r.text()).slice(0, 300)}`;
    } catch (e) {
      error = String(e);
    }
    // InferX limits requests per minute
    const wait = error.startsWith('429') ? 20_000 : 3000;
    await new Promise((resolve) => setTimeout(resolve, wait * (attempt + 1)));
  }
  throw new Error(error);
};

/** Force a response through a Fireworks model with echo, and return every position the model chose. */
export const echoPositions = async (model: string, prompt: string, sample: Sample) => {
  const resp = await postJson(FIREWORKS_CHAT, env('FIREWORKS_API_KEY'), {
    model,
    messages: [
      { role: 'user', content: prompt },
      { role: 'assistant', reasoning_content: sample.reasoning, content: sample.content },
    ],
    max_tokens: 1,
    temperature: 1,
    echo: true,
    logprobs: true,
    top_logprobs: 5,
  });
  const tokens = resp.choices[0].logprobs!.content;
  const echoed = tokens.slice(0, -1);
  const names = echoed.map((t) => t.token);
  const start = names.lastIndexOf('<|assistant|>');
  if (names[start + 1] != '<think>')
    throw new Error(`unexpected template: ${names.slice(start, start + 3)}`);
  // <think> is added by the template, so scoring starts after it. The generated token's
  // distribution is the stop decision.
  const positions = [...echoed.slice(start + 2), tokens.at(-1)!].map(toPosition);
  positions[positions.length - 1].logprob = null;
  return positions;
};

const utf8 = new TextDecoder('utf-8', { fatal: true });
/**
 * A token's identity: its text when its bytes are valid UTF-8 on their own, otherwise its bytes. Display strings
 * can't be compared across APIs: for a token holding part of a character, Fireworks shows "�" while vLLM finishes the
 * character using the tokens before it.
 */
const tokenKey = (t: { token: string; bytes?: number[] | null }) => {
  if (!t.bytes) return t.token;
  try {
    return utf8.decode(new Uint8Array(t.bytes));
  } catch {
    return `bytes:${t.bytes.map((b) => b.toString(16).padStart(2, '0')).join('')}`;
  }
};

export const toPosition = (t: TokenLogprob): Position => ({
  token: tokenKey(t),
  logprob: t.logprob,
  // InferX's DeepSeek V4.1 Flash lists the sampled token first, so it can appear twice
  top: [...new Map(t.top_logprobs.map((x) => [tokenKey(x), x.logprob])).entries()],
});

/** Every token in a Hugging Face tokenizer.json with the identity tokenKey gives it. */
const readTokenizer = (path: string) => {
  const { model, added_tokens } = readJson<{
    model: { vocab: Record<string, number>; byte_fallback?: boolean };
    added_tokens: { id: number; content: string }[];
  }>(path);
  const utf8Bytes = (s: string) => [...new TextEncoder().encode(s)];
  // byte-level BPE (GPT-2, DeepSeek, Qwen) writes each byte as a printable character: printable Latin-1 as itself,
  // the rest from U+0100. SentencePiece-style BPE (Gemma) writes spaces as ▁ and unknown bytes as <0xNN>.
  const byteOf = new Map<string, number>();
  let shifted = 0;
  for (let b = 0; b < 256; b++) {
    const printable = (b >= 33 && b <= 126) || (b >= 161 && b <= 172) || (b >= 174 && b <= 255);
    byteOf.set(String.fromCodePoint(printable ? b : 256 + shifted++), b);
  }
  const tokens = Object.entries(model.vocab).map(([piece, id]) => {
    const fallback = model.byte_fallback && /^<0x([0-9A-F]{2})>$/.exec(piece);
    const bytes = !model.byte_fallback
      ? [...piece].map((c) => byteOf.get(c)!)
      : fallback
        ? [parseInt(fallback[1], 16)]
        : utf8Bytes(piece.replaceAll('▁', ' '));
    return { id, key: tokenKey({ token: piece, bytes }), byteFallback: !!fallback };
  });
  for (const { id, content } of added_tokens) tokens.push({ id, key: content, byteFallback: false });
  return tokens;
};

/** Token id -> the same identity tokenKey gives. */
export const loadVocab = (path: string) => {
  const keys: string[] = [];
  for (const { id, key } of readTokenizer(path)) keys[id] = key;
  return keys;
};

/** Identity -> token id. A byte fallback token only counts when no ordinary token has the same bytes. */
export const loadTokenIds = (path: string) => {
  const ids = new Map<string, number>();
  const tokens = readTokenizer(path).sort((a, b) => +a.byteFallback - +b.byteFallback);
  for (const { id, key } of tokens) if (!ids.has(key)) ids.set(key, id);
  return ids;
};

/**
 * Score a sample's exact token ids with a vLLM-compatible completions endpoint's prompt_logprobs, one position per
 * generated token (the stop token included, so there's no separate stop decision).
 */
export const promptLogprobPositions = async (
  url: string,
  key: string,
  model: string,
  sample: Sample,
  vocab: string[],
): Promise<Position[]> => {
  const { promptIds, ids } = sample;
  if (!promptIds || !ids) throw new Error(`${sample.id} has no token ids`);
  const resp = await postJson(url, key, {
    model,
    prompt: [...promptIds, ...ids],
    max_tokens: 1,
    temperature: 1,
    prompt_logprobs: 5,
  });
  return resp.choices[0].prompt_logprobs!.slice(promptIds.length).map((entry, i) => {
    const top = Object.entries(entry!)
      .filter(([, v]) => v.rank <= 5)
      .sort(([, a], [, b]) => a.rank - b.rank)
      .map(([id, v]) => [vocab[+id], v.logprob] as [string, number]);
    return { token: vocab[ids[i]], logprob: entry![ids[i]].logprob, top };
  });
};

/** Bits the model spent on the path it was forced down, including stopping where it stopped. */
export const realizedBits = (positions: Position[]) => {
  let bits = 0;
  for (const { logprob, top } of positions) {
    if (logprob != null) {
      bits -= logprob / Math.LN2;
      continue;
    }
    const stop = top
      .filter(([t]) => STOP_TOKENS.has(t))
      .reduce((sum, [, lp]) => sum + Math.exp(lp), 0);
    // if no stop token made the top 5, stopping costs at least as much as the 5th token
    bits -= stop > 0 ? Math.log2(stop) : Math.min(...top.map(([, lp]) => lp)) / Math.LN2;
  }
  return bits;
};
