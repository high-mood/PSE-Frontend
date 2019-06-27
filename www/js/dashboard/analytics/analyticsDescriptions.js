function analyticsDescription(chartName) {
    var description = $("#analyticsDescription");

    description.empty();

    if (chartName == "songs") {
        description.html(daysText)
        // description.html(songText)
    }
    else if (chartName == "days") {
        description.html(daysText)
    }
    else if (chartName == "bar") {
        description.html(daysText)
        // description.html(barText)
    }
}


var daysText = "Showing average statistics over past days that you have listened to music.<br><br>\
Hover over the datapoints to see the exact values for a given day.<br><br>\
Click the buttons below to show or hide given lines.<br><br>\
Choose how many days you want to have shown with the slider."