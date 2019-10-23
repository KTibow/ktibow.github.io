
cat sitemap.txt | while read line
do 
  report="./${line////-}.html"
  lighthouse --chrome-flags="--headless" --output-path=$report $line
done
