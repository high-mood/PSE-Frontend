function update_history() {
    var lastDiv = document.querySelector("#song_history > div:last-child");
    var lastDivOffset = lastDiv.offsetTop + lastDiv.clientHeight;
    var pageOffset = window.pageYOffset + window.innerHeight;
    var i;
    for (i = 0; i < 10; i++) {
        var newDiv = document.createElement("div");
        newDiv.innerHTML = "Add new song";
        document.getElementById("song_history").appendChild(newDiv);
    }
}

// TODO  set to actual song feedbacl
function resetFeedback(event) {
    var value = 50;

    document.getElementById("happiness_slider").value = value;
    var text = document.getElementById("happiness_slider_text");
    text.textContent = "Happiness: " + value + "%";

    document.getElementById("excitedness_slider").value = value;
    var text = document.getElementById("excitedness_slider_text");
    text.textContent = "Excitedness: " + value + "%";
}

var song_history = document.querySelector("#song_history");
var tracklist = document.querySelector("#tracklist");
update_history();

document.getElementById("happiness_slider").oninput = function () {
    var text = document.getElementById("happiness_slider_text");
    text.textContent = "Happiness: " + this.value + "%";
};

document.getElementById("excitedness_slider").oninput = function () {
    var text = document.getElementById("excitedness_slider_text");
    text.textContent = "Excitedness: " + this.value + "%";
};


var resetButton = document.getElementById("reset_feedack");
resetButton.addEventListener("click", resetFeedback)
