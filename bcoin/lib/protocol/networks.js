/*!
 * network.js - bitcoin networks for bcoin
 * Copyright (c) 2014-2015, Fedor Indutny (MIT License)
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

'use strict';

/**
 * @module protocol/networks
 */

const BN = require('bcrypto/lib/bn.js');

const network = exports;

/*
 * Helpers
 */

function b(hash) {
  return Buffer.from(hash, 'hex');
}

/**
 * Network type list.
 * @memberof module:protocol/networks
 * @const {String[]}
 * @default
 */

network.types = ['main', 'testnet', 'regtest', 'simnet'];

/**
 * Mainnet
 * @static
 * @lends module:protocol/networks
 * @type {Object}
 */

const main = {};

/**
 * Symbolic network type.
 * @const {String}
 * @default
 */

main.type = 'main';

/**
 * Default DNS seeds.
 * @const {String[]}
 * @default
 */

main.seeds = [
  'seed.bitcoin.sipa.be', // Pieter Wuille
  'dnsseed.bluematt.me', // Matt Corallo
  'dnsseed.bitcoin.dashjr.org', // Luke Dashjr
  'seed.bitcoinstats.com', // Christian Decker
  'seed.bitcoin.jonasschnelli.ch', // Jonas Schnelli
  'seed.btc.petertodd.org', // Peter Todd
  'seed.bitcoin.sprovoost.nl', // Sjors Provoost
  'dnsseed.emzy.de' // Stephan Oeste
];

/**
 * Packet magic number.
 * @const {Number}
 * @default
 */

main.magic = 0xd9b4bef9;

/**
 * Default network port.
 * @const {Number}
 * @default
 */

main.port = 8333;

/**
 * Checkpoint block list.
 * @const {Object}
 */

main.checkpointMap = {
  11111: b('1d7c6eb2fd42f55925e92efad68b61edd22fba29fde8783df744e26900000000'),
  33333: b('a6d0b5df7d0df069ceb1e736a216ad187a50b07aaa4e78748a58d52d00000000'),
  74000: b('201a66b853f9e7814a820e2af5f5dc79c07144e31ce4c9a39339570000000000'),
  105000: b('97dc6b1d15fbeef373a744fee0b254b0d2c820a3ae7f0228ce91020000000000'),
  134444: b('feb0d2420d4a18914c81ac30f494a5d4ff34cd15d34cfd2fb105000000000000'),
  168000: b('63b703835cb735cb9a89d733cbe66f212f63795e0172ea619e09000000000000'),
  193000: b('17138bca83bdc3e6f60f01177c3877a98266de40735f2a459f05000000000000'),
  210000: b('2e3471a19b8e22b7f939c63663076603cf692f19837e34958b04000000000000'),
  216116: b('4edf231bf170234e6a811460f95c94af9464e41ee833b4f4b401000000000000'),
  225430: b('32595730b165f097e7b806a679cf7f3e439040f750433808c101000000000000'),
  250000: b('14d2f24d29bed75354f3f88a5fb50022fc064b02291fdf873800000000000000'),
  279000: b('407ebde958e44190fa9e810ea1fc3a7ef601c3b0a0728cae0100000000000000'),
  295000: b('83a93246c67003105af33ae0b29dd66f689d0f0ff54e9b4d0000000000000000'),
  300255: b('b2f3a0f0de4120c1089d5f5280a263059f9b6e7c520428160000000000000000'),
  319400: b('3bf115fd057391587ca39a531c5d4989e1adec9b2e05c6210000000000000000'),
  343185: b('548536d48e7678fcfa034202dd45d4a76b1ad061f38b2b070000000000000000'),
  352940: b('ffc9520143e41c94b6e03c2fa3e62bb76b55ba2df45d75100000000000000000'),
  382320: b('b28afdde92b0899715e40362f56afdb20e3d135bedc68d0a0000000000000000'),
  401465: b('eed16cb3e893ed9366f27c39a9ecd95465d02e3ef40e45010000000000000000'),
  420000: b('a1ff746b2d42b834cb7d6b8981b09c265c2cabc016e8cc020000000000000000'),
  440000: b('9bf296b8de5f834f7635d5e258a434ad51b4dbbcf7c08c030000000000000000'),
  450000: b('0ba2070c62cd9da1f8cef88a0648c661a411d33e728340010000000000000000'),
  460000: b('8c25fc7e414d3e868d6ce0ec473c30ad44e7e8bc1b75ef000000000000000000'),
  470000: b('89756d1ed75901437300af10d5ab69070a282e729c536c000000000000000000'),
  480000: b('b1a896fd31e639e0c74d1abeb1dbc93f176b767a5d4c02010000000000000000'),
  490000: b('90dec4d0153f20fbdcb245b1d5fb3d5a8d7bb1379106de000000000000000000'),
  500000: b('045d94a1c33354c3759cc0512dcc49fd81bf4c3637fb24000000000000000000'),
  510000: b('297301b8ca28584cb0c31c7e3fed51696bc33ef8782615000000000000000000'),
  525000: b('1dde8e3fb49bbd5ab66a1b847544d67fff10b108a1fa2f000000000000000000')
};

