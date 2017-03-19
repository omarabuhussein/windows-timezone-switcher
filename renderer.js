const storage = require('electron-json-storage');

var spawn = require('child_process').spawn;
var shell = require('electron').shell;

var timezonesListSelector = $("#timezones-list");

// Gets current timezone
response = spawn('cmd.exe', ['/c', 'tzutil', '/g']);
// Show current timezone on main window
response.stdout.on('data', function(currentTimezone) {
    document.getElementById("current-timezone").innerHTML = currentTimezone;
});


// Gets user selected timezones and populates the select input values with them
storage.get('selected_timezones', function(error, data) {
    timezonesListSelector.val(data);
    timezonesListSelector.select2();
});

// Saves new selected timezones when the user click on save button
$('#save-timezones').on( 'click', function(){
    var json = [];
    var timezonesList = $('#timezones-list').val();
    storage.set('selected_timezones', timezonesList, function(error) {});
});


// Open links externally by default
$(document).on('click', 'a[href^="http"]', function(event) {
    event.preventDefault();
    shell.openExternal(this.href);
});
