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

function addCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function moreButton() {
	document.getElementById("titlebar").classList.add('shrink');
	document.getElementById("morebutton").style.animationDelay = ("0s")
	document.getElementById("morebutton").style.animationName = ("morebutton_hide")
}

async function serverstatus(id) {
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
}

async function cryptoprices(currency) {
	let res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=Bitcoin%2CEthereum%2CEthereum-Classic%2CRavencoin%2CDogecoin%2C&vs_currencies=USD%2CGBP")
	let parsed = await res.json()
	if (parsed && Object.keys(parsed).length === 0 && parsed.constructor === Object){
		document.getElementById("apierror").style.display = ("initial");
		document.getElementById("crypto").style.display = ("none");
		document.getElementById("marquee").style.display = ("none");
	}
	else{
		var sign = ""

		document.getElementById("apierror").style.display = ("none")
		document.getElementById("crypto").style.display = ("grid");

		if (currency == "gbp"){
			sign = "£" 
			document.getElementById("refreshPrices").setAttribute("onclick", "cryptoprices('gbp'); toastNotif('Refreshed rates!');")
			document.getElementById("switchCurrencies").innerHTML = ("GBP")
			document.getElementById("switchCurrencies").setAttribute("onclick", "cryptoprices('usd')")
		}
		else{
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
	if (parsed && Object.keys(parsed).length === 0 && parsed.constructor === Object){
		document.getElementById("marquee").style.display = ("none");
	}
	else{
		document.getElementById("marqueetext").innerHTML = (parsed.status_updates[0].description.replace(/"/g,"") + "\t" + parsed.status_updates[1].description.replace(/"/g,"") + "\t" + parsed.status_updates[2].description.replace(/"/g,""))
	}

}