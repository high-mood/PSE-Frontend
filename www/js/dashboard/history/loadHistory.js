// var userid = document.getElementById("username").textContent;
// console.log(userid);
$('#favCol').hide();
// TODO remove hardcode
var userid = 'snipy12';

var request = new XMLHttpRequest();

request.open('GET', 'http://localhost:5000/api/tracks/history/' + userid + '/0', true)
request.onload = function() {
    var allData = JSON.parse(this.response);
    userData = allData.resource.songs;
    window.userData = userData;
    console.log(request.status, "request status!")
    if (request.status >= 200 && request.status < 400) {
        // Song history.
        createHistory(userData);
    }
}
request.send();

function toggleHistory(chartname) {
    if (chartname === 'history') {
        $('#historySelector').text("History ");
        $('#historySelector').append("<span class=\"caret\"></span>");
        $('#histCol').show();
        $('#favCol').hide();
    }
    else if (chartname === 'favourites') {
        $('#historySelector').text("Favourites ");
        $('#historySelector').append("<span class=\"caret\"></span>");
        topdata = getTopData();
        if ($('favRow').children().length == 0) {
            // Favourites.
            createTop(topdata);
        }
        $('#histCol').hide();
        $('#favCol').show();
    }
}

function getTopData() {
    var topRequest = new XMLHttpRequest();

    topRequest.open('GET', 'http://localhost:5000/api/tracks/topsongs/' + userid + '/5', true);
    topRequest.onload = function() {
        var allTopData = JSON.parse(this.response);
        userTopData = allTopData.resource.songs;
        window.userTopData = userTopData;
        console.log(userTopData);
        if (topRequest.status >= 200 && topRequest.status < 400) {
            return userTopData;
        } else {
            document.getElementById("userwelcome").innerHTML = "Error retrieving data!";
        }
    }
    topRequest.send();
}

function createHistory(userData) {
  for (var index = 0; index < Math.min(5, userData.length); index++) {
    div = $('#hist' + index);
    div.empty();
    trackId = "https://open.spotify.com/embed/track/";
    trackId += userData[index].songid;

    content = '<iframe class="song-template" src="' + trackId + '" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>';
    div.append(content);
    }
}

function createTop(topData) {
}

// TODO: test
function select(song_index) {
    songId = window.userData[parseInt(song_index)].songid   ;
    
    var requestRec = new XMLHttpRequest();
    requestRec.open('GET', 'http://localhost:5000/api/tracks/recommendation/' + userid + '/' + songId + '/0.0/0.0', true);
    requestRec.onload = function() {
        var data = JSON.parse(this.response);
        console.log(data)
        var recommendations = data.resource.recommendations;
        for (var index = 0; index < 5; index++) {
            div = $('#recHist' + index);
            div.empty();
            if (requestRec.status == 200) {
                trackId = "https://open.spotify.com/embed/track/";
                trackId += recommendations[index].songid;
            
                content = '<iframe class="song-template" src="' + trackId + '" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>';
                div.append(content);
            } else {
                div.append("Error loading the content");
            }
        }
    }
    requestRec.send();
}
