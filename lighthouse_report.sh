rm -r lighthouse || true
mkdir lighthouse
cat sitemap.txt | while read line
do 
  report="./${line////-}.html"
  report=echo $report | cut -c 9-
  report="./lighthouse/$report"
  lighthouse --chrome-flags="--headless" --output-path=$report $line
done
