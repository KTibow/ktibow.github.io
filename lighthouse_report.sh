cat sitemap.txt | while read line; lighthouse --chrome-flags="--headless" --output-path="./{$line}report.html" $line; done
