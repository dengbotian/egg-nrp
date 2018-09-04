'use strict';

const nrp = require('./lib/nrp');

module.exports = agent => {
  if (agent.config.nrp.agent) nrp(agent);
};