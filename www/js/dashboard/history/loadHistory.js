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
    createScrollWindow();
    for (var index = 0; index < Math.min(5, window.curData.length); index++) {
        div = $('#hist' + index);
        div.empty();
        trackId = "https://open.spotify.com/embed/track/";
        trackId += window.curData[index].songid;

        content = '<iframe class="song-template" src="' + trackId + '" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>';
        div.append(content);
    }
}

function histSelect(song_index) {
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

function createScrollWindow() {
    console.log("hi");
    data = window.curData;
    containerDiv = $('#scroll_window');
    containerDiv.empty();

    // Used to create songSelector item.
    var template1 = '<div class="row"><div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 text-center" onclick="histSelect("';
    var template2 = ')" >Select</div><div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 text-center" id="hist';
    var template3 = '></div></div>'

    console.log(data.length);
    for (var index = 0; index < data; index++) {
        songSelector = template1 + index + template2 + index + template3;
        containerDiv.append(songSelector);
    }
    console.log("bye");
}

function adjustSlider(song_index) {
    /** TODO: add this to Onclicks of songs in tracklist
	Updates the analysis-sliders and percentages and adds songtitle
	to that section.
	:param song_index: Index of the clicked track **/
    var songid = window.curData[parseInt(song_index)].songid;
    var happiness = window.curData[parseInt(song_index)].happiness;
    var excitedness = window.curData[parseInt(song_index)].excitedness;
    var songname = document.getElementById('songdisplayname');
    songname.innerHTML = song.name;

    
    var happiness_slider = document.getElementById("happiness_slider");
    var happiness_slider_text = document.getElementById("happiness_slider_text");
    var happiness_percentage = (happiness + 10) * 5;
    happiness_slider.value = happiness_percentage;
    happiness_slider_text.innerHTML = "Happiness:\n" + Math.trunc(happiness_percentage) + "%";


    var excitedness_slider = document.getElementById("excitedness_slider");
    var excitedness_slider_text = document.getElementById("excitedness_slider_text");
    var excitedness_percentage = (excitedness + 10) * 5;
    excitedness_slider.value = excitedness_percentage;
    excitedness_slider_text.innerHTML = "Excitedness:\n" + Math.trunc(excitedness_percentage) + "%";
};
    
function sendFeedback(song_index) {
    /** TODO: Link this function to actual API call,
	      Add song_index as global variable
	Allows user to send their feedback on songs mood-analysis
	:param song_index: Index of the currently selected track **/
    var userid = "snipy12";
    var happiness = document.getElementById("happiness_slider").value;
    var excitedness = document.getElementById("excitedness_slider").value;
    var uri = "http://localhost:5000/api/songs/mood/" + userid;
    var songid = window.curData[parseInt(song_index)].songid;

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

function resetFeedback(song_index) {
    /** TODO: Add song_index as a global variable
	Resets sliders to analyzed value of currently
	selected track 
	:param song_index: Index of currently selected track **/
    var happiness = window.curData[parseInt(song_index)].happiness;
    var excitedness = window.curData[parseInt(song_index)].excitedness;
    document.getElementById("happiness_slider").value = happiness;
    var text = document.getElementById("happiness_slider_text");
    text.textContent = happiness + "%";

    document.getElementById("excitedness_slider").value = excitedness;
    var text = document.getElementById("excitedness_slider_text");
    text.textContent = excitedness + "%";
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
resetButton.addEventListener("click", resetFeedback(window.song_index);

var sendFeedbackBackButton = document.getElementById("send_feedback");
sendFeedbackBackButton.addEventListener("click", sendFeedback(window.song_index);
