

var blockModel = require('../models/block.model');
const Web3 = require("@solana/web3.js");
let web3 = new Web3.Connection(Web3.clusterApiUrl('mainnet-beta'), 'confirmed');


//// get block info by solana web3

const get = async () => {
    const obj = {};
    const slot = await web3.getSlot();
    obj.slot = slot;

    /// get block info
    const block = await web3.getBlock(slot);
    obj.blockTime = block.blockTime;


    /// get supply info
    const supply = await web3.getSupply();
    obj.totalSupply = supply.value.total;;
    obj.circulatingSupply = supply.value.circulating;
    obj.nonCirculatingSupply = supply.value.nonCirculating;


    /// get epoch info
    const epoch = await web3.getEpochInfo();
    obj.epoch = epoch.epoch;

    /// get transactions info
    const count = await web3.getTransactionCount();
    obj.transactionCount = count;
    obj.TransactionsPerSecond = 2161;
    // console.log(supply);

    const fee = await web3.getFeeCalculatorForBlockhash(block.blockhash);

    obj.fee = fee.value.lamportsPerSignature;

    return obj;
}


/// get block info
exports.getdata = async (req, res) => {
    const data = await get();
    const block = new blockModel(data);
    await block.save(async (err) => {
        if (err) {
            sendMessage({}, 'error', res);
        }
        else {
            res.status(200);
            sendMessage(data, 'success', res);
        }
    })
}


/// get wallet address info
exports.getAccountInfo = async (req, res) => {
    const data = {};
    const address = new Web3.PublicKey(req.params.address);
    /// get account info
    const info = await web3.getAccountInfo(address);
    data.executable = info.executable;
    data.owner = info.owner.toBase58();
    data.rentEpoch = info.rentEpoch;
    data.lamports = info.lamports;
    //// get account transactions
    const transactions = await web3.getSignaturesForAddress(address);
    data.transactions = transactions;
    sendMessage(data, 'success', res)
}




function sendMessage(result, message, res) {
    var m = {};
    m.result = result;
    m.message = message;
    res.json(m)
}
