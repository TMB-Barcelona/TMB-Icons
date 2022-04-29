#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const svg2png = require('svg2png');

const arguments = process.argv;

// Too much arguments, show help & exit
if (arguments.length > 3) {
	console.log(`Usage: ${path.basename(__filename)} [image_height_in_pixels]`);
	process.exit(1);
}

const imageHeight = parseInt(arguments[arguments.length - 1]);
const config = imageHeight > 0 ? { height: imageHeight } : undefined;

const outputDir = `../static/png/${config ? config.height : 'originalSize'}/`;
console.log(`Outputting to ${outputDir}`);

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
	const target = svg2png.sync(source, config);
	
	fs.writeFileSync(outputDir + targetName, target);
}
