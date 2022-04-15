##Install PIP
```
sudo apt update
sudo apt install python3-pip
pip install -r requirements.txt
```

[After that you need to install Docker](https://docs.docker.com/engine/install/ubuntu/)

##Run script
```
docker build -t dsender .
docker run \
    --net=host \
    -e DISCORD_TOKEN='OTU3MjQ5Mzk0MDUzMzUzNTIz.Yj8FyQ.eyMLXxMqVXO4J5LphLMy1rOUTlk' \
    -e 'DISCORD_CHANNEL_ID'='912053442397212712' \
    -e 'DISCORD_MESSAGE'='Hi' \
    -e 'DISCORD_PROXY'='https://45.145.119.98:1050' \
    -e 'DISCORD_PROXY_TYPE'='socks5' \
    -it dsender
```

```
docker build -t dsender2 .
docker run \
    --net=host \
    -e DISCORD_TOKEN='OTU3MjQ5Mzk0MDUzMzUzNTIz.Yllo_A.bgSBD-IRdJkNV_5o41DQ1jdRRWE' \
    -e 'DISCORD_CHANNEL_ID'='912053442397212712' \
    -e 'DISCORD_MESSAGE'='I am Mason' \
    -e 'DISCORD_PROXY'='https://8GM373:56M0WYFWHp@45.145.119.98:1050' \
    -e 'DISCORD_PROXY_TYPE'='socks5' \
    -it dsender2
```
