
cat sitemap.txt | while read line
do 
  lighthouse --chrome-flags="--headless" --output-path="./""${line////-}""report.html" $line
done
