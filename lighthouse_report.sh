rm -r lighthouse || true
mkdir lighthouse
cat sitemap.txt | while read line
do 
  report="${line////-}"
  report="${line//./-}"
  report="${report:8:${#report}-2}"
  report="./lighthouse/${report}.html"
  echo $report
  lighthouse --chrome-flags="--headless" --output-path=$report $line
done
