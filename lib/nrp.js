
'use strict';

const assert = require('assert');
var NRP    = require('node-redis-pubsub');
let count = 0;
module.exports = app => {
  app.addSingleton('nrp', (config, app) => {

    assert(config.host && config.port && config.password !== undefined && config.db !== undefined && config.scope != undefined,
      `[egg-nrp] 'host: ${config.host}', 'port: ${config.port}', 'password: ${config.password}', 'db: ${config.db}', 'scope: ${config.scope}', are required on config`);

    app.coreLogger.info('[egg-nrp] connecting redis://:%s@%s:%s/%s',
      config.password, config.host, config.port, config.db);

    const client = new NRP(config);
    client.on('connect', function() {
      app.coreLogger.info('[egg-nrp] connect success on redis://:%s@%s:%s/%s',
        config.password, config.host, config.port, config.db);
    });
    client.on('error', function(error) {
      app.coreLogger.error(error);
    });
  
    app.beforeStart(async () => {
      const index = count++;
      app.coreLogger.info(`[egg-nrp] instance[${index}] status OK`);
    });
  
    return client;
  });
};
