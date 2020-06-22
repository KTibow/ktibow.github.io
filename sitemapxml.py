from urllib.parse import urlparse
import bs4
robots = open("robots.txt", "r").read()
out = open("sitemap.xml", "w")
out.write("""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">""")
input = open("sitemap.txt", "r").read()
robolist = robots.split("\n")
for i in range(3):
  print(robolist)
  robostat = robolist.copy()
  for r in robostat:
    if "user-agent" in r.lower() or "sitemap" in r.lower() or len(r) < 1:
      try:
        robolist.remove(r)
      except ValueError:
        pass
    else:
      try:
        robolist[robolist.index(r)] = r.replace("Disallow: ", "")
      except ValueError:
        pass
print("Parsed robolist:")
print(robolist)
for url in input.split("\n"):
  print("Parsing url "+urlparse(url).path)
  allowed = True
  for rob in robolist:
    if rob in urlparse(url).path:
      print("Nope says", rob)
      allowed = False
  if "https://ktibow.github.io/" in url and (allowed or url == "https://ktibow.github.io/"):
    out.write("""<url>
<loc>"""+url+"""</loc>
""")
    try:
      imgs = []
      soup = bs4.BeautifulSoup(open(urlparse(url).path.replace("/", "", 1)+"index.html", "r").read(), "html.parser")
      for img in soup.find_all('img'):
        imgs.append(img['src'])
      print("Images:", imgs)
      for img in imgs:
        print("<image:image>")
        print("<image:loc>"+img+"</image:log>")
        print("</image:image>")
    except Exception as e:
      print(e)
    out.write("<priority>")
    priority = 0.5
    if url in ["https://ktibow.github.io/"]:
      priority = 0.9
    if url.count("/") == 4:
      priority = 0.7
    if "blog" in url and url.count("/") < 7 and url.count("/") > 4:
      priority = 0.3
    print("Priority:", priority)
    out.write("0."+str(round(priority*100))+"""</priority>
</url>""")
out.write("</urlset>")
out.close()
