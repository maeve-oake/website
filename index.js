setTimeout(function () { document.getElementById('home').classList.remove("hidden") }, 1300);

if (new URL(document.referrer).origin == new URL(document.URL).origin) {
    document.getElementById("main").style.animationDuration = "0s"
    document.getElementById("main").style.animationDelay = "0s"
    document.getElementById('home').classList.remove("hidden")
}