set -a
. $1
set +a
env_vars=`cat "$1" | sed s/=.*//g`

for key in $(echo $env_vars);do

if [[ $key =~ ^#.* ]];then
    echo "Skipping the commented value" - $key

else
    echo "Uploading" - $key
    val=$2
    sleep 2 #For vercel API
    vc env rm ${key} $2  -y
    echo "${!key}" | vc env add $key ${val}
fi
done

exit 0;
