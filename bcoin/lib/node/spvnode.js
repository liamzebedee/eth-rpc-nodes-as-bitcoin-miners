/*!
 * spvnode.js - spv node for bcoin
 * Copyright (c) 2014-2015, Fedor Indutny (MIT License)
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

'use strict';

const assert = require('bsert');
const Chain = require('../blockchain/chain');
const Pool = require('../net/pool');
const Node = require('./node');
const HTTP = require('./http');
const RPC = require('./rpc');

/**
 * SPV Node
 * Create an spv node which only maintains
 * a chain, a pool, and an http server.
 * @alias module:node.SPVNode
 * @extends Node
 */

class SPVNode extends Node {
  /**
   * Create SPV node.
   * @constructor
   * @param {Object?} options
   * @param {Buffer?} options.sslKey
   * @param {Buffer?} options.sslCert
   * @param {Number?} options.httpPort
   * @param {String?} options.httpHost
   */

  constructor(options) {
    super('bcoin', 'bcoin.conf', 'debug.log', options);

    this.opened = false;

    // SPV flag.
    this.spv = true;

    this.chain = new Chain({
      network: this.network,
      logger: this.logger,
      prefix: this.config.prefix,
      memory: this.memory,
      maxFiles: this.config.uint('max-files'),
      cacheSize: this.config.mb('cache-size'),
      entryCache: this.config.uint('entry-cache'),
      forceFlags: this.config.bool('force-flags'),
      checkpoints: this.config.bool('checkpoints'),
      bip91: this.config.bool('bip91'),
      bip148: this.config.bool('bip148'),
      spv: true
    });

    this.pool = new Pool({
      network: this.network,
      logger: this.logger,
      chain: this.chain,
      prefix: this.config.prefix,
      proxy: this.config.str('proxy'),
      onion: this.config.bool('onion'),
      upnp: this.config.bool('upnp'),
      seeds: this.config.array('seeds'),
      nodes: this.config.array('nodes'),
      only: this.config.array('only'),
      maxOutbound: this.config.uint('max-outbound'),
      createSocket: this.config.func('create-socket'),
      memory: this.memory,
      selfish: true,
      listen: false
    });

    this.rpc = new RPC(this);

    this.http = new HTTP({
      network: this.network,
      logger: this.logger,
      node: this,
      prefix: this.config.prefix,
      ssl: this.config.bool('ssl'),
      keyFile: this.config.path('ssl-key'),
      certFile: this.config.path('ssl-cert'),
      host: this.config.str('http-host'),
      port: this.config.uint('http-port'),
      apiKey: this.config.str('api-key'),
      noAuth: this.config.bool('no-auth'),
      cors: this.config.bool('cors')
    });

    this.init();
  }

  /**
   * Initialize the node.
   * @private
   */

  init() {
    // Bind to errors
    this.chain.on('error', err => this.error(err));
    this.pool.on('error', err => this.error(err));

    if (this.http)
      this.http.on('error', err => this.error(err));

    this.pool.on('tx', (tx) => {
      this.emit('tx', tx);
    });

    this.chain.on('block', (block) => {
      this.emit('block', block);
    });

    this.chain.on('connect', async (entry, block) => {
      this.emit('connect', entry, block);
    });

    this.chain.on('disconnect', (entry, block) => {
      this.emit('disconnect', entry, block);
    });

    this.chain.on('reorganize', (tip, competitor) => {
      this.emit('reorganize', tip, competitor);
    });

    this.chain.on('reset', (tip) => {
      this.emit('reset', tip);
    });

    this.loadPlugins();
  }

  /**
   * Open the node and all its child objects,
   * wait for the database to load.
   * @returns {Promise}
   */

  async open() {
    assert(!this.opened, 'SPVNode is already open.');
    this.opened = true;

    await this.handlePreopen();
    await this.chain.open();
    await this.pool.open();

    await this.openPlugins();

    await this.http.open();
    await this.handleOpen();

    this.logger.info('Node is loaded.');
  }

  /**
   * Close the node, wait for the database to close.
   * @returns {Promise}
   */

  async close() {
    assert(this.opened, 'SPVNode is not open.');
    this.opened = false;

    await this.handlePreclose();
    await this.http.close();

    await this.closePlugins();

    await this.pool.close();
    await this.chain.close();
    await this.handleClose();
  }

  /**
   * Scan for any missed transactions.
   * Note that this will replay the blockchain sync.
   * @param {Number|Hash} start - Start block.
   * @returns {Promise}
   */

  async scan(start) {
    throw new Error('Not implemented.');
  }

  /**
   * Broadcast a transaction (note that this will _not_ be verified
   * by the mempool - use with care, lest you get banned from
   * bitcoind nodes).
   * @param {TX|Block} item
   * @returns {Promise}
   */

  async broadcast(item) {
    try {
      await this.pool.broadcast(item);
    } catch (e) {
      this.emit('error', e);
    }
  }

  /**
   * Broadcast a transaction (note that this will _not_ be verified
   * by the mempool - use with care, lest you get banned from
   * bitcoind nodes).
   * @param {TX} tx
   * @returns {Promise}
   */

  sendTX(tx) {
    return this.broadcast(tx);
  }

  /**
   * Broadcast a transaction. Silence errors.
   * @param {TX} tx
   * @returns {Promise}
   */

  relay(tx) {
    return this.broadcast(tx);
  }

  /**
   * Connect to the network.
   * @returns {Promise}
   */

  connect() {
    return this.pool.connect();
  }

  /**
   * Disconnect from the network.
   * @returns {Promise}
   */

  disconnect() {
    return this.pool.disconnect();
  }

  /**
   * Start the blockchain sync.
   */

  startSync() {
    return this.pool.startSync();
  }

  /**
   * Stop syncing the blockchain.
   */

  stopSync() {
    return this.pool.stopSync();
  }
}

/*
 * Expose
 */

module.exports = SPVNode;