/**
 * Last checkpoint height.
 * @const {Number}
 * @default
 */

main.lastCheckpoint = 525000;

main.txnData = {
  rate: 2.925802860942233,
  time: 1661697692,
  count: 760120522
};

/**
 * @const {Number}
 * @default
 */

main.halvingInterval = 210000;

/**
 * Genesis block header.
 * @const {Object}
 */

main.genesis = {
  version: 1,
  hash: b('6fe28c0ab6f1b372c1a6a246ae63f74f931e8365e15a089c68d6190000000000'),
  prevBlock:
    b('0000000000000000000000000000000000000000000000000000000000000000'),
  merkleRoot:
    b('3ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a'),
  time: 1231006505,
  bits: 486604799,
  nonce: 2083236893,
  height: 0
};

/**
 * The network's genesis block in a hex string.
 * @const {String}
 */

main.genesisBlock =
  '0100000000000000000000000000000000000000000000000000000000000000000000'
  + '003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a29ab'
  + '5f49ffff001d1dac2b7c01010000000100000000000000000000000000000000000000'
  + '00000000000000000000000000ffffffff4d04ffff001d0104455468652054696d6573'
  + '2030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66'
  + '207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01'
  + '000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f'
  + '61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f'
  + 'ac00000000';

/**
 * POW-related constants.
 * @enum {Number}
 * @default
 */

main.pow = {
  /**
   * Default target.
   * @const {BN}
   */

  limit: new BN(
    '00000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    'hex'
  ),

  /**
   * Compact pow limit.
   * @const {Number}
   * @default
   */

  bits: 486604799,

  /**
   * Minimum chainwork for best chain.
   * @const {BN}
   */

  chainwork: new BN(
    '00000000000000000000000000000000000000000259c9b7d8c7779d29a1188f',
    'hex'
  ),

  /**
   * Desired retarget period in seconds.
   * @const {Number}
   * @default
   */

  targetTimespan: 14 * 24 * 60 * 60,

  /**
   * Average block time.
   * @const {Number}
   * @default
   */

  targetSpacing: 10 * 60,

  /**
   * Retarget interval in blocks.
   * @const {Number}
   * @default
   */

  retargetInterval: 2016,

  /**
   * Whether to reset target if a block
   * has not been mined recently.
   * @const {Boolean}
   * @default
   */

  targetReset: false,

  /**
   * Do not allow retargetting.
   * @const {Boolean}
   * @default
   */

  noRetargeting: false
};

/**
 * Block constants.
 * @enum {Number}
 * @default
 */

main.block = {
  /**
   * Height at which bip34 was activated.
   * Used for avoiding bip30 checks.
   */

  bip34height: 227931,

  /**
   * Hash of the block that activated bip34.
   */

  bip34hash:
    b('b808089c756add1591b1d17bab44bba3fed9e02f942ab4894b02000000000000'),

  /**
   * Height at which bip65 was activated.
   */

  bip65height: 388381,

  /**
   * Hash of the block that activated bip65.
   */

  bip65hash:
    b('f035476cfaeb9f677c2cdad00fd908c556775ded24b6c2040000000000000000'),

  /**
   * Height at which bip66 was activated.
   */

  bip66height: 363725,

  /**
   * Hash of the block that activated bip66.
   */

  bip66hash:
    b('3109b588941188a9f1c2576aae462d729b8cce9da1ea79030000000000000000'),

  /**
   * Safe height to start pruning.
   */

  pruneAfterHeight: 1000,

  /**
   * Safe number of blocks to keep.
   */

  keepBlocks: 288,

  /**
   * Age used for the time delta to
   * determine whether the chain is synced.
   */

  maxTipAge: 24 * 60 * 60,

  /**
   * Height at which block processing is
   * slow enough that we can output
   * logs without spamming.
   */

  slowHeight: 325000
};

