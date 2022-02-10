window.onbeforeunload = function () {
	window.scrollTo(0, 0);
}

function copyToClipboard(text) {

	navigator.clipboard.writeText(text);

	toastNotif("Copied to clipboard!")
}

function toastNotif(text) {
	// Get the toast DIV
	var x = document.getElementById("toast");
	document.getElementById("toast").innerHTML = (text);

	// Add the "show" class to DIV
	x.className = "show";

	// After 3 seconds, remove the show class from DIV
	setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

function randvid() {
	var num = Math.floor(Math.random() * 3)
	source = document.getElementById("1975src")
	video = document.getElementById("1975vid")

	if (num == 0) {
		source.src = "mp4/frailstateofmind.mp4"
	}
	else if (num == 1) {
		source.src = "mp4/giveyourselfatry.mp4"
	}
	else {
		source.src = "mp4/somebodyelse.mp4"
	}

	video.load();
	video.play();
}

function addCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function mutebg() {
	video = document.getElementById("1975vid")
	muteicon = document.getElementById("muteicon")
	fullicon = document.getElementById("fullicon")
	if (video.muted) {
		video.muted = false;
		muteicon.style.display = "none"
		fullicon.style.display = "initial"
	} else {
		video.muted = true;
		muteicon.style.display = "initial"
		fullicon.style.display = "none"
	}
}

function pausebg() {
	video = document.getElementById("1975vid")
	btn = document.getElementById("pause")
	playicon = document.getElementById("playicon")
	pauseicon = document.getElementById("pauseicon")
	if (video.paused) {
		video.play();
		playicon.style.display = "none"
		pauseicon.style.display = "initial"
	} else {
		video.pause();
		playicon.style.display = "initial"
		pauseicon.style.display = "none"
	}
}

function moreButton() {
	document.getElementById("titlebar").classList.add('shrink');
	document.getElementById("morebutton").style.animationDelay = ("0s")
	document.getElementById("morebutton").style.animationName = ("title_fadeout")

	document.body.style.overflow = "auto"
}

async function serverstatus(id) {
	let NSres = await fetch("https://northstar.tf/client/servers")
	let NSparsed = await NSres.json()

	let res = await fetch("https://www.hummusbird.co.uk/getServer/" + id + ".txt")
	let parsed = await res.json()

	if (parsed && Object.keys(parsed).length === 0 && parsed.constructor === Object) {
		console.log(id + " is offline")
	}
	else {
		document.getElementById(id + "name").innerHTML = (parsed.Name)
		document.getElementById(id + "map").innerHTML = (parsed.Map)
		document.getElementById(id + "players").innerHTML = (parsed.Players + "/" + parsed.MaxPlayers + " Players")
	}

	if (NSparsed && Object.keys(NSparsed).length === 0 && NSparsed.constructor === Object) {
		console.log(id + " is offline")
	}
	else {
		var birbservers = 0
		var connected = 0
		var slots = 0
		var allservers = 0
		var allslots = 0
		var allconnected = 0

		for (var i = 0; i < NSparsed.length; i++) {
			allservers++
			allslots += NSparsed[i]["maxPlayers"]
			allconnected += NSparsed[i]["playerCount"]
			if (NSparsed[i]["name"].includes("birb")) {
				birbservers++
				slots += NSparsed[i]["maxPlayers"]
				connected += NSparsed[i]["playerCount"]
			}
		}
		document.getElementById("nsname").innerHTML = (birbservers + " birb servers online")
		document.getElementById("nsplayers").innerHTML = (connected + "/" + slots)
		document.getElementById("nsmap").innerHTML = (allconnected + "/" + allslots)
	}
}

async function cryptoprices(currency) {
	let res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=Bitcoin%2CEthereum%2CEthereum-Classic%2CRavencoin%2CDogecoin%2C&vs_currencies=USD%2CGBP")
	let parsed = await res.json()
	if (parsed && Object.keys(parsed).length === 0 && parsed.constructor === Object) {
		document.getElementById("apierror").style.display = ("initial");
		document.getElementById("crypto").style.display = ("none");
		document.getElementById("marquee").style.display = ("none");
	}
	else {
		var sign = ""

		document.getElementById("apierror").style.display = ("none")
		document.getElementById("crypto").style.display = ("grid");

		if (currency == "gbp") {
			sign = "£"
			document.getElementById("refreshPrices").setAttribute("onclick", "cryptoprices('gbp'); toastNotif('Refreshed rates!');")
			document.getElementById("switchCurrencies").innerHTML = ("GBP")
			document.getElementById("switchCurrencies").setAttribute("onclick", "cryptoprices('usd')")
		}
		else {
			sign = "$"
			document.getElementById("refreshPrices").setAttribute("onclick", "cryptoprices('usd'); toastNotif('Refreshed rates!');")
			document.getElementById("switchCurrencies").innerHTML = ("USD")
			document.getElementById("switchCurrencies").setAttribute("onclick", "cryptoprices('gbp')")
		}

		document.getElementById("btcRate").innerHTML = (sign + addCommas(parsed.bitcoin[currency]) + " " + currency.toUpperCase())
		document.getElementById("ethRate").innerHTML = (sign + addCommas(parsed.ethereum[currency]) + " " + currency.toUpperCase())
		document.getElementById("dogeRate").innerHTML = (sign + parsed.dogecoin[currency] + " " + currency.toUpperCase())
		document.getElementById("rvnRate").innerHTML = (sign + parsed.ravencoin[currency] + " " + currency.toUpperCase())
	}

}

async function cryptomarquee() {
	let res = await fetch("https://api.coingecko.com/api/v3/status_updates")
	let parsed = await res.json()
	if (parsed && Object.keys(parsed).length === 0 && parsed.constructor === Object) {
		document.getElementById("marquee").style.display = ("none");
	}
	else {
		document.getElementById("marqueetext").innerHTML = (parsed.status_updates[0].description.replace(/"/g, "") + "\t" + parsed.status_updates[1].description.replace(/"/g, "") + "\t" + parsed.status_updates[2].description.replace(/"/g, ""))
	}

}