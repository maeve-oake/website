var ethTotalRewardStringID = document.getElementById("ethTotalReward");
var ethWorkerStringID = document.getElementById("ethWorkerStatus");
var ethDayRewardStringID = document.getElementById("ethDayReward");
var ethUnpaidStringID = document.getElementById("ethUnpaid")
var ethHashrateStringID = document.getElementById("ethHashrate")
var ethLuckStringID = document.getElementById("ethLuck")

var etcTotalRewardStringID = document.getElementById("etcTotalReward");
var etcWorkerStringID = document.getElementById("etcWorkerStatus");
var etcDayRewardStringID = document.getElementById("etcDayReward");
var etcUnpaidStringID = document.getElementById("etcUnpaid")
var etcHashrateStringID = document.getElementById("etcHashrate")
var etcLuckStringID = document.getElementById("etcLuck")

var rvnTotalRewardStringID = document.getElementById("rvnTotalReward");
var rvnWorkerStringID = document.getElementById("rvnWorkerStatus");
var rvnDayRewardStringID = document.getElementById("rvnDayReward");
var rvnUnpaidStringID = document.getElementById("rvnUnpaid")
var rvnHashrateStringID = document.getElementById("rvnHashrate")
var rvnLuckStringID = document.getElementById("rvnLuck")

var ethTotalRewardDollarStringID = document.getElementById("ethTotalRewardDollar")
var ethUnpaidDollarStringID = document.getElementById("ethUnpaidDollar")

var etcTotalRewardDollarStringID = document.getElementById("etcTotalRewardDollar")
var etcUnpaidDollarStringID = document.getElementById("etcUnpaidDollar")

var rvnTotalRewardDollarStringID = document.getElementById("rvnTotalRewardDollar")
var rvnUnpaidDollarStringID = document.getElementById("rvnUnpaidDollar")

var ethToDollarStringID = document.getElementById("ethToDollar")
var ethToDollarRate = ""
var ethToPoundStringID = document.getElementById("ethToPound")
var ethToPoundRate = ""

var btcToDollarStringID = document.getElementById("btcToDollar")
var btcToDollarRate = ""
var btcToPoundStringID = document.getElementById("btcToPound")
var btcToPoundRate = ""

var etcToDollarStringID = document.getElementById("etcToDollar")
var etcToDollarRate = ""
var etcToPoundStringID = document.getElementById("etcToPound")
var etcToPoundRate = ""

var rvnToDollarStringID = document.getElementById("rvnToDollar")
var rvnToDollarRate = ""
var rvnToPoundStringID = document.getElementById("rvnToPound")
var rvnToPoundRate = ""

var dogeToDollarStringID = document.getElementById("dogeToDollar")
var dogeToDollarRate = ""
var dogeToPoundStringID = document.getElementById("dogeToPound")
var dogeToPoundRate = ""







const exchangeapi = new XMLHttpRequest();
exchangeapi.overrideMimeType("application/json");
exchangeapi.open("GET", "https://api.coingecko.com/api/v3/simple/price?ids=Bitcoin%2CEthereum%2CEthereum-Classic%2CRavencoin%2CDogecoin%2C&vs_currencies=USD%2CGBP", false);

