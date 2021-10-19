var body = document.getElementById("mcstatus");
const Http = new XMLHttpRequest();
Http.overrideMimeType("application/json");
Http.open("GET", "https://api.minetools.eu/ping/mc.hummusbird.co.uk", false);

Http.onload = function() {
    var jsonResult = JSON.parse(Http.responseText);
    var playersOnline = jsonResult.players.online;
    var online = document.createElement("p").appendChild(document.createTextNode(playersOnline + " Players Online"));
    body.appendChild(online);
}
Http.send(null);