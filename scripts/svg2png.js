#!/usr/bin/env node
const fs = require('fs');
const svg2png = require("svg2png");

const outputDir = '../static/png/64/';

if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir, {recursive: true});
}

fs.readdirSync('../svg').map(convert);

function convert(file) {
	let targetName = file.split(".")
	targetName.pop();
	targetName = targetName.join(".") + ".png";
	console.log("Converting " + file + " to " + targetName);
	const source = fs.readFileSync('../svg/'+file);
	const target = svg2png.sync(source);
	
	fs.writeFileSync(outputDir + targetName, target);
}
