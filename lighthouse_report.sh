rm -r lighthouse || true
mkdir lighthouse
cat sitemap.txt | while read line
do 
  lighthouse --chrome-flags="--headless" -output json $line
done
