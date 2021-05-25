input="songplays_s3_links_some_days.txt"
while IFS= read -r line
do
    SECONDS_WAIT=60
    curl \
        -H "Authorization: Bearer $TOKEN" \
        -X POST "https://api.tinybird.co/v0/datasources" \
        -d mode='append' \
        -d name='songplays_kafka_destination' \
        --data-urlencode "url=$line"
    echo "\nAppending $line"
    echo "Waiting $SECONDS_WAIT seconds"
    sleep $SECONDS_WAIT
#   tb datasource append digital_plays_kafka_destination "$line" # this does is in a sync way
done < "$input"


