// var userid = document.getElementById("username").textContent;
// console.log(userid);
$('#favRo').hide();
// TODO remove hardcode
var userid = 'snipy12';

var request = new XMLHttpRequest();
var created = 'False';

// request.open('GET', 'https://cors-anywhere.herokuapp.com/http://randomelements.nl/highmood/data/dummydata.json', true)
request.open('GET', 'http://localhost:5000/api/tracks/history/' + userid + '/0', true, {
    headers: {
        'Access-Control-Allow-Origin': 'pse-ssh.diallom.com'
    }
})
request.onload = function() {
    var alldata = JSON.parse(this.response);
    userdata = alldata.resource;
    window.userdata = userdata;
    if (request.status >= 200 && request.status < 400) {
        // Song history
        createHistory(userdata);
    } else {
        document.getElementById("userwelcome").innerHTML = "Error retrieving data!";
    }
}
request.send();

function toggleHistory(chartname) {
    if (chartname === 'history') {
        $('#historySelector').text("History ");
        $('#historySelector').append("<span class=\"caret\"></span>");
        $('#historyRow').show();
        $('#favRow').hide();
    }
    else if (chartname === 'favourites') {
        $('#historySelector').text("Favourites ");
        $('#historySelector').append("<span class=\"caret\"></span>");
        topdata = getTopData();
        if ($('favRow').children().length == 0) {
            // Favourites.
            createTop(topdata); // TODO: get data
        }
        $('#historyRow').hide();
        $('#favRow').show();
    }
}

function getTopData() {
    
}