exchangeapi.onload = function () {
    var exchangejsonResult = JSON.parse(exchangeapi.responseText);

    ethToDollarRate = exchangejsonResult.ethereum.usd;
    ethToDollarStringID.innerHTML = ("1Ξ = $" + ethToDollarRate);

    ethToPoundRate = exchangejsonResult.ethereum.gbp;
    ethToPoundStringID.innerHTML = ("1Ξ = £" + ethToPoundRate);

    etcToDollarRate = exchangejsonResult["ethereum-classic"]["usd"];
    etcToDollarStringID.innerHTML = ("1⟠ = $" + etcToDollarRate);

    etcToPoundRate = exchangejsonResult["ethereum-classic"]["gbp"];
    etcToPoundStringID.innerHTML = ("1⟠ = £" + etcToPoundRate);

    btcToDollarRate = exchangejsonResult.bitcoin.usd;
    btcToDollarStringID.innerHTML = ("1₿ = $" + btcToDollarRate);

    btcToPoundRate = exchangejsonResult.bitcoin.gbp;
    btcToPoundStringID.innerHTML = ("1₿ = £" + btcToPoundRate);

    dogeToDollarRate = exchangejsonResult.dogecoin.usd;
    dogeToDollarStringID.innerHTML = ("1D = $" + dogeToDollarRate);

    dogeToPoundRate = exchangejsonResult.dogecoin.gbp;
    dogeToPoundStringID.innerHTML = ("1D = £" + dogeToPoundRate);

    rvnToDollarRate = exchangejsonResult.ravencoin.usd;
    rvnToDollarStringID.innerHTML = ("1RVN = $" + rvnToDollarRate);

    rvnToPoundRate = exchangejsonResult.ravencoin.gbp;
    rvnToPoundStringID.innerHTML = ("1RVN = £" + rvnToPoundRate);

    setTimeout(exchangeapi.onload, 30000);
}
exchangeapi.send(null);



const ethapi = new XMLHttpRequest();
ethapi.overrideMimeType("application/json");
ethapi.open("GET", "https://eth.2miners.com/api/accounts/0x946ae9177657875afb6cd7ff6f2423f50c08075d", false);


ethapi.onload = function () {
    var jsonResult = JSON.parse(ethapi.responseText);
    var ethTotalRewardString = document.createElement("p").appendChild(document.createTextNode(Math.round(jsonResult.stats.paid / 10000) / 100000 + "Ξ"));
    ethTotalRewardStringID.appendChild(ethTotalRewardString);

    var ethDayRewardString = document.createElement("p").appendChild(document.createTextNode(Math.round(jsonResult.sumrewards[2].reward / 10000) / 100000 + "Ξ"));
    ethDayRewardStringID.appendChild(ethDayRewardString);

    var ethUnpaidString = document.createElement("p").appendChild(document.createTextNode(Math.round(jsonResult.stats.balance / 10000) / 100000 + "Ξ"));
    ethUnpaidStringID.appendChild(ethUnpaidString);

    var ethWorkerString = document.createElement("p").appendChild(document.createTextNode(jsonResult.workersOnline));
    ethWorkerStringID.appendChild(ethWorkerString);

    var ethLuckString = document.createElement("p").appendChild(document.createTextNode(Math.round(jsonResult.currentLuck * 100) + "%"));
    ethLuckStringID.appendChild(ethLuckString);

    var ethHashrateString = document.createElement("p").appendChild(document.createTextNode(Math.round(jsonResult.hashrate / 10000) / 100 + "MH/s"));
    ethHashrateStringID.appendChild(ethHashrateString);



    var ethTotalRewardDollarString = document.createElement("p").appendChild(document.createTextNode(("$" + Math.round(jsonResult.stats.paid / 10000000 * ethToDollarRate) / 100)));
    ethTotalRewardDollarStringID.appendChild(ethTotalRewardDollarString);

    var ethUnpaidDollarString = document.createElement("p").appendChild(document.createTextNode(("$" + Math.round(jsonResult.stats.balance / 10000000 * ethToDollarRate) / 100)));
    ethUnpaidDollarStringID.appendChild(ethUnpaidDollarString);

    /* setTimeout(ethapi.onload, 5000); */
}
ethapi.send(null);

const etcapi = new XMLHttpRequest();
etcapi.overrideMimeType("application/json");
etcapi.open("GET", "https://etc.2miners.com/api/accounts/0x599761676506E9a3BC1b9623C57f004a665a73D6", false);


