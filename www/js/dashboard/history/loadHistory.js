// var userid = document.getElementById("username").textContent;
// TODO remove hardcode
var userid = 'snipy12';

// Show history data when websites is opened.
var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:5000/api/tracks/history/' + userid + '/20', true);
// request.open('GET', 'http://localhost:5000/api/tracks/history/' + userid + '/50', true);

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

    topRequest.open('GET', 'http://localhost:5000/api/tracks/topsongs/' + userid + '/10', true);
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
    createScrollWindow();
    for (var index = 0; index < curData.length; index++) {
        div = $('#hist' + index);
        div.empty();
        trackId = "https://open.spotify.com/embed/track/";
        trackId += window.curData[index].songid;

        content = '<iframe class="song-template" src="' + trackId + '" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>';
        div.append(content);
    }
}

function histSelect(clickEvent) {
    song_index = clickEvent.path[0].id;
    songId = window.curData[parseInt(song_index)].songid;
    
    var recRequest = new XMLHttpRequest();
    recRequest.open('GET', 'http://localhost:5000/api/tracks/recommendation/' + userid + '/' + songId + '/0.0/0.0', true);
    recRequest.onload = function() {
        var data = JSON.parse(this.response);
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


function createScrollWindow() {
    data = window.curData;
    containerDiv = document.getElementById('scroll_window');
    containerDiv.innerHTML = '';

    for (var index = 0; index < data.length; index++) {
        var songdiv = document.createElement('div');
        songdiv.classList.add('songdiv');
            
        var songid = data[index].songid;
        songdiv.id = songid;
        songdiv.style.backgroundColor = "black";

        var btn = document.createElement("BUTTON");
        btn.innerHTML = "Select";
        btn.style.width = "20%";
        btn.id = index;
        btn.onclick = function(index){ histSelect(index);};
        btn.classList.add('SongRecButton');
        songdiv.appendChild(btn);

        var ifrm = document.createElement("iframe");
        ifrm.setAttribute("src", "https://open.spotify.com/embed/track/" + data[index].songid);
        ifrm.setAttribute("align","right");
        ifrm.style.width = "80%";
        ifrm.style.height = "80px";

        songdiv.appendChild(ifrm);
        containerDiv.appendChild(songdiv);
        }
}
