// This is where most of the JS & jQuery will live
// for the project that will manipulate our webpage

// On Page Load
$(document).ready(function () {

    controller.captureFormFields();

    modelObject.initialDatabasePull(database);
    setInterval(function () { modelObject.initialDatabasePull() }, 60000);

    view.updateCurrentTime();
    setInterval(function () { view.updateCurrentTime() }, 1000);

});

// view object
var view = {

    // function to update the Train Schedule Table

    updateTrainScheduleTable: () => {

        controller.convertFrequency();

        $('#train-schedule-body').append(
            '<tr>' +
            '<td>' + trainName + '</td>' +
            '<td>' + trainDestination + '</td>' +
            '<td>' + firstTrainTime + '</td>' +
            '<td>' + trainFrequency + '</td>' +
            '</tr>'
        );
    },

    updateCurrentTime: () => {
        $('.currentTime').text(moment().format('h:mm:ss A'))
    }
};