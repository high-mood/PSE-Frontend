// var userid = document.getElementById("username").textContent;
// TODO remove hardcode
var userid = 'snipy12';

happinessSlider.on('change', function(event) {
        $('#happiness_slider_text').html(`Happiness: (${event.value['newValue']}%)`)
    })

excitednessSlider.on('change', function(event) {
    $('#excitedness_slider_text').html(`Excitedness: (${event.value['newValue']}%)`)
})
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

        document.getElementById("headerName").innerHTML = "Full history";

        window.curData = window.histData;
        loadContent();
    } else if (chartname === 'favourites') {
        $('#historySelector').text("Favourite songs");
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
    song_index = clickEvent.target.id;
    songId = window.curData[parseInt(song_index)].songid;
    window.song_index = song_index;
    adjustSlider(song_index);

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
        var songdiv = document.createElement('COLUMN');
        songdiv.classList.add('songdiv');

        var songid = data[index].songid;
        songdiv.id = songid;
        songdiv.width = "100%";
        songdiv.style.backgroundColor = "black";

        var btn = document.createElement("BUTTON");
        btn.innerHTML = "Select";
        btn.style.width = "20%";
        btn.id = index;
        btn.onclick = function(index){ histSelect(index)};
        btn.classList.add('SongRecButton');
        btn.classList.add("btn-default");
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

function adjustSlider(song_index) {
    if (song_index == null) {
        excitednessSlider.slider("setValue", 50);
        happinessSlider.slider("setValue", 50);
        $('#happiness_slider_text').html(`Happiness: (50%)`)
        $('#excitedness_slider_text').html(`Excitedness: (50%)`)
        return;
    }
    /** TODO: add this to Onclicks of songs in tracklist
	Updates the analysis-sliders and percentages and adds songtitle
	to that section.
	:param song_index: Index of the clicked track **/
    var songid = window.curData[song_index].songid;
    var happiness = window.curData[song_index].happiness;
    var excitedness = window.curData[song_index].excitedness;
    var songname = document.getElementById('songdisplayname');
    songname.innerHTML = window.curData[song_index].name;


    var happiness_slider_text =$("#happiness_slider_text");
    var happiness_percentage = (happiness + 10) * 5;
    happiness_slider_text.html(`Happiness: (${Math.trunc(happiness_percentage)}%)`);


    var excitedness_slider_text = $("#excitedness_slider_text");
    var excitedness_percentage = (excitedness + 10) * 5;
    excitedness_slider_text.html(`Excitedness: (${Math.trunc(excitedness_percentage)}%)`);

    excitednessSlider.slider("setValue", Math.trunc(excitedness_percentage));
    happinessSlider.slider("setValue", Math.trunc(happiness_percentage));
};

function sendFeedback() {
    /** TODO: Link this function to actual API call,
	      Add song_index as global variable
	Allows user to send their feedback on songs mood-analysis
	:param song_index: Index of the currently selected track **/
    var userid = "snipy12";
    var happiness = document.getElementById("happiness_slider").value;
    var excitedness = document.getElementById("excitedness_slider").value;
    var uri = "http://localhost:5000/api/songs/mood/" + userid;
    var songid = window.curData[window.song_index].songid;

    var data = {
        "songid": songid,
        "excitedness": excitedness,
        "happiness": happiness
    };
    var request = new XMLHttpRequest();
    request.open("POST", uri, true);
    request.setRequestHeader("Content-Type", 'application/json');
    request.setRequestHeader("Access-Control-Allow-Origin", 'localhost:4000');
    request.send(JSON.stringify(data));
}

function resetFeedback() {
    /** TODO: Add song_index as a global variable
	Resets sliders to analyzed value of currently
	selected track **/
    var current_track = window.song_index;
    adjustSlider(current_track);
};

document.getElementById("happiness_slider").oninput = function() {
    var text = document.getElementById("happiness_slider_text");
    text.textContent = this.value + "%";
};

document.getElementById("excitedness_slider").oninput = function() {
    var text = document.getElementById("excitedness_slider_text");
    text.textContent = this.value + "%";
};

var resetButton = document.getElementById("reset_feedback");
resetButton.addEventListener("click", resetFeedback);

var sendFeedbackBackButton = document.getElementById("send_feedback");
sendFeedbackBackButton.addEventListener("click", sendFeedback);
