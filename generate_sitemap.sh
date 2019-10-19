contents=`cat sitemap.txt`
for line in $contents;
do
    echo "https://ktibow.github.io$line"
done
