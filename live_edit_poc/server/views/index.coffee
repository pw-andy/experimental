h1 @title

div class: 'liveForm section', ->
    div ->
        table ->
            tr ->
                td ->
                    span class:'live', -> 'John'
                td ->
                    span class:'live', -> 'Q'
                td ->
                    span class:'live', -> 'Doe'

    div ->
        span class:'live', -> '123 Test Street'

    div ->
        table ->
            tr ->
                td ->
                    span class:'live', -> 'Mason'
                td ->
                    span class:'live', -> 'OH'
                td ->
                    span class:'live', -> '45040'

    div ->
        span class:'live', data: {editor: 'list', elements: "[{'k':'0', 'v':'Zero'}, {'k':'1', 'v':'One'}, {'k':'2', 'v':'Two'}]" }, -> 'Other Info 1'

    div ->
        span class:'live', -> 'Other Info 2'

    div ->
        span class:'live', -> 'Other Info 3'

    div ->
        span class:'live', -> 'Other Info 4'

div class: 'liveForm section', ->
    div ->
        span class: 'live', -> 'More Info Down Here'
    div ->
        span class: 'live', -> 'Meeeeee toooooo'
