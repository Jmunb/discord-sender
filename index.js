require('dotenv').config()
const { exec } = require('child_process');
const { Secp256k1HdWallet } = require('@cosmjs/launchpad')
const { fromBech32, toBech32 } = require('@cosmjs/encoding')
const accounts = require("./accounts.json");
const wallets = require("./wallets.json");
const networks = ['umee', 'cosmos', 'osmo', 'juno', 'terra']
const commands = []

wallets.slice(0, accounts.length).forEach(async (item, index) => {
    const account = accounts[index]
    const wallet = await Secp256k1HdWallet.fromMnemonic(item.mnemonic)
    const [{ address }] = await wallet.getAccounts()
    const rawAddress = fromBech32(address).data
    const outWallets = []
    networks.forEach(n => {
        outWallets.push(toBech32(n, rawAddress))
    })

    commands.push(MakeCommand(account.discord_proxy, account.discord_token, outWallets))
})

function MakeCommand (proxy, token, walletsList) {
    let requests = ''

    walletsList.forEach(item => {
        requests += `!request ${item}\n`
    })

    requests = requests.slice(0, -2)

    return `HTTPS_PROXY=https_proxy=${proxy} docker run --net=host -e DISCORD_TOKEN='${token}' -e 'DISCORD_CHANNEL_ID'='${process.env.DISCORD_CHANNEL_ID}' -e 'DISCORD_MESSAGE'='${requests}' -i dsender`
}

async function SendRequests () {
    for (let command of commands) {
        console.log(`${(new Date)} ${command}`)
        exec(command, (error, stdout, stderr) => {
            console.log(error, stdout, stderr)
        })
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    await new Promise(resolve => setTimeout(resolve, Number(process.env.SNOOZE_TIME) * 60 * 60 * 1000 + 60000));
    await SendRequests()
}

setTimeout(async () => {
    await SendRequests()
}, 1000)
