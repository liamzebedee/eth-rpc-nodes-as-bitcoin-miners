eth-nodes-as-btc-miners
=======================

return ethereum to its joyous proof-of-work roots, by using the public Ethereum RPC network to solve bitcoin POW puzzles.

by [abusing eth_call to execute arbitrary EVM code](https://www.libevm.com/2023/01/03/abusing-eth-call/), we are able to implement the bitcoin POW algorithm without changes to ethereum clients.

## run

```sh
npm i
npm run watch
npm run start
```

## demo.

```sh
(base) ➜  eth-nodes-as-btc-miners git:(main) ✗ npm run start

> eth-nodes-as-btc-miners@1.0.0 start
> node build/index.js

Warning: SPDX license identifier not provided in source file. Before publishing, consider adding a comment containing "SPDX-License-Identifier: <SPDX-License>" to each source file. Use "SPDX-License-Identifier: UNLICENSED" for non-open-source code. Please see https://spdx.org for more information.
--> test.sol


{
  contracts: { 'test.sol': { Test: [Object] } },
  errors: [
    {
      component: 'general',
      errorCode: '1878',
      formattedMessage: 'Warning: SPDX license identifier not provided in source file. Before publishing, consider adding a comment containing "SPDX-License-Identifier: <SPDX-License>" to each source file. Use "SPDX-License-Identifier: UNLICENSED" for non-open-source code. Please see https://spdx.org for more information.\n' +
        '--> test.sol\n' +
        '\n',
      message: 'SPDX license identifier not provided in source file. Before publishing, consider adding a comment containing "SPDX-License-Identifier: <SPDX-License>" to each source file. Use "SPDX-License-Identifier: UNLICENSED" for non-open-source code. Please see https://spdx.org for more information.',
      severity: 'warning',
      sourceLocation: [Object],
      type: 'Warning'
    }
  ],
  sources: { 'test.sol': { id: 0 } }
}
diff (float) 10
diffBits 471439744
target <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 80 99 19 00 00 00 00>
prevBlockHash 0x00000000000000000000fd308d0060c61cbf91dd19669dd254a2f4b726996125
timestamp 1680907326
target 0x1111111111111111111111111111111111111111111111111111111111111110
pow solution found: 0x000000000000000000000000000000000000000000000000000000000000000c0000000000000000
```