from urllib.parse import urlparse
robots = open("robots.txt", "r").read()
out = open("sitemap.xml", "w")
out.write("""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">""")
input = open("sitemap.txt", "r").read()
robolist = robots.split("\n")
print("Original robolist:")
print(robolist)
for r in robolist:
  if "User-Agent" in r.lower() or "Sitemap" in r.lower() or len(r) < 1:
    print("Removing", r)
    robolist.remove(r)
  else:
    print("Modifying", r)
    robolist[robolist.index(r)] = r.replace("Disallow: ", "")
print("Parsed robolist:")
print(robolist)
for url in input.split("\n"):
  print("Parsing url "+urlparse(url).path)
  print(urlparse(url).path in robots)
  if "https://ktibow.github.io/" in url and (urlparse(url).path not in robots or url == "https://ktibow.github.io/"):
    out.write("""<url>
<loc>"""+url+"""</loc>
<priority>""")
    priority = 0.5
    if url in ["https://ktibow.github.io/", "https://ktibow.github.io/blog/", "https://ktibow.github.io/tutorials/quick-pi/", "https://ktibow.github.io/blog/2020/3/"]:
      priority = 0.75
    if url in ["https://ktibow.github.io/"]:
      priority = 1
    if "blog" in url and url.count("/") < 7 and url.count("/") > 4:
      priority = 0.25
    out.write("0."+str(round(priority*100))+"""</priority>
</url>""")
out.write("</urlset>")
out.close()
