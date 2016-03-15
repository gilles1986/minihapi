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
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/data/{file}',
    handler: function (request, reply) {
      var filename = encodeURIComponent(request.params.file);
      reply.file('./assets/'+filename);
    }
  });

  server.route({
    method: 'GET',
    path: '/{file}',
    handler: function (request, reply) {
      var filename = encodeURIComponent(request.params.file);
      reply.file("./views/"+filename+".html");
    }
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      var filename = encodeURIComponent(request.params.file);
      reply.redirect("/index");
    }
  });
};