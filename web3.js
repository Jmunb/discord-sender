const ethers = require('ethers');
const wallets = require('./wallets.json');


wallets.forEach(wallet => {
    let mnemonicWallet = ethers.Wallet.fromMnemonic(wallet.mnemonic);
    console.log(mnemonicWallet.address);
})


