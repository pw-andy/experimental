require('zappa') 4000, ->
	@use 'bodyParser', 'methodOverride', @app.router, 'static'

	@configure
		development: => @use errorHandler: {dumpExceptions: on}
		production: => @use 'errorHandler'

	@include './routes/index'
		