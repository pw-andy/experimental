doctype 5
html ->
    head ->
        title 'Edit Flow POC'

        link rel:'stylesheet', href: '/stylesheets/style.css'

        script src: '/javascripts/jquery-1.7.1.min.js'
        script src: '/javascripts/json2.js'
        script src: '/javascripts/jquery.liveEdit.js'

        coffeescript ->
            $ ->
                $('.liveForm').liveEdit()
    body ->
        @body