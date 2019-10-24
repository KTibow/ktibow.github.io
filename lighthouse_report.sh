rm -r lighthouse || true
mkdir lighthouse
cat sitemap.txt | while read line
do 
  echo $line
  echo "${line////-}"
  report="${line////-}.html"
  echo $report
  report="${string:6:${#string}-2}"
  echo $report
  report="./lighthouse/$report"
  echo $report
  lighthouse --chrome-flags="--headless" --output-path=$report $line
done
