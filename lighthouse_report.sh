rm -r lighthouse || true
mkdir lighthouse
cat sitemap.txt | while read line
do 
  report="${line////-}.html"
  echo $report
  report="${string:8:${#string}-1}"
  echo $report
  report="./lighthouse/$report"
  echo $report
  lighthouse --chrome-flags="--headless" --output-path=$report $line
done
