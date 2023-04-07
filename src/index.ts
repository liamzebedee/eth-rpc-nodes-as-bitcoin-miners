import { compileSolidity } from './sol'

import * as ethers from 'ethers'

import { readFileSync } from 'fs'
import * as fetch from 'node-fetch'
const bcoin = require('../bcoin/lib/bcoin');


// Decode the compact difficulty format
// const difficultyCompact = 0x1db4d19b;

function difficulty2bits(difficulty: number) {
    if (difficulty < 0) throw 'difficulty cannot be negative';
    if (!isFinite(difficulty)) throw 'difficulty cannot be infinite';
    for (var shiftBytes = 1; true; shiftBytes++) {
        var word = (0x00ffff * Math.pow(0x100, shiftBytes)) / difficulty;
        if (word >= 0xffff) break;
    }
    word &= 0xffffff; // convert to int < 0xffffff
    var size = 0x1d - shiftBytes;
    // the 0x00800000 bit denotes the sign, so if it is already set, divide the
    // mantissa by 0x100 and increase the size by a byte
    if (word & 0x800000) {
        word >>= 8;
        size++;
    }
    if ((word & ~0x007fffff) != 0) throw 'the \'bits\' \'word\' is out of bounds';
    if (size > 0xff) throw 'the \'bits\' \'size\' is out of bounds';
    var bits = (size << 24) | word;
    return bits;
}


async function getBitcoinData() {
    const latestBlockUrl = 'https://blockchain.info/latestblock';
    const latestBlockResponse = await fetch(latestBlockUrl);
    const latestBlockData = await latestBlockResponse.json();
    // console.log(latestBlockData)

    const prevBlockHash = latestBlockData.hash;

    let diff = await (await fetch(`https://blockchain.info/q/getdifficulty`)).text()
    diff = 10.0
    console.log('diff (float)', diff)

    // Decode the compact difficulty format
    // console.log(parseFloat(diff))
    const diffBits = difficulty2bits(diff)
    // const diffBits = 10
    console.log('diffBits', diffBits)

    const difficultyTarget = bcoin.mining.common.getTarget(diffBits);
    console.log('target', difficultyTarget)

    // Convert the target into a bytes32 format
    // const difficultyBytes = difficultyTarget.toArrayLike(Buffer, 'be', 32);
    let targetBytes32 = '0x' + difficultyTarget.toString('hex');
    targetBytes32 = '0x' + '1'.repeat(63) + "0"

    // console.log(difficultyBytes32);
    
    // console.log(blockChainInfoData)

    // const difficulty = blockChainInfoData.difficulty;

    return {
        previousBlockHash: prevBlockHash,
        target: targetBytes32
    };
}




async function main() {
    const contractName = 'test.sol'

    // read test.sol into content
    const content = readFileSync(__dirname + '/../src/' + contractName, 'utf8')

    // Compile .sol.
    const output = compileSolidity(contractName, content);
    console.log(output)
    const Test_data = output.contracts['test.sol'].Test

    // Build deploy tx.
    const provider = new ethers.providers.CloudflareProvider()
    const signer = ethers.Wallet.createRandom().connect(provider)
    const contract = new ethers.ContractFactory(Test_data.abi, Test_data.evm.bytecode.object, signer)

    // Constructor args.
    const btcMainnetData = await getBitcoinData()
    // console.log(btcMainnetData)
    // const prevBlockHash = ethers.utils.sha256('0x12')
    // const timestamp = (+new Date() / 1000) | 0
    // const target = '0x1f' + '0'.repeat(62)

    const prevBlockHash = '0x' + btcMainnetData.previousBlockHash
    const timestamp = (+new Date() / 1000) | 0
    const target = btcMainnetData.target
    const nonce = 1

    console.log('prevBlockHash', prevBlockHash)
    console.log('timestamp', timestamp)
    console.log('target', target)

    const { data } = contract.getDeployTransaction(
        prevBlockHash,
        timestamp,
        target,
        nonce
    )

    // Now run arbitrary EVM code on provider.
    const retDataE = await provider.call({ data })
    const zero = ethers.constants.Zero.toHexString()
    if(retDataE != zero) {
        console.log('pow solution found:', retDataE)
    } else {

    }
    

}

main()