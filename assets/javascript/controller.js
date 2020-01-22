// This JS connects the view with model

// controller object
let controller = {

    // capture form fields
    captureFormFields: () => {
        $('body').on("click", ".button-add", () => {
            // prevents form submission
            event.preventDefault();

            // values for form field variables
            trainName = $('#train-name').val().trim();
            trainDestination = $('#train-destination').val().trim();
            firstTrainTime = $('#first-train-time').val().trim();
            trainFrequency = $('#train-frequency').val().trim();

            // console log all the entries for testing
            // console.log(trainName)
            // console.log(trainDestination)
            // console.log(firstTrainTime)
            // console.log(trainFrequency)
            controller.nextArrival();
            controller.minutesAway();

            // clear all the fields in the form
            $('.form-control').val("");

            modelObject.pushNewTrain();
            // view.updateTrainScheduleTable();

        });
    },

    // Time functions

    nextArrival: () => {

        // get currentTime
        let currentTime = moment();

    },

    minutesAway: () => {

        // get currentTime
        let currentTime = moment();

    },

    //Train frequency
    convertFrequency: () => {
        trainFrequency = moment().startOf('day').add(trainFrequency, 'minutes').format('HH:mm');
    }

};