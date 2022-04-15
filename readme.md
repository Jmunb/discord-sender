```
docker build -t dsender .
docker run \
    --net=host \
    -e DISCORD_TOKEN='OTU3MjQ5Mzk0MDUzMzUzNTIz.Yj8FyQ.eyMLXxMqVXO4J5LphLMy1rOUTlk' \
    -e 'DISCORD_CHANNEL_ID'='912053442397212712' \
    -e 'DISCORD_MESSAGE'='Hi' \
    -e 'DISCORD_PROXY'='http://localhost:8089' \
    -it dsender
```
