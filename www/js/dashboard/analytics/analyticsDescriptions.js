function analyticsDescription(chartName) {
    var description = $("#analyticsDescription");

    description.empty();

    if (chartName == "songs") {
        description.html(songText)
    }
    else if (chartName == "days") {
        description.html(daysText)
    }
    else if (chartName == "bar") {
        description.html(barText)
    }
}


var daysText = "Showing average statistics over past days that you have listened to music.<br><br>\
Hover over the datapoints to see the exact values for a given day.<br><br>\
Click the buttons below to show or hide given lines.<br><br>\
Choose how many days you want to have shown with the slider."

var songText = "Showing average statistics over past songs that you have listened to.<br><br>\
Hover over the datapoints to see the exact values for a given song and the song name.<br><br>\
Click the buttons below to show or hide given lines.<br><br>\
Choose how many songs you want to have shown with the slider."

var barText = "Showing average excitedness (blue) and happiness (green) of hours in a day.<br><br>\
The data is collected over your whole music history, from which an average is calculated for every hour you select.<br><br>\
Select the hours you want to see data from with the slider."