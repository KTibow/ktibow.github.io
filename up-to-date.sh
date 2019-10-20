find . | grep -v ".*/\..*" > page-things.txt
contents=`cat page-things.txt`
$contents=awk 'BEGIN{FIELDWIDTHS="1 1000"}{print $2}' $contents
for line in $contents;
do
  echo "https://ktibow.github.io{$line}"
done
