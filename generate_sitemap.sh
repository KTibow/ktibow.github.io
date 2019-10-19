contents=`cat sitemap.txt`
echo "https://ktibow.github.io/"
for line in $contents;
do
    linetwo=".${line}/"
    if [ -d $linetwo ]; then
        echo "https://ktibow.github.io$line/"
    fi
done
