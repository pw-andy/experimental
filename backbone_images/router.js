function route(handle, pathname, request, response, postData) {
	if (typeof handle[pathname] === 'function') {
		handle[pathname](request, response, postData);
	} else {
		handle["*"](request, response, postData);
	}
}

exports.route = route;