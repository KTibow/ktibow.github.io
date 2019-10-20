find . | grep -v ".*/\..*" > page-things.txt
contents=`cat page-things.txt`
for line in $contents;
do
  echo awk 'BEGIN{FIELDWIDTHS="1 1000"}{print $2}' $line
done
