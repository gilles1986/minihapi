/**
 * Created by gilles on 15.03.2016.
 */
module.exports = function(request,reply, server) {
  reply.view("hello.html", {"title" : "myyyy"});
};