/**
 * Map of historical blocks which create duplicate transactions hashes.
 * @see https://github.com/bitcoin/bips/blob/master/bip-0030.mediawiki
 * @const {Object}
 * @default
 */

main.bip30 = {
  91842: b('eccae000e3c8e4e093936360431f3b7603c563c1ff6181390a4d0a0000000000'),
  91880: b('21d77ccb4c08386a04ac0196ae10f6a1d2c2a377558ca190f143070000000000')
};

/**
 * For versionbits.
 * @const {Number}
 * @default
 */

main.activationThreshold = 1916; // 95% of 2016

/**
 * Confirmation window for versionbits.
 * @const {Number}
 * @default
 */

main.minerWindow = 2016; // nPowTargetTimespan / nPowTargetSpacing

/**
 * Deployments for versionbits.
 * @const {Object}
 * @default
 */

main.deployments = {
  csv: {
    name: 'csv',
    bit: 0,
    startTime: 1462060800, // May 1st, 2016
    timeout: 1493596800, // May 1st, 2017
    threshold: -1,
    window: -1,
    required: false,
    force: true
  },
  segwit: {
    name: 'segwit',
    bit: 1,
    startTime: 1479168000, // November 15th, 2016.
    timeout: 1510704000, // November 15th, 2017.
    threshold: -1,
    window: -1,
    required: true,
    force: false
  },
  segsignal: {
    name: 'segsignal',
    bit: 4,
    startTime: 1496275200, // June 1st, 2017.
    timeout: 1510704000, // November 15th, 2017.
    threshold: 269, // 80%
    window: 336, // ~2.33 days
    required: false,
    force: false
  },
  testdummy: {
    name: 'testdummy',
    bit: 28,
    startTime: 1199145601, // January 1, 2008
    timeout: 1230767999, // December 31, 2008
    threshold: -1,
    window: -1,
    required: false,
    force: true
  }
};

/**
 * Deployments for versionbits (array form, sorted).
 * @const {Array}
 * @default
 */

main.deploys = [
  main.deployments.csv,
  main.deployments.segwit,
  main.deployments.segsignal,
  main.deployments.testdummy
];

/**
 * Key prefixes.
 * @enum {Number}
 * @default
 */

main.keyPrefix = {
  privkey: 0x80,
  xpubkey: 0x0488b21e,
  xprivkey: 0x0488ade4,
  xpubkey58: 'xpub',
  xprivkey58: 'xprv',
  coinType: 0
};

/**
 * {@link Address} prefixes.
 * @enum {Number}
 */

main.addressPrefix = {
  pubkeyhash: 0x00,
  scripthash: 0x05,
  bech32: 'bc'
};

/**
 * Default value for whether the mempool
 * accepts non-standard transactions.
 * @const {Boolean}
 * @default
 */

main.requireStandard = true;

/**
 * Default http port.
 * @const {Number}
 * @default
 */

main.rpcPort = 8332;

/**
 * Default wallet port.
 * @const {Number}
 * @default
 */

main.walletPort = 8334;

/**
 * Default min relay rate.
 * @const {Rate}
 * @default
 */

main.minRelay = 1000;

/**
 * Default normal relay rate.
 * @const {Rate}
 * @default
 */

main.feeRate = 5000;

/**
 * Maximum normal relay rate.
 * @const {Rate}
 * @default
 */

main.maxFeeRate = 400000;

/**
 * Whether to allow self-connection.
 * @const {Boolean}
 */

main.selfConnect = false;

/**
 * Whether to request mempool on sync.
 * @const {Boolean}
 */

main.requestMempool = false;

/*
 * Testnet (v3)
 * https://en.bitcoin.it/wiki/Testnet
 */

