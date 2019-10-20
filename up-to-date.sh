find . | grep -v ".*/\..*" > page-things.txt
contents=`cat page-things.txt`
for line in $contents;
do
  echo $line
done
