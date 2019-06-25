// var userid = document.getElementById("username").textContent;
// console.log(userid);
$('#heatmapRow').hide();
// TODO remove hardcode
var userid = 'snipy12';

var request = new XMLHttpRequest();
var userdata;
var created = 'False';

// request.open('GET', 'https://cors-anywhere.herokuapp.com/http://randomelements.nl/highmood/data/dummydata.json', true)
request.open('GET', 'http://pse-ssh.diallom.com:5000/api/tracks/history/' + userid + '/0', true, {
    headers: {
        'Access-Control-Allow-Origin': 'pse-ssh.diallom.com'
    }
})
request.onload = function() {
    var alldata = JSON.parse(this.response)
    userdata = alldata.resource

    if (request.status >= 200 && request.status < 400) {
        // RadarChart
        createRadarChart(userdata);
        giveText(userdata, "radarText");

        document.getElementsByClassName("radar")[0].onmousemove = hoverRadar;
        document.getElementsByClassName("radar")[0].onmouseout = resetRadarText;
    } else {
        document.getElementById("userwelcome").innerHTML = "Error retrieving data!"
    }
}
request.send()

function toggleMoodCharts(chartname) {
    if (chartname === 'radarChart') {
        $('#radarChartRow').show();
        $('#heatmapRow').hide();
    } else if (chartname === 'heatmap') {
        if ($('heatmap').children().length == 0) {
            // Heatmap
            createHeatmap("heatmap", "A heatmap of the excitedness and happiness of your songs.", -10, 10, 50, "excitedness", -10, 10, 50, "happiness", userdata);
            giveText(userdata, "heatmapText");
        }
        $('#radarChartRow').hide();
        $('#heatmapRow').show();
    }
}
