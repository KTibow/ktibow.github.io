<script module>
  export const date = "2025-06-02";
</script>

<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
  import Snippet from "$lib/Snippet.svelte";
  import { typescript } from "svelte-highlight/languages";
  import bg from "./bg.avif";
</script>

<BlogHeader {date} {bg} title="MCP from first principles" />
<p>
  MCP (at its core) is a standard for providing tools to LLMs. If I were to ask you to write a spec
  for MCP, it would probably look something like this:
</p>
<ul>
  <li>
    A <code>/list</code> endpoint. This endpoint only accepts <code>GET</code> responses and returns
    a JSON response with the type
    <code
      >&#123; tools: &#123; name: string; description: string; inputSchema: JSONSchema &#125;[]
      &#125;</code
    >.
  </li>
  <li>
    A <code>/call</code> endpoint. This endpoint only accepts <code>POST</code> responses with a
    type of <code>&#123; tool: string; input: JSON &#125;</code>, and returns a JSON response with
    the type <code>string</code>.
  </li>
</ul>
<p>
  Yet it's many times more complex than this. To understand why, I first need to ask you how you'd
  write another spec: MCP with local servers. Since it would be wasteful to restart an application
  every tool call or run a pointless HTTP server, you'd use standard IO. Clients send in a numbered
  call, the server receives it on standard input, and it replies on standard output for the client
  to read. Simple enough, and MCP agrees with you on this - it likes streaming a lot. In fact, it
  likes it so much that remote MCPs also stream.
</p>
<p>
  How would you write a spec for using streaming to make MCPs work remotely? You'd probably use
  WebSockets since this is a bidirectional stream. But here we flip back to MCP being many times
  more complex than you'd expect. There are two ways to connect to a remote MCP server:
</p>
<ol>
  <li>
    <strong>Central SSE + separate calls.</strong> This was the first implementation of remote MCP,
    and makes each client receive responses through an always open connection to <code>/sse</code>
    and send requests by POSTing to <code>/messages</code>. This split is inherently problematic,
    which leads us to...
  </li>
  <li>
    <strong>Streamable HTTP.</strong> It's a name that promises a return to the basics from the
    start of this post, but it in fact isn't. With most servers, everything works by POSTing
    something to
    <code>/mcp</code>
    and getting a stream back. Most will require you to <code>initialize</code> yourself to get a
    <code>mcp-session-id</code>, then use it for all other call requests. Most keep the stream open
    for 10 seconds after sending back the main data.
  </li>
  <li>
    <em
      >Missing: Simple stateless HTTP and WebSockets (I'd urge you to request them in <a
        href="https://github.com/modelcontextprotocol/modelcontextprotocol/issues/493">this issue</a
      >, and consider reading its
      <a href="https://raz.sh/blog/2025-05-02_a_critical_look_at_mcp"
        >author's post that led to it</a
      >).</em
    >
  </li>
</ol>

<p>
  We can cope with this though. Streamable HTTP, however problematically designed, is usable. Take a
  look.
</p>

<Snippet
  language={typescript}
  code={'export type Tool = {\n  name: string;\n  description: string;\n  inputSchema: unknown;\n};\nexport type ToolContent =\n  | { type: "text"; text: string }\n  | { type: "image"; data: string; mimeType: string }\n  | { type: "audio"; data: string; mimeType: string };\n\nexport const connect = async (url: string) => {\n  let sessionId: string | null = null;\n  const rpc = async (method: string, params: unknown) => {\n    const headers: Record<string, string> = {\n      accept: "application/json, text/event-stream",\n      "content-type": "application/json",\n    };\n    if (sessionId) {\n      headers["mcp-session-id"] = sessionId;\n    }\n    const body: Record<string, unknown> = {\n      jsonrpc: "2.0",\n      id: method.startsWith("notifications/") ? undefined : crypto.randomUUID(),\n      method,\n      params,\n    };\n    const r = await fetch(url, {\n      method: "POST",\n      headers,\n      body: JSON.stringify(body),\n    });\n    if (!r.ok) {\n      throw new Error(`${url} is ${r.status}ing`);\n    }\n    return r;\n  };\n  const parseFromRpc = async <T>(r: Response): Promise<{ result: T }> => {\n    const contentType = r.headers.get("content-type");\n    if (contentType == "application/json") {\n      return await r.json();\n    }\n    if (contentType == "text/event-stream") {\n      let buffer = "";\n      const decoder = new TextDecoder();\n      for await (const bytes of r.body!) {\n        buffer += decoder.decode(bytes);\n\n        let lines: string[];\n        [lines, buffer] = [\n          buffer.split("\\n").slice(0, -1),\n          buffer.split("\\n").at(-1)!,\n        ];\n        for (const l of lines.map(\n          (l) => l.startsWith("data: ") && l.slice(6).trim(),\n        )) {\n          if (!l) continue;\n          if (l == "ping") continue;\n          return JSON.parse(l);\n        }\n      }\n    }\n    throw new Error(`Unknown type ${contentType}`);\n  };\n\n  const initializeR = await rpc("initialize", {\n    protocolVersion: "2025-03-26",\n    capabilities: {},\n    clientInfo: {\n      name: "YOUR_CLIENT_HERE",\n      version: "1.0.0",\n    },\n  });\n  sessionId = initializeR.headers.get("mcp-session-id");\n\n  await rpc("notifications/initialized", {});\n\n  return {\n    async list() {\n      const r = await rpc("tools/list", {});\n      const {\n        result: { tools },\n      } = await parseFromRpc<{ tools: Tool[] }>(r);\n      return tools;\n    },\n    async call(name: string, args: unknown) {\n      const r = await rpc("tools/call", { name, arguments: args });\n      const {\n        result: { content },\n      } = await parseFromRpc<{ content: ToolContent[] }>(r);\n      return {\n        content,\n        text: content\n          .map((c) => ("text" in c ? c.text : ""))\n          .reduce((acc, v) => acc + v),\n      };\n    },\n  };\n};\n'}
/>

<p>
  That was a minimal MCP-over-streamable HTTP client in &lt;100 lines of TypeScript. It's not
  compatible with servers that don't respond to an RPC with a single, same-stream response, lacks
  authentication, doesn't support many parts of the MCP spec, and probably isn't suitable for
  production. But most importantly: it isn't bloated.
</p>
