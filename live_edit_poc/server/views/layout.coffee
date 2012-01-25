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
        div ->
            a href: '#/inspection/1/show', -> 'Show Inspection 1'
            span ' | '
            a href: '#/inspection/2/show', -> 'Show Inspection 2'
            span ' | '
            a href: '#/inspection/1/edit', -> 'Edit Inspection 1'
            span ' | '
            a href: '#/inspection/2/edit', -> 'Edit Inspection 2'
        @body