var palette = ["#FF1741"];

function updateH(tier, color) {
	var header = document.getElementsByTagName(tier)[0];
	header.style.color = color;
	header.style.opacity = 1;
	var text = header.innerHTML;
	var prefix = text.includes("Hover")
		? "Primary&nbsp;Surface&nbsp;Color"
		: text.includes(" ")
		? text.split(" ")[0]
		: text;
	header.innerHTML =
		prefix.replace(":", "") + " " + color.toUpperCase().replace("#", "&num;");
}

function contrast(bgColor, backgrounds = palette) {
	return tinycolor.mostReadable(bgColor, backgrounds).toHexString();
}

function display(color) {
	updateH("h1", "#" + color);
	updateH(
		"h2",
		tinycolor("#" + color)
			.darken("20")
			.toString()
	);
	updateH(
		"h3",
		tinycolor("#" + color)
			.lighten()
			.toString()
	);
	updateH(
		"h4",
		tinycolor("#" + color)
			.darken("20")
			.darken()
			.toString()
	);
	updateH(
		"h5",
		tinycolor("#" + color)
			.complement()
			.toHexString()
	);
	updateH("h6", contrast("#" + color));

	updateH(
		"h7",
		contrast("#" + color, ["#b3b3b3", "404040", "282828", "FFFFFF", "CF6679"])
	);
}

$(document).ready(() => {
	for (const li of document.getElementsByClassName("color")) {
		palette.push(li.getAttribute("value"));
		var curr = li.getAttribute("style");
		var readable = contrast(curr);
		if (palette.length > 14) {
			palette.splice(7, 12);
			palette.splice(0, 3);
		}
		li.setAttribute("style", `${curr}; color: ${readable}`);
		let overlay = document.createElement("div");
		overlay.classList.add("overlay");
		overlay.setAttribute("style", `${curr}; color: ${readable}`);
		overlay.innerHTML = li.getAttribute("value");
		overlay.setAttribute(
			"onmouseover",
			`display('${li.getAttribute("value").substring(1)}')`
		);
		li.appendChild(overlay);
		overlay.style.cursor = "none";
	}
});
