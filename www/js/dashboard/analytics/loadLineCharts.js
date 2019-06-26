$('#lineSongs').hide()

var linechartRequest= new XMLHttpRequest()

var metrics = "acousticness, danceability, duration_ms, energy, instrumentalness, key, liveness, loudness, mode, speechiness, tempo, valence";
song_count = 50;
// linechartRequest.open('GET', 'https://cors-anywhere.herokuapp.com/http://randomelements.nl/highmood/data/dummysonghistory.json', true)
// linechartRequest.open('GET', 'http://localhost:5000/api/tracks/metrics/' + userid + '/' + metrics + '/' + song_count, true)
linechartRequest.open('GET', 'http://localhost:5000/api/tracks/metrics/' + userid + '/' + song_count, true)
linechartRequest.onload = function() {
  var alldata = JSON.parse(this.response)
  var userdata = alldata.resource
  // console.log(userdata)

  if (linechartRequest.status >= 200 && linechartRequest.status < 400) {
    // lineGraph
    createLineGraphSongs(userdata,"lineSongs");
    // giveText(userdata,"lineGraphText");
  }
  else {
    document.getElementById("userwelcome").innerHTML = "Error retrieving data!"
  }
}
linechartRequest.send()


var linechartDaysRequest = new XMLHttpRequest()

// var metrics = "acousticness, danceability, duration_ms, energy, instrumentalness, key, liveness, loudness, mode, speechiness, tempo, valence";
days = 500;
// linechartDaysRequest.open('GET', 'https://cors-anywhere.herokuapp.com/http://randomelements.nl/highmood/data/api_days_dummy.json', true)
linechartDaysRequest.open('GET', 'http://localhost:5000/api/user/mood/hourly/' + userid + '/' + days, true)
linechartDaysRequest.onload = function() {
  var alldata = JSON.parse(this.response)
  var userdata = alldata.resource
  // console.log(userdata)

  if (linechartDaysRequest.status >= 200 && linechartDaysRequest.status < 400) {
    // lineGraph
    createLineGraphDays(userdata,"lineDays");
    // giveText(userdata,"lineGraphText");
  }
  else {
    document.getElementById("userwelcome").innerHTML = "Error retrieving data!"
  }
}
linechartDaysRequest.send()

function toggleLineCharts(chartname) {
    if (chartname === 'lineDays') {
      $('#lineChartSelector').text("Line Days chart ")
      $('#lineChartSelector').append("<span class=\"caret\"></span>")
        $('#lineDays').show();
        $('#lineSongs').hide();
    }
    else if (chartname === 'lineSongs') {
      $('#lineChartSelector').text("Line Songs chart ")
      $('#lineChartSelector').append("<span class=\"caret\"></span>")
        $('#lineDays').hide();
        $('#lineSongs').show();
    }
}