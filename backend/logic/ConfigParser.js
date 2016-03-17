/**
 * Created by Gilles on 17.03.2016.
 */
module.exports = function ConfigParser(process, config) {
  var argumentsToConfigMap = {
    "p" : "appPort",
    "t" : "templatePath",
    "v" : "verbose"
  };

  var argv = require('minimist')(process.argv.slice(2), {
    "default" : config,
    "alias" : argumentsToConfigMap
  });

  return argv;



};