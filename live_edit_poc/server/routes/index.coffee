 @include = ->
 	@get '/': -> 
        @render index: {title: 'Live Edit Proof of Concept'}