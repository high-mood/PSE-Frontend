$('#lineSongs').hide()
$('#barChart').hide()
analyticsDescription("days")

function requestLineCharts(retriggered) {
  var linechartRequest= new XMLHttpRequest()

  var metrics = "acousticness, danceability, duration_ms, energy, instrumentalness, key, liveness, loudness, mode, speechiness, tempo, valence";
  // console.log($('#songs-slider').data('slider'))//.getValue())//('values'));
  song_count = songsSliderObj.slider('getValue');

  // linechartRequest.open('GET', 'https://cors-anywhere.herokuapp.com/http://randomelements.nl/highmood/data/dummysonghistory.json', true)
  // linechartRequest.open('GET', 'http://localhost:5000/api/tracks/metrics/' + userid + '/' + metrics + '/' + song_count, true)
  linechartRequest.open('GET', 'http://localhost:5000/api/tracks/metrics/' + userid + '/' + song_count, true)
  linechartRequest.onload = function() {
    var alldata = JSON.parse(this.response)
    var userdata = alldata.resource

    if (linechartRequest.status >= 200 && linechartRequest.status < 400) {
      // lineGraph
      createLineGraphSongs(userdata,"lineSongs", retriggered);
      // giveText(userdata,"lineGraphText");
    }
    else {
      document.getElementById("userwelcome").innerHTML = "Error retrieving data!"
    }
  }
  linechartRequest.send()


  var linechartDaysRequest = new XMLHttpRequest()

  // var metrics = "acousticness, danceability, duration_ms, energy, instrumentalness, key, liveness, loudness, mode, speechiness, tempo, valence";
  days = daysSliderObj.slider('getValue');
  // console.log(days)
  // linechartDaysRequest.open('GET', 'https://cors-anywhere.herokuapp.com/http://randomelements.nl/highmood/data/api_days_dummy.json', true)
  linechartDaysRequest.open('GET', 'http://localhost:5000/api/user/mood/daily/' + userid + '/' + days, true)
  linechartDaysRequest.onload = function() {
    var alldata = JSON.parse(this.response)
    var userdata = alldata.resource

    if (linechartDaysRequest.status >= 200 && linechartDaysRequest.status < 400) {
      // lineGraph
      createLineGraphDays(userdata,"lineDays", retriggered);
      // giveText(userdata,"lineGraphText");
    }
    else {
      document.getElementById("userwelcome").innerHTML = "Error retrieving data!"
    }
  }
  linechartDaysRequest.send()



  var barchartRequest = new XMLHttpRequest()

  // var metrics = "acousticness, danceability, duration_ms, energy, instrumentalness, key, liveness, loudness, mode, speechiness, tempo, valence";
  // linechartDaysRequest.open('GET', 'https://cors-anywhere.herokuapp.com/http://randomelements.nl/highmood/data/api_days_dummy.json', true)
  var start, end;
  [start, end] = timeframeSliderObj.slider('getValue');
  // var start = 12;
  // var end = 20;

  barchartRequest.open('GET', 'http://localhost:5000/api/user/mood/hourly/' + userid + '/' + start + '/' + end, true)
  barchartRequest.onload = function() {
    var alldata = JSON.parse(this.response)
    var userdata = alldata.resource

    // console.log(alldata)
    console.log(userdata)
    if (barchartRequest.status >= 200 && barchartRequest.status < 400) {
      // lineGraph
      createBarChart("barChart",start,end,userdata["hours"]);
      // giveText(userdata,"lineGraphText");
    }
    else {
      document.getElementById("userwelcome").innerHTML = "Error retrieving data!"
    }
  }
  barchartRequest.send()
}

requestLineCharts(false)

function toggleLineCharts(chartname) {
    if (chartname === 'lineDays') {
      $('#lineChartSelector').text("Days ")
      $('#lineChartSelector').append("<span class=\"caret\"></span>")
      $('#lineDays').show();
      $('#lineSongs').hide();
      $('#barChart').hide();
      $("#timeframe-slider-div").hide()
      $("#days-slider-div").show()
      $("#songs-slider-div").hide()
      $("#linechart-buttons").show()
      analyticsDescription("days")
      showButtonsTimeframe();
    }
    else if (chartname === 'lineSongs') {
      $('#lineChartSelector').text("Songs ")
      $('#lineChartSelector').append("<span class=\"caret\"></span>")
      $('#lineDays').hide();
      $('#lineSongs').show();
      $('#barChart').hide();
      $("#timeframe-slider-div").hide()
      $("#days-slider-div").hide()
      $("#songs-slider-div").show()
      $("#linechart-buttons").show()
      analyticsDescription("songs");
      showButtonsTimeframe();
    }
    else if (chartname === 'barChart') {
      $('#lineChartSelector').text("Hourly ")
      $('#lineChartSelector').append("<span class=\"caret\"></span>")
      $('#lineDays').hide();
      $('#lineSongs').hide();
      $('#barChart').show();
      $("#timeframe-slider-div").show();
      $("#days-slider-div").hide();
      $("#songs-slider-div").hide();
      analyticsDescription("bar");
      hideButtonsTimeframe();
    }
}


function hideButtonsTimeframe() {
  var buttonNames = ["excitedness", "happiness", "acousticness", "danceability", 
  "energy", "instrumentalness", "liveness", "speechiness", 
  "tempo", "valence"];

  for (var i in buttonNames) {
    if (buttonNames[i] == "excitedness" || buttonNames[i] == "happiness") {
      $(`#${buttonNames[i]}`).show()
      $(`#${buttonNames[i]}`).attr("disabled", true)
    }
    else {
      $(`#${buttonNames[i]}`).hide()
    }

  }
  // $('#mood-buttons').show()
  // for (moodButton in $('#mood-buttons').children()) {
  //   moodButton.attr('disable', true)
  // }
}

function showButtonsTimeframe() {
  var buttonNames = ["excitedness", "happiness", "acousticness", "danceability", 
  "energy", "instrumentalness", "liveness", "speechiness", 
  "tempo", "valence"];
  for (var i in buttonNames) {
    if (buttonNames[i] == "excitedness" || buttonNames[i] == "happiness") {
      $(`#${buttonNames[i]}`).show()
      $(`#${buttonNames[i]}`).attr("disabled", false)
    }
    else {
      $(`#${buttonNames[i]}`).show()
    }
  }
}