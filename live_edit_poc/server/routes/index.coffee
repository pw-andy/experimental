 @include = ->
 	@get '/': -> 
        @render index: {title: 'Live Edit Proof of Concept'}

    @get '/init': ->
        inspection = 
                id: 1
                generalInformation:
                        location: 'Building 1'
                        addressLine1: '123 Test Street'
                        addressLine2: 'Suite 1'
                        city: 'Mason'
                        state: 'OH'
                        zip: '45040'
                contactInformation:
                        firstName: 'John'
                        lastName: 'Doe'
                        email: 'john.doe@gmail.com'
                        phone: '(513) 123-4567'
                        lease: 'Doe, J.'
                sections: [
                        {
                                title: 'Exterior'
                                items: [
                                        {
                                                title: 'Driveway',
                                                status: 'Satisfactory'
                                        },
                                        {
                                                title: 'Siding',
                                                status: 'Defective'
                                        }
                                ]
                        },
                        {      
                                title: 'Interior' 
                                items: [
                                        {
                                                title: 'Bathroom',
                                                status: 'Satisfactory'
                                        },
                                        {
                                                title: 'Kitchen',
                                                status: 'Needs Repair'
                                        }
                                ]
                        }
                ]

        responseData =
                inspection: inspection
        @response.json(responseData);