contents=`cat sitemap.txt`
echo "https://ktibow.github.io/"
for line in $contents;
do
    if [[ -d ".$line" ]]; then
        echo "https://ktibow.github.io$line/"
    fi
done
