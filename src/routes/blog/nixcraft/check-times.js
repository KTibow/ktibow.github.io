import { execSync } from "child_process";

const curlFetch = (url) => {
  return execSync(
    `curl "${url}" --compressed -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:133.0) Gecko/20100101 Firefox/133.0' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' -H 'Accept-Language: en-US,en;q=0.5' -H 'Referer: https://www.cyberciti.biz/' -H 'DNT: 1' -H 'Sec-GPC: 1' -H 'Connection: keep-alive' -H 'Cookie: __cf_bm=Yh1oTHFrPdviwvdAWl2LkV6jtfLI9Xqgrv9dwuyc0pg-1733881524-1.0.1.1-IxHO5wFyQ7YQ_5Au5y5BOtSijltawJe6aKEz7w90tzvt8XG8YuFFKfqqkCx4J5eT7ctNNYE5oQ8I70WUCb30lA; cf_clearance=P3sTr0E8EBaYDj3MZpF8P.9rixysGj_rT1uMOwGkJro-1733881525-1.2.1.1-R9svBrHYzDwFTiVHjVIsHEB8LgcdW1wsxIsHANJN5SC9xlvJC79e8ZIIPsmDJXYgdljEMu4kISS19ewv7fY7Vx_GHLQrOaSwNh0AuTTRMAL_bA7tlCaNRwryVFRt3iqNLl6PatfO3wsXfFkfZMoVwLLd5N02BDD99k_M.7Tj8V9NRmw9oY3bpiTOrxc3oeKiBpWgZ4YPP5EuAJKpcf3SvV2_EhWcg_NYNS04rAo5UrrD9vEHJC2CTtuANCTJssNn46BT6bGGcDVQnOVtMfWi_rxNVr7OAMD17yqC.viCde3lgxy0aGRkX.hHHKyfIy.b; _ga_8G0BR7WCTH=GS1.1.1733881525.1.1.1733881706.58.0.0; _ga=GA1.2.1074298695.1733881525; _gid=GA1.2.1950454691.1733881545; __gsas=ID=e2f07b7b5a3f09e4:T=1733881546:RT=1733881546:S=ALNI_Mb92NT91SPwOReSPMySw4ANoBctGg; __gads=ID=bcda56eb1e21368d:T=1733881545:RT=1733881545:S=ALNI_MZh--9JEYui6aXCTByouKHDAbMvAw; __gpi=UID=00000f730c427a7c:T=1733881545:RT=1733881545:S=ALNI_MaPB2Lt5uaMfncwzTtnDBfdcEhZ9g; __eoi=ID=b5c41edcba42bb13:T=1733881545:RT=1733881545:S=AA-AfjaBgYHlTcYNqfaIfNMAlN-H; FCNEC=%5B%5B%22AKsRol_kCx4Hu9p8zSNv14KghmjGL7prGljyTGoF4mtnkVED23cKMD_E8c3LEx2cJplwDhKa6UGTmtub08Ob46qFULYi178es0L29EZIAu1jhLE7yRk5NpzqShuj7C94AsfAMXZicEGZck8-kgV-RUtbsiIrBHuaKA%3D%3D%22%5D%5D'`,
    { encoding: "utf8" },
  );
};

const html = curlFetch("https://www.cyberciti.biz/");

// Find h1 links using regex
const articleMatches = html.match(/<h1[^>]*>.*?<a[^>]*href="([^"]*)".*?>(.*?)<\/a>/gs) || [];
console.log(articleMatches);
let count = 0;

for (const match of articleMatches) {
  if (count >= 20) break;

  const articleUrl = match.match(/href="([^"]*)"/)?.[1];
  const titleMatch = match.match(/>([^<]+)</)?.[1];

  if (!articleUrl || !titleMatch) continue;
  if (!articleUrl.startsWith("http")) continue;

  // Fetch article page
  const articleHtml = curlFetch(articleUrl);

  const publishedMatch =
    articleHtml.match(/<meta property="article:published_time" content="([^"]*)"/) || [];
  const publishedTime = publishedMatch[1];

  if (publishedTime) {
    console.log(`Title: ${titleMatch[1].trim()}`);
    console.log(`URL: ${articleUrl}`);
    console.log(`Published: ${publishedTime}`);
    console.log("---");
    count++;
  }
}
