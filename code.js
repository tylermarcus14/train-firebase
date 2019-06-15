// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB2skiZTLY_mUgQ9hk1Qk0_bBqHHhQkDAU",
    authDomain: "train-times-27d45.firebaseapp.com",
    databaseURL: "https://train-times-27d45.firebaseio.com",
    projectId: "train-times-27d45",
    storageBucket: "train-times-27d45.appspot.com",
    messagingSenderId: "541582978591",
    appId: "1:541582978591:web:f84b63894bfb4323"
};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var data = firebase.database();

  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#trainName").val().trim();
    var dest = $("#dest").val().trim();
    var trainTime = moment($("#trainTime").val().trim(), "HH:mm").format("HH:mm");
    var frequency = $("#frequency").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      dest: dest,
      start: trainTime,
      rate: frequency
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.start);
    console.log(newTrain.rate);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#trainName").val("");
    $("#dest").val("");
    $("#trainTime").val("");
    $("#frequency").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var dest = childSnapshot.val().dest;
    var trainTime = childSnapshot.val().start;
    var frequency = childSnapshot.val().rate;
  
    // Employee Info
    console.log(trainName);
    console.log(dest);
    console.log(trainTime);
    console.log(frequency);
  
    // Prettify the employee start
    var trainTimePretty = moment.unix(trainTime).format("MM/DD/YYYY");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var empMonths = moment().diff(moment(trainTime, "X"), "months");
    console.log(empMonths);
  
    // Calculate the total billed rate
    var empBilled = empMonths * frequency;
    console.log(empBilled);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(dest),
      $("<td>").text(trainTimePretty),
      $("<td>").text(frequency),
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
  