const testnet = {};

testnet.type = 'testnet';

testnet.seeds = [
  'testnet-seed.bitcoin.jonasschnelli.ch', // Jonas Schnelli
  'seed.tbtc.petertodd.org', // Peter Todd
  'testnet-seed.bluematt.me', // Matt Corallo
  'testnet-seed.bitcoin.schildbach.de', // Andreas Schildbach
  'seed.testnet.bitcoin.sprovoost.nl' // Sjors Provoost
];

testnet.magic = 0x0709110b;

testnet.port = 18333;

testnet.checkpointMap = {
  546: b('70cb6af7ebbcb1315d3414029c556c55f3e2fc353c4c9063a76c932a00000000'),
  10000: b('02a1b43f52591e53b660069173ac83b675798e12599dbb0442b7580000000000'),
  50000: b('0c6ceabe803cec55ba2831e445956d0a43ba9521743a802cddac7e0700000000'),
  90000: b('cafc21e17faf90461a5905aa03302c394912651ed9475ae711723e0d00000000'),
  100000: b('1e0a16bbadccde1d80c66597b1939e45f91b570d29f95fc158299e0000000000'),
  140000: b('92c0877b54c556889b72175ccbe0c91a1208f6ef7efb2c006101062300000000'),
  170000: b('508125560d202b89757889bb0e49c712477be20440058f05db4f0e0000000000'),
  210000: b('32365454b5f29a826bff8ad9b0448cad0072fc73d50e482d91a3dece00000000'),
  230000: b('b11a447e62643e0b27406eb0fc270cb8126d7b5b70822fb642d9513400000000'),
  270000: b('1c42b811cf9c163932f6e95ec55bf9b5e2cb5324e7e93001572e000000000000'),
  300000: b('a141bf3972424853f04367b47995e220e0b5a2706e5618766f22000000000000'),
  340000: b('67edd4d92e405608109164b15f92b193377d49325b0ed036739c010000000000'),
  350000: b('592b44bc0f7a4286cf07ead8497114c6952c1c7dea7305193deacf8e00000000'),
  390000: b('f217e183484fb6d695609cc71fa2ae24c3020943407e0150b298030000000000'),
  420000: b('de9e73a3b91fbb014e036e8583a17d6b638a699aeb2de8573d12580800000000'),
  460000: b('2e8baaffc107f15c87aebe01664b63d07476afa53bcbada1281a030000000000'),
  500000: b('06f60922a2aab2757317820fc6ffaf6a470e2cbb0f63a2aac0a7010000000000'),
  540000: b('8dd0bebfbc4878f5af09d3e848dcc57827d2c1cebea8ec5d8cbe420500000000'),
  570000: b('87acbd4cd3c40ec9bd648f8698ed226b31187274c06cc7a9af79030000000000'),
  600000: b('169a05b3bb04b7d13ad628915630900a5ed2e89f3a9dc6064f62000000000000'),
  630000: b('bbbe117035432a6a4effcb297207a02b031735b43e0d19a9217c000000000000'),
  670000: b('080bfe75caed8624fcfdfbc65973c8f962d7bdc495a891f5d16b7d0000000000'),
  700000: b('c14d3f6a1e7c7d66fd940951e44f3c3be1273bea4d2ab1786140000000000000'),
  740000: b('b3b423f0462fd78a01e4f1a59a2737a0525b5dbb9bba0b4634f9000000000000'),
  780000: b('0381582e34c3755964dc2813e2b33e521e5596367144e1670851050000000000'),
  800000: b('03b5f8ab257e02903f509f5ff2935220eec2e77b1819651d099b200000000000'),
  840000: b('dac1648107bd4394e57e4083c86d42b548b1cfb119665f179ea80a0000000000'),
  880000: b('ff90b4bb07eded8e96715bf595c09c7d21dd8c61b8306ff48705d60000000000'),
  900000: b('9bd8ac418beeb1a2cf5d68c8b5c6ebaa947a5b766e5524898d6f350000000000'),
  940000: b('c98f1651a475b00d12f8c25eb166ee843affaa90610e36a19d68030000000000'),
  980000: b('cc8e9774542d044a9698ca2336ae02d5987157e676f1c76aa3877c0000000000'),
  1010000:
    b('9d9fb11abc2712d80368229e97b8d827b2a07d27eb5335e5c924000000000000'),
  1050000: b('d8190cf0af7f08e179cab51d67db0b44b87951a78f7fdc31b4a01a0000000000')
};

