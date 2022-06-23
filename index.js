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

async function cryptoprices(currency) {
	let res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=Bitcoin%2CEthereum%2CEthereum-Classic%2CRavencoin%2CDogecoin%2C%2CSolana&vs_currencies=USD%2CGBP")
	let parsed = await res.json()
	if (parsed && Object.keys(parsed).length === 0 && parsed.constructor === Object) {
		document.getElementById("apierror").style.display = ("initial");
		document.getElementById("crypto").style.display = ("none");
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
		document.getElementById("etcRate").innerHTML = (sign + addCommas(parsed["ethereum-classic"][currency]) + " " + currency.toUpperCase())
		document.getElementById("dogeRate").innerHTML = (sign + parsed.dogecoin[currency] + " " + currency.toUpperCase())
		document.getElementById("rvnRate").innerHTML = (sign + parsed.ravencoin[currency] + " " + currency.toUpperCase())
		document.getElementById("solRate").innerHTML = (sign + parsed.solana[currency] + " " + currency.toUpperCase())
	}

}

function age(){
	document.getElementById("age").innerHTML = new Date().getFullYear() - 2004;
}