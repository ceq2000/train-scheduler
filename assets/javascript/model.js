// All data and global variables live here

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyALCo7RhZybW9cWwgEWEkdr19jOq9R2OGs",
    authDomain: "train-scheduler-f365b-f6245.firebaseapp.com",
    databaseURL: "https://train-scheduler-f365b-f6245.firebaseio.com",
    projectId: "train-scheduler-f365b-f6245",
    storageBucket: "train-scheduler-f365b-f6245.appspot.com",
    messagingSenderId: "440660180208",
    appId: "1:440660180208:web:60b5f9ea206732d9c3d635"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

console.log(database);



// Form Variables to be passed between objects

let trainName;
let trainDestination;
let firstTrainTime;
let trainFrequency;
let currentTime = moment();
console.log('CURRENT TIME: ' + moment(currentTime).format('hh:mm:ss A'));

// model object functions for pulling/pushing new data to the database

var modelObject = {

    pushNewTrain: () => {

        database.ref().push({

            trainName: trainName,
            trainDestination: trainDestination,
            firstTrainTime: firstTrainTime,
            trainFrequency: trainFrequency,
            fbDateAdded: firebase.database.ServerValue.TIMESTAMP

        });

        modelObject.pullChild();

    },

    pullChild: () => {

        var filter = database.ref().orderByChild("fbDateAdded").limitToLast(1)

        filter.once("child_added", function (childSnapshot) {

            trainName = childSnapshot.val().trainName
            trainDestination = childSnapshot.val().trainDestination
            firstTrainTime = childSnapshot.val().firstTrainTime
            trainFrequency = childSnapshot.val().trainFrequency

            //console.log(trainName, trainDestination, firstTrainTime, trainFrequency)

            view.updateTrainScheduleTable();
        });

    },

    initialDatabasePull: () => {

        database.ref().on("value", function (snapshot) {
            var allTrains = snapshot.val();

            //console.log(trainParameters)
            console.log(trainName)
            console.log(trainDestination)
            console.log(firstTrainTime)
            console.log(trainFrequency)

            $('#train-schedule-body').empty();

            for (var index in allTrains) {
                trainName = allTrains[index].trainName
                trainDestination = allTrains[index].trainDestination
                firstTrainTime = allTrains[index].firstTrainTime
                trainFrequency = allTrains[index].trainFrequency

                //console.log(trainName, trainDestination, firstTrainTime, trainFrequency)
                controller.nextArrival();
                controller.minutesAway();
                view.updateTrainScheduleTable();
            };

        }, function (errorObject) {
            console.log("Errors handled: " + errorObject.code);

        });
    }

}
modelObject.initialDatabasePull(database);