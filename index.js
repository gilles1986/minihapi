/**
 * Created by gilles on 15.03.2016.
 */
'use strict';

const Hapi = require('hapi');
const Good = require('good');
const Hoek = require('hoek');

var defaultConfig = require("./config.js");
var config = require("./backend/logic/ConfigParser.js")(process, defaultConfig);

// Global variables
global.log = require("./backend/logic/Logger.js")({verbose: true});

const server = new Hapi.Server();
server.connection({ port: config.appPort });

require("./backend/routes.js")(server);

server.register([require('inert'), require('vision'),{
  register: Good,
  options: {
    reporters: [{
      reporter: require('good-console'),
      events: {
        response: '*',
        log: '*'
      }
    }]
  }
}], (err) => {


  Hoek.assert(!err, err);

  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname,
    path: config.templatePath
  });

  server.start((err) => {

    if (err) {
      throw err;
    }
    console.log('Server running at:', server.info.uri);
  });
});