var fs =  require('fs');
var path = require('path');
var qs = require('querystring'); 

var counter = 1;

function start(request, response, postData) {
	console.log("Request handler 'start' was called");

	var body = '<html>' +
		'<body>' +
		'<form action="/upload" method="post">' +
		'<textarea name="text" rows="20" cols="60"></textarea>' +
		'<input type="submit" value="Submit text" />' +
		'</form>' +
		'</body>' +
		'</html>';

	standard(response, body);
}

function upload(request, response, postData) {
	console.log("Request handler 'upload' was called");

	standard(response, "You've sent: " + postData);
}

function imgjson(request, response, postData) {
	console.log("Request handler 'imgjson' was called");
	var id = counter++;

	var output = {"images":[
		{
			"id": id,
			"thumbnail_url":"http://i.imgur.com/RW2k9.jpg",
			"delete_url":"http://i.imgur.com/RW2k9.jpg",
			"small_url":"http://i.imgur.com/RW2k9.jpg",
			"orderIndex":0,
			"delete_type":"DELETE",
			"name":id,
			"type":"",
			"url":"http://i.imgur.com/RW2k9.jpg",
			"size":43340
		}
	]};

	var body = JSON.stringify(output);
	response.writeHead(200, {'Content-Type': 'application/json', 'Content-Length': body.length});
	response.end(body);
}

function uploadimg(request, response, postData) {
	console.log("Request handler 'uploadimg' was called");

	var id = counter++;
	var output = [{
			"id": id,
			"thumbnail_url":"http://i.imgur.com/RW2k9.jpg",
			"delete_url":"http://i.imgur.com/RW2k9.jpg",
			"small_url":"http://i.imgur.com/RW2k9.jpg",
			"orderIndex":1,
			"delete_type":"DELETE",
			"name":"uploaded" + id,
			"type":"",
			"url":"http://i.imgur.com/RW2k9.jpg",
			"size":43340
		}];

	var body = JSON.stringify(output);
	response.writeHead(200, {'Content-Type': 'application/json', 'Content-Length': body.length});
	response.end(body);
}

function static(request, response, postData) {
	var file = './static' + request.url;
	if (file == './static/') {
		file = './static/index.html';
	}
	path.exists(file, function(exists) {
		if (exists) {
			fs.readFile(file, function(error, content) {
				if (error) {
					console.log('Static file result: (500) ' + file);
					response.writeHead(500);
					response.end();
				} else {
					console.log('Static file result: (200) ' + file);
					var extname = path.extname(file);
					var type = 'text/html';
					switch (extname) {
						case '.js':
							type = 'text/javascript';
							break;
						case '.css':
							type = 'text/css';
							break;
						case '.jpeg':
						case '.jpg':
							type = 'image/jpeg';
							break;
						case '.png':
							type = 'image/png';
							break;
					}
					response.writeHead(200, {'Content-Type': type});
					response.end(content);
				}
			})
		} else {
			console.log('Static file result: (404) ' + file);
			response.writeHead(404);
			response.end();
		}
	})

}

function standard(response, text) {
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(text);
	response.end();
}

exports.start = start;
exports.upload = upload;
exports.static = static;
exports.imgjson = imgjson;
exports.uploadimg = uploadimg;