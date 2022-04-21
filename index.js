require('dotenv').config()
const { exec } = require('child_process');
const sleep = require('system-sleep');
const accounts = require("./accounts.json");
const wallets = require("./wallets.json");
const commands = {
    umee: [],
    cosmos: [],
    juno: [],
    osmo: []
}

wallets.slice(0, accounts.length).forEach((item, index) => {
    const account = accounts[index]

    const umeeCommand = MakeCommands(account.discord_proxy, account.discord_token, item.umee)
    const cosmosCommand = MakeCommands(account.discord_proxy, account.discord_token, item.cosmos)
    const junoCommand = MakeCommands(account.discord_proxy, account.discord_token, item.juno)
    const osmoCommand = MakeCommands(account.discord_proxy, account.discord_token, item.osmo)

    commands.umee.push(umeeCommand)
    commands.cosmos.push(cosmosCommand)
    commands.juno.push(junoCommand)
    commands.osmo.push(osmoCommand)
})

function MakeCommands (proxy, token, wallet) {
    return `HTTPS_PROXY=https_proxy=${proxy} docker run --net=host -e DISCORD_TOKEN='${token}' -e 'DISCORD_CHANNEL_ID'='${process.env.DISCORD_CHANNEL_ID}' -e 'DISCORD_MESSAGE'='!request ${wallet}' -i dsender`
}

function makeRequestByNetwork (network) {
    commands[network].forEach(command => {
        console.log(`${(new Date)} ${command}`)
        exec(command, (error, stdout, stderr) => {
            console.log(error, stdout, stderr)
        })
        sleep( 1000)
    })
}

function SendRequests () {
    makeRequestByNetwork('cosmos')
    sleep(60 * 1000)

    makeRequestByNetwork('umee')
    sleep(60 * 1000)

    makeRequestByNetwork('juno')
    sleep(60 * 1000)

    makeRequestByNetwork('osmo')
    sleep(Number(process.env.SNOOZE_TIME) * 60 * 60 * 1000 + 60000)

    SendRequests()
}

SendRequests()
