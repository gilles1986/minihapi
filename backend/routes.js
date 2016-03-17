/**
 * Created by gilles on 15.03.2016.
 */
module.exports = function(server) {


  server.route({
    method: 'GET',
    path: '/action/{file}',
    handler: function (request, reply) {
      var filename = encodeURIComponent(request.params.file);
      try {
        require('./action/'+filename+"/")(request, reply, server);
      } catch (e) {
        reply("Action "+filename+" not found");
        log.warn("Action "+filename+" not found: "+e);
      }
    }
  });


  server.route({
    method: 'GET',
    path: '/{file}',
    handler: function (request, reply) {
      var filename = encodeURIComponent(request.params.file);
      reply.view(filename);
    }
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      log.info("Called ROOT");
      var filename = encodeURIComponent(request.params.file);
      reply.redirect("/index");
    }
  });
};