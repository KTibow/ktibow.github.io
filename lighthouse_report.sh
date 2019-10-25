rm -r lighthouse || true
mkdir lighthouse
cat sitemap.txt | while read line
do 
  filename=`date "+%s"`
  lighthouse --chrome-flags="--headless" --output=json --output-path="./${filename}.json" $line
done
