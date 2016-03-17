/**
 * Created by Gilles on 17.03.2016.
 */
module.exports = function(logConfig) {
  var winston = require('winston');
  winston.level = logConfig.verbose ? 'debug' : "info";

  var logger = new (winston.Logger)({
   transports: [
     new (winston.transports.Console)()
   ]
  });

  return logger;


};