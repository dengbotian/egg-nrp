'use strict';
const nrp = require('./lib/nrp');

module.exports = app => {
  if (app.config.nrp.app) nrp(app);
};