testnet.lastCheckpoint = 1050000;

testnet.txnData = {
  rate: 0.1079119341520164,
  time: 1661705221,
  count: 63531852
};

testnet.halvingInterval = 210000;

testnet.genesis = {
  version: 1,
  hash: b('43497fd7f826957108f4a30fd9cec3aeba79972084e90ead01ea330900000000'),
  prevBlock:
    b('0000000000000000000000000000000000000000000000000000000000000000'),
  merkleRoot:
    b('3ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a'),
  time: 1296688602,
  bits: 486604799,
  nonce: 414098458,
  height: 0
};

testnet.genesisBlock =
  '0100000000000000000000000000000000000000000000000000000000000000000000'
  + '003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4adae5'
  + '494dffff001d1aa4ae1801010000000100000000000000000000000000000000000000'
  + '00000000000000000000000000ffffffff4d04ffff001d0104455468652054696d6573'
  + '2030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66'
  + '207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01'
  + '000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f'
  + '61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f'
  + 'ac00000000';

testnet.pow = {
  limit: new BN(
    '00000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    'hex'
  ),
  bits: 486604799,
  chainwork: new BN(
    '000000000000000000000000000000000000000000000062b7123cfd7d09f7b6',
    'hex'
  ),
  targetTimespan: 14 * 24 * 60 * 60,
  targetSpacing: 10 * 60,
  retargetInterval: 2016,
  targetReset: true,
  noRetargeting: false
};

testnet.block = {
  bip34height: 21111,
  bip34hash:
    b('f88ecd9912d00d3f5c2a8e0f50417d3e415c75b3abe584346da9b32300000000'),
  bip65height: 581885,
  bip65hash:
    b('b61e864fbec41dfaf09da05d1d76dc068b0dd82ee7982ff255667f0000000000'),
  bip66height: 330776,
  bip66hash:
    b('82a14b9e5ea81d4832b8e2cd3c2a6092b5a3853285a8995ec4c8042100000000'),
  pruneAfterHeight: 1000,
  keepBlocks: 10000,
  maxTipAge: 24 * 60 * 60,
  slowHeight: 950000
};

testnet.bip30 = {};

testnet.activationThreshold = 1512; // 75% for testchains

testnet.minerWindow = 2016; // nPowTargetTimespan / nPowTargetSpacing

testnet.deployments = {
  csv: {
    name: 'csv',
    bit: 0,
    startTime: 1456790400, // March 1st, 2016
    timeout: 1493596800, // May 1st, 2017
    threshold: -1,
    window: -1,
    required: false,
    force: true
  },
  segwit: {
    name: 'segwit',
    bit: 1,
    startTime: 1462060800, // May 1st 2016
    timeout: 1493596800, // May 1st 2017
    threshold: -1,
    window: -1,
    required: true,
    force: false
  },
  segsignal: {
    name: 'segsignal',
    bit: 4,
    startTime: 0xffffffff,
    timeout: 0xffffffff,
    threshold: 269,
    window: 336,
    required: false,
    force: false
  },
  testdummy: {
    name: 'testdummy',
    bit: 28,
    startTime: 1199145601, // January 1, 2008
    timeout: 1230767999, // December 31, 2008
    threshold: -1,
    window: -1,
    required: false,
    force: true
  }
};

testnet.deploys = [
  testnet.deployments.csv,
  testnet.deployments.segwit,
  testnet.deployments.segsignal,
  testnet.deployments.testdummy
];

testnet.keyPrefix = {
  privkey: 0xef,
  xpubkey: 0x043587cf,
  xprivkey: 0x04358394,
  xpubkey58: 'tpub',
  xprivkey58: 'tprv',
  coinType: 1
};

testnet.addressPrefix = {
  pubkeyhash: 0x6f,
  scripthash: 0xc4,
  bech32: 'tb'
};

testnet.requireStandard = false;

testnet.rpcPort = 18332;

testnet.walletPort = 18334;

testnet.minRelay = 1000;

