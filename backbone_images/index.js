var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/imgjson"] = requestHandlers.imgjson;
handle["/uploadimg"] = requestHandlers.uploadimg;
handle["*"] = requestHandlers.static;

server.start(router.route, handle);
