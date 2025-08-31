export default function handler(req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("hi");
}