etcapi.onload = function () {
    var jsonResult = JSON.parse(etcapi.responseText);

    var etcTotalRewardString = document.createElement("p").appendChild(document.createTextNode(Math.round(jsonResult.stats.paid / 10000) / 100000 + "⟠"));
    etcTotalRewardStringID.appendChild(etcTotalRewardString);

    var etcDayRewardString = document.createElement("p").appendChild(document.createTextNode(Math.round(jsonResult.sumrewards[2].reward / 10000) / 100000 + "⟠"));
    etcDayRewardStringID.appendChild(etcDayRewardString);

    var etcUnpaidString = document.createElement("p").appendChild(document.createTextNode(Math.round(jsonResult.stats.balance / 10000) / 100000 + "⟠"));
    etcUnpaidStringID.appendChild(etcUnpaidString);

    var etcWorkerString = document.createElement("p").appendChild(document.createTextNode(jsonResult.workersOnline));
    etcWorkerStringID.appendChild(etcWorkerString);

    var etcLuckString = document.createElement("p").appendChild(document.createTextNode(Math.round(jsonResult.currentLuck * 100) + "%"));
    etcLuckStringID.appendChild(etcLuckString);

    var etcHashrateString = document.createElement("p").appendChild(document.createTextNode(Math.round(jsonResult.hashrate / 10000) / 100 + "MH/s"));
    etcHashrateStringID.appendChild(etcHashrateString);



    var etcTotalRewardDollarString = document.createElement("p").appendChild(document.createTextNode(("$" + Math.round(jsonResult.stats.paid / 10000000 * etcToDollarRate) / 100)));
    etcTotalRewardDollarStringID.appendChild(etcTotalRewardDollarString);

    var etcUnpaidDollarString = document.createElement("p").appendChild(document.createTextNode(("$" + Math.round(jsonResult.stats.balance / 10000000 * etcToDollarRate) / 100)));
    etcUnpaidDollarStringID.appendChild(etcUnpaidDollarString);

    /* setTimeout(etcapi.onload, 5000); */

}
etcapi.send(null);

const rvnapi = new XMLHttpRequest();
rvnapi.overrideMimeType("application/json");
rvnapi.open("GET", "https://rvn.2miners.com/api/accounts/RUMBVuCnBdRCdqUKoDu5HfxMYr5DMUEnvv", false);


rvnapi.onload = function () {
    var jsonResult = JSON.parse(rvnapi.responseText);

    var rvnTotalRewardString = document.createElement("p").appendChild(document.createTextNode(Math.round(jsonResult.stats.paid / 10000) / 10000 + "RVN"));
    rvnTotalRewardStringID.appendChild(rvnTotalRewardString);

    var rvnDayRewardString = document.createElement("p").appendChild(document.createTextNode(Math.round(jsonResult.sumrewards[2].reward / 10000) / 10000 + "RVN"));
    rvnDayRewardStringID.appendChild(rvnDayRewardString);

    var rvnUnpaidString = document.createElement("p").appendChild(document.createTextNode(Math.round(jsonResult.stats.balance / 10000) / 10000 + "RVN"));
    rvnUnpaidStringID.appendChild(rvnUnpaidString);

    var rvnWorkerString = document.createElement("p").appendChild(document.createTextNode(jsonResult.workersOnline));
    rvnWorkerStringID.appendChild(rvnWorkerString);

    var rvnLuckString = document.createElement("p").appendChild(document.createTextNode(Math.round(jsonResult.currentLuck * 100) + "%"));
    rvnLuckStringID.appendChild(rvnLuckString);

    var rvnHashrateString = document.createElement("p").appendChild(document.createTextNode(Math.round(jsonResult.hashrate / 10000) / 100 + "MH/s"));
    rvnHashrateStringID.appendChild(rvnHashrateString);



    var rvnTotalRewardDollarString = document.createElement("p").appendChild(document.createTextNode(("$" + Math.round(jsonResult.stats.paid / 1000000 * rvnToDollarRate) / 100)));
    rvnTotalRewardDollarStringID.appendChild(rvnTotalRewardDollarString);

    var rvnUnpaidDollarString = document.createElement("p").appendChild(document.createTextNode("$" + Math.round(jsonResult.stats.balance / 1000000 * rvnToDollarRate) / 100));
    rvnUnpaidDollarStringID.appendChild(rvnUnpaidDollarString);

    /*  setTimeout(ravenapi.onload, 5000); */

}
rvnapi.send(null);
