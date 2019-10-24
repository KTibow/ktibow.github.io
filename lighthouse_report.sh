rm -r lighthouse || true
mkdir lighthouse
cat sitemap.txt | while read line
do 
  report="${line////-}.html"
  report="${string:8:${#string}-1}"
  report="./lighthouse/$report"
  echo $report
  lighthouse --chrome-flags="--headless" --output-path=$report $line
done
