import json
import os
import ssl
from datetime import datetime
from time import sleep, time
from urllib.parse import urlparse

import requests as req
import urllib3
from rich import print
from websocket import create_connection

urllib3.disable_warnings()

TOKEN = os.environ.get("DISCORD_TOKEN", "OTU3MjQ5Mzk0MDUzMzUzNTIz.Yj8FyQ.eyMLXxMqVXO4J5LphLMy1rOUTlk")
CHANNEL_ID = os.environ.get("DISCORD_CHANNEL_ID", "912053442397212712")
MESSAGE = os.environ.get("DISCORD_MESSAGE", "Hi, I'm Misha!")

def send(token, channel_id, message):
    ws = None
    ws = create_connection("wss://gateway.discord.gg/", sslopt={"cert_reqs": ssl.CERT_NONE})
    data = '''
    {
        "op": 2,
        "d":{
            "token": "%s",
            "properties": {
                "$os": "linux",
                "$browser": "ubuntu",
                "$device": "ubuntu"
            },
        }
    }
    ''' % token
    ws.send(data)
    try:
        ws.close()
    except:
        pass

    headers = {'authorization': token, 'Content-Type': 'application/json'}
    payload = {"content":message,"tts":False}
    req.post("https://discordapp.com/api/v9/channels/%s/messages" % channel_id,
             headers = headers,
             json=payload,
             verify=False,
             )

    current_datetime = datetime.now()
    print(f"{current_datetime}  |   MSG sended to {channel_id}")


if __name__ == "__main__":
    send(token=TOKEN,
         channel_id=CHANNEL_ID,
         message=MESSAGE)

