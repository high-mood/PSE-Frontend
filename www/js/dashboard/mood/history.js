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

var song_history = document.querySelector("#song_history");
var tracklist = document.querySelector("#tracklist");
update_history();


$("#happiness_slider").slider({
    formatter: function(value) {
        return value;
    }
});
