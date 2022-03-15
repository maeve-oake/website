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