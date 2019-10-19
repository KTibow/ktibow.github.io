contents=`cat sitemap.txt`
echo "https://ktibow.github.io"
for line in $contents;
do
    echo "https://ktibow.github.io$line"
done