testnet.feeRate = 20000;

testnet.maxFeeRate = 60000;

testnet.selfConnect = false;

testnet.requestMempool = false;

/*
 * Regtest
 */

const regtest = {};

regtest.type = 'regtest';

regtest.seeds = [];

regtest.magic = 0xdab5bffa;

regtest.port = 48444;

regtest.checkpointMap = {};
regtest.lastCheckpoint = 0;

regtest.txnData = {
  rate: 0,
  time: 0,
  count: 0
};

regtest.halvingInterval = 150;

regtest.genesis = {
  version: 1,
  hash: b('06226e46111a0b59caaf126043eb5bbf28c34f3a5e332a1fc7b2b73cf188910f'),
  prevBlock:
    b('0000000000000000000000000000000000000000000000000000000000000000'),
  merkleRoot:
    b('3ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a'),
  time: 1296688602,
  bits: 545259519,
  nonce: 2,
  height: 0
};

regtest.genesisBlock =
  '0100000000000000000000000000000000000000000000000000000000000000000000'
  + '003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4adae5'
  + '494dffff7f200200000001010000000100000000000000000000000000000000000000'
  + '00000000000000000000000000ffffffff4d04ffff001d0104455468652054696d6573'
  + '2030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66'
  + '207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01'
  + '000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f'
  + '61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f'
  + 'ac00000000';

regtest.pow = {
  limit: new BN(
    '7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    'hex'
  ),
  bits: 545259519,
  chainwork: new BN(
    '0000000000000000000000000000000000000000000000000000000000000002',
    'hex'
  ),
  targetTimespan: 14 * 24 * 60 * 60,
  targetSpacing: 10 * 60,
  retargetInterval: 2016,
  targetReset: true,
  noRetargeting: true
};

regtest.block = {
  bip34height: 100000000,
  bip34hash: null,
  bip65height: 1351,
  bip65hash: null,
  bip66height: 1251,
  bip66hash: null,
  pruneAfterHeight: 1000,
  keepBlocks: 10000,
  maxTipAge: 0xffffffff,
  slowHeight: 0
};

regtest.bip30 = {};

regtest.activationThreshold = 108; // 75% for testchains

regtest.minerWindow = 144; // Faster than normal for regtest

regtest.deployments = {
  csv: {
    name: 'csv',
    bit: 0,
    startTime: 0,
    timeout: 0xffffffff,
    threshold: -1,
    window: -1,
    required: false,
    force: true
  },
  segwit: {
    name: 'segwit',
    bit: 1,
    startTime: -1,
    timeout: 0xffffffff,
    threshold: -1,
    window: -1,
    required: true,
    force: false
  },
  segsignal: {
    name: 'segsignal',
    bit: 4,
    startTime: 0xffffffff,
    timeout: 0xffffffff,
    threshold: 269,
    window: 336,
    required: false,
    force: false
  },
  testdummy: {
    name: 'testdummy',
    bit: 28,
    startTime: 0,
    timeout: 0xffffffff,
    threshold: -1,
    window: -1,
    required: false,
    force: true
  }
};

regtest.deploys = [
  regtest.deployments.csv,
  regtest.deployments.segwit,
  regtest.deployments.segsignal,
  regtest.deployments.testdummy
];

regtest.keyPrefix = {
  privkey: 0xef,
  xpubkey: 0x043587cf,
  xprivkey: 0x04358394,
  xpubkey58: 'tpub',
  xprivkey58: 'tprv',
  coinType: 1
};

regtest.addressPrefix = {
  pubkeyhash: 0x6f,
  scripthash: 0xc4,
  bech32: 'bcrt'
};

regtest.requireStandard = false;

regtest.rpcPort = 48332;

regtest.walletPort = 48334;

regtest.minRelay = 1000;

regtest.feeRate = 20000;

regtest.maxFeeRate = 60000;

regtest.selfConnect = true;

regtest.requestMempool = true;

/*
 * Simnet (btcd)
 */

const simnet = {};

simnet.type = 'simnet';

simnet.seeds = [
  '127.0.0.1'
];

simnet.magic = 0x12141c16;

simnet.port = 18555;

simnet.checkpointMap = {};

simnet.lastCheckpoint = 0;

