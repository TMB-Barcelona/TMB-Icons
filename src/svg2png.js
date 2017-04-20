#!/usr/bin/env node
const fs = require('fs');
const svg2png = require("svg2png");

fs.readdirSync('../docs/svg').map(convert);

function convert(file) {
	let targetName = file.split(".")
	targetName.pop();
	targetName = targetName.join(".") + ".png";
	console.log("Converting " + file + " to " + targetName);
	const source = fs.readFileSync('../docs/svg/'+file);
	const target = svg2png.sync(source);
	
	fs.writeFileSync('../docs/png/64/'+targetName, target);
}
