contents=`cat sitemap.txt`
echo "https://ktibow.github.io/"
for line in $contents;
do
    $linetwo="./tutorials/"
    if [ -d $linetwo ]; then
        echo "https://ktibow.github.io$line/"
    fi
done