simnet.txnData = {
  time: 0,
  count: 0,
  rate: 0
};

simnet.halvingInterval = 210000;

simnet.genesis = {
  version: 1,
  hash:
    b('f67ad7695d9b662a72ff3d8edbbb2de0bfa67b13974bb9910d116d5cbd863e68'),
  prevBlock:
    b('0000000000000000000000000000000000000000000000000000000000000000'),
  merkleRoot:
    b('3ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a'),
  time: 1401292357,
  bits: 545259519,
  nonce: 2,
  height: 0
};

simnet.genesisBlock =
  '0100000000000000000000000000000000000000000000000000000000000000000000'
  + '003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a4506'
  + '8653ffff7f200200000001010000000100000000000000000000000000000000000000'
  + '00000000000000000000000000ffffffff4d04ffff001d0104455468652054696d6573'
  + '2030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66'
  + '207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01'
  + '000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f'
  + '61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f'
  + 'ac00000000';

simnet.pow = {
  limit: new BN(
    // High target of 0x207fffff (545259519)
    '7fffff0000000000000000000000000000000000000000000000000000000000',
    'hex'
  ),
  bits: 545259519,
  chainwork: new BN(
    '0000000000000000000000000000000000000000000000000000000000000002',
    'hex'
  ),
  targetTimespan: 14 * 24 * 60 * 60,
  targetSpacing: 10 * 60,
  retargetInterval: 2016,
  targetReset: true,
  noRetargeting: false
};

simnet.block = {
  bip34height: 0,
  bip34hash:
    b('f67ad7695d9b662a72ff3d8edbbb2de0bfa67b13974bb9910d116d5cbd863e68'),
  bip65height: 0,
  bip65hash:
    b('f67ad7695d9b662a72ff3d8edbbb2de0bfa67b13974bb9910d116d5cbd863e68'),
  bip66height: 0,
  bip66hash:
    b('f67ad7695d9b662a72ff3d8edbbb2de0bfa67b13974bb9910d116d5cbd863e68'),
  pruneAfterHeight: 1000,
  keepBlocks: 10000,
  maxTipAge: 0xffffffff,
  slowHeight: 0
};

simnet.bip30 = {};

simnet.activationThreshold = 75; // 75% for testchains

simnet.minerWindow = 100; // nPowTargetTimespan / nPowTargetSpacing

simnet.deployments = {
  csv: {
    name: 'csv',
    bit: 0,
    startTime: 0, // March 1st, 2016
    timeout: 0xffffffff, // May 1st, 2017
    threshold: -1,
    window: -1,
    required: false,
    force: true
  },
  segwit: {
    name: 'segwit',
    bit: 1,
    startTime: 0, // May 1st 2016
    timeout: 0xffffffff, // May 1st 2017
    threshold: -1,
    window: -1,
    required: true,
    force: false
  },
  segsignal: {
    name: 'segsignal',
    bit: 4,
    startTime: 0xffffffff,
    timeout: 0xffffffff,
    threshold: 269,
    window: 336,
    required: false,
    force: false
  },
  testdummy: {
    name: 'testdummy',
    bit: 28,
    startTime: 1199145601, // January 1, 2008
    timeout: 1230767999, // December 31, 2008
    threshold: -1,
    window: -1,
    required: false,
    force: true
  }
};

simnet.deploys = [
  simnet.deployments.csv,
  simnet.deployments.segwit,
  simnet.deployments.segsignal,
  simnet.deployments.testdummy
];

simnet.keyPrefix = {
  privkey: 0x64,
  xpubkey: 0x0420bd3a,
  xprivkey: 0x0420b900,
  xpubkey58: 'spub',
  xprivkey58: 'sprv',
  coinType: 115
};

simnet.addressPrefix = {
  pubkeyhash: 0x3f,
  scripthash: 0x7b,
  bech32: 'sb'
};

simnet.requireStandard = false;

simnet.rpcPort = 18556;

simnet.walletPort = 18558;

simnet.minRelay = 1000;

simnet.feeRate = 20000;

simnet.maxFeeRate = 60000;

simnet.selfConnect = false;

simnet.requestMempool = false;

/*
 * Expose
 */

network.main = main;
network.testnet = testnet;
network.regtest = regtest;
network.simnet = simnet;
