h1 @title

div id:'inspectionContainer', class: 'liveForm'

script id:'inspection-view-template', type:'text/x-handlebars-template', ->
    div class: 'generalInformation, liveForm', ->
        h1 'General Information'
        text '{{#generalInformation}}'
        table ->
            tr ->
                td 'Location:'
                td '{{location}}'

            tr ->
                td ''
                td '{{addressLine1}}'
            tr ->
                td ''
                td '{{addressLine2}}'
            tr ->
                td ''
                td ->
                    table ->
                        tr ->
                            td -> '{{city}}'
                            td -> '{{state}}'
                            td -> '{{zip}}'
        text '{{/generalInformation}}'
    div class: 'contactInformation liveForm', ->
        h1 'Contact Information'
        text '{{#contactInformation}}'
        table ->
            tr ->
                td 'Name:'
                td ->
                    table ->
                        tr ->
                            td -> '{{firstName}}'
                            td -> '{{lastName}}'

            tr ->
                td 'Email:'
                td -> '{{email}}'
            tr ->
                td 'Phone:'
                td -> '{{phone}}'
            tr ->
                td 'Lease'
                td -> '{{lease}}'
        text '{{/contactInformation}}'
    div class: 'sections', ->
        ul ->
            text '{{#sections}}'
            text '  {{> sectionTemplate}}'
            text '{{/sections}}'

script id:'inspection-section-template', type: 'text/x-handlebars-template', ->
    li class: 'section', ->
        h2 '{{title}}'
        hr()
        table ->
            thead ->
                tr ->
                    th width: 200, ''
                    th 'Status'
            tbody ->
                text '{{#items}}'
                text '  {{> itemTemplate}}'
                text '{{/items}}'

script id:'inspection-item-template', type: 'text/x-handlebars-template', ->
    tr ->
        td class: 'sectionItem', -> '{{title}}'
        td -> span class: 'live', '{{status}}'
