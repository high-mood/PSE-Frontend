function toggleMetric(metricName) {
  // var userId = document.getElementById("username").textContent;
  // TODO: remove hardcode
  userId = 'snipy12';

  var request = new XMLHttpRequest
  request.open('GET', 'http://localhost:5000/api/tracks/recommendation/' + userId + '/' + metricName, true)
  request.onload = function() {
    var alldata = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
      var userdata = alldata.resource.recommendations;
      fillRecommendations(userdata);
    } else {
      for(var index = 0; index < 5; index++) {
        div = $('rec' + index);
        div.empty();
        div.append("Error loading the content");
      }
    }
  }
  request.send()
}

function fillRecommendations(userData) {
  for(var index = 0; index < Math.min(5, userData.length); index++) {
    console.log(userData);
    div = $('#rec' + index);
    div.empty();
    trackId = "https://open.spotify.com/embed/track/";
    trackId += userData[index].songid;

    content = '<iframe class="song-template" src="' + trackId + '" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>';
    div.append(content);
  }
}