##Install PIP
```
sudo apt update
sudo apt install python3-pip
pip install -r requirements.txt
```

[After that you need to install Docker](https://docs.docker.com/engine/install/ubuntu/)

##Make image
```
docker build -t dsender .
```

##Run script
```
docker run \
    --env HTTPS_PROXY="https_proxy=https://***:***@46.145.119.98:1050" \
    --net=host \
    -e DISCORD_TOKEN='OTU3MjQ5Mzk0MDUzMzUzNTIz.Yj8FyQ.eyMLXxMqVXO4J5LphLMy1rOUTlk' \
    -e 'DISCORD_CHANNEL_ID'='912053442397212712' \
    -e 'DISCORD_MESSAGE'='Hi' \
    -it dsender
```
