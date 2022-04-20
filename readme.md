##Install PIP
```
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt update
sudo apt install python3-pip nodejs npm
pip install -r requirements.txt
```

[After that you need to install Docker](https://docs.docker.com/engine/install/ubuntu/)

##Install nodejs dependencies
```
npm install
```

##Make image
```
docker build -t dsender .
```

##Run script single
```
HTTPS_PROXY=https_proxy=https://login:password@46.145.119.98:1050 docker run \
    --net=host \
    -e DISCORD_TOKEN='OTU3MjQ5Mzk0MDUzMzUzNTIz.Yj8FyQ.eyMLXxMqVXO4J5LphLMy1rOUTlk' \
    -e 'DISCORD_CHANNEL_ID'='912053442397212712' \
    -e 'DISCORD_MESSAGE'='Hi' \
    -it dsender
```

##Or run script as daemon
```
npm run start
```
