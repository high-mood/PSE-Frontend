// var userid = document.getElementById("username").textContent;
// TODO remove hardcode
var userid = 'snipy12';

// Show history data when websites is opened.
var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:5000/api/tracks/history/' + userid + '/0', true);

request.onload = function() {
    var allData = JSON.parse(this.response);
    userData = allData.resource.songs;
    window.histData = userData;
    window.curData = window.histData;
    
    if (request.status == 200) {
        loadContent();
    }
}
request.send();

// Onclick handles for toggle.
function toggleHistory(chartname) {
    if (chartname === 'history') {
        $('#historySelector').text("History ");
        $('#historySelector').append("<span class=\"caret\"></span>");
        window.curData = window.histData;
        loadContent();
    } else if (chartname === 'favourites') {
        $('#historySelector').text("Favourites ");
        $('#historySelector').append("<span class=\"caret\"></span>"); // TODO ask Arthus what this does
        getTopData(); // if not top data?
    }
}

function getTopData() {
    var topRequest = new XMLHttpRequest();

    topRequest.open('GET', 'http://localhost:5000/api/tracks/topsongs/' + userid + '/5', true);
    topRequest.onload = function() {
        var allTopData = JSON.parse(this.response);
        userTopData = allTopData.resource.songs;
        window.userTopData = userTopData;
        
        if (topRequest.status == 200) {
            window.topData = userTopData;

            window.curData = window.topData;
            loadContent();
        } else {
            document.getElementById("userwelcome").innerHTML = "Error retrieving data!";
        }
    }
    topRequest.send();
}

function loadContent() {
  for (var index = 0; index < Math.min(5, window.curData.length); index++) {
    div = $('#hist' + index);
    div.empty();
    trackId = "https://open.spotify.com/embed/track/";
    trackId += window.curData[index].songid;

    content = '<iframe class="song-template" src="' + trackId + '" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>';
    div.append(content);
    }
}

function select(song_index) {
    console.log("logging topData");
    console.log(window.topData);
    console.log("logging curData");
    console.log(window.curData);
    songId = window.curData[parseInt(song_index)].songid;
    
    var recRequest = new XMLHttpRequest();
    recRequest.open('GET', 'http://localhost:5000/api/tracks/recommendation/' + userid + '/' + songId + '/0.0/0.0', true);
    recRequest.onload = function() {
        var data = JSON.parse(this.response);
        console.log(data)
        var recommendations = data.resource.recommendations;
        for (var index = 0; index < 5; index++) {
            div = $('#recHist' + index);
            div.empty();
            if (recRequest.status == 200) {
                trackId = "https://open.spotify.com/embed/track/";
                trackId += recommendations[index].songid;
            
                content = '<iframe class="song-template" src="' + trackId + '" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>';
                div.append(content);
            } else {
                div.append("Error loading the content");
            }
        }
    }
    recRequest.send();
}
