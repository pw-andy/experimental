doctype 5
html ->
    head ->
        title 'Edit Flow POC'

        link rel:'stylesheet', href: '/stylesheets/style.css'

        script data: {main: 'javascripts/main.js'}, src: 'javascripts/require.js'

        #coffeescript ->
        #    $ ->
        #        $('.liveForm').liveEdit()
    body ->
        @body