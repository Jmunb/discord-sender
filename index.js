require('dotenv').config()
const { exec } = require('child_process');
const sleep = require('system-sleep');
const accounts = require("./accounts.json");
const wallets = require("./wallets.json");


function SendMessage (proxy, token, wallet) {
    const command = `HTTPS_PROXY=https_proxy=${proxy} docker run --net=host -e DISCORD_TOKEN='${token}' -e 'DISCORD_CHANNEL_ID'='${process.env.DISCORD_CHANNEL_ID}' -e 'DISCORD_MESSAGE'='!request ${wallet}' -i dsender`
    console.log(`!request ${wallet}`)
    console.log(command)
    exec(command, (error, stdout, stderr) => {
        console.log(error, stdout, stderr)
    })
}

function MakeRequestFromAllWallets (list) {
    list.forEach((item, index) => {
        const wallet = wallets[index]

        SendMessage(item.discord_proxy, item.discord_token, wallet.umee)
        sleep(65 * 1000)

        SendMessage(item.discord_proxy, item.discord_token, wallet.cosmos)
        sleep(65 * 1000)

        SendMessage(item.discord_proxy, item.discord_token, wallet.juno)
        sleep(65 * 1000)

        SendMessage(item.discord_proxy, item.discord_token, wallet.osmo)
        sleep(1000)
    })
    sleep(12 * 60 * 60 * 1000 + 6000)

    MakeRequestFromAllWallets(list)
}


MakeRequestFromAllWallets(accounts)


// HTTPS_PROXY=https_proxy=https://8GM373:56M0WYFWHp@45.145.119.98:1050 docker run     --net=host     -e DISCORD_TOKEN='OTU3MjQ5Mzk0MDUzMzUzNTIz.Yll7rQ.fg_ARQusCY5Gx9juuIefb4cNHPc'     -e 'DISCORD_CHANNEL_ID'='959524634963869746'     -e 'DISCORD_MESSAGE'='!request umee1pvu5q6etdlzc057gx7yqq4hf44dgjgu3mdrgt9' -i dsender
