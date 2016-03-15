/**
 * Created by gilles on 15.03.2016.
 */
'use strict';

const Hapi = require('hapi');
const Good = require('good');
const Hoek = require('hoek');


const server = new Hapi.Server();
server.connection({ port: 3000 });



require("./routes.js")(server);

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
    path: './views'
  });

  server.start((err) => {

    if (err) {
      throw err;
    }
    console.log('Server running at:', server.info.uri);
  });
});