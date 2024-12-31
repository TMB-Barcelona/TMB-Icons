const fs = require('fs')
const path = require('path')
const opentype = require('opentype.js');

const { createDirIfNotExists, downloadFile } = require('../utils')

const generateRoundedIcon = async (text, fillColor, textColor) => {
	const fontPath = path.join(".", "fonts", "/Roboto-Bold.ttf");
	// const fontPath = path.join(".", "fonts", "/Roboto-BoldItalic.ttf");
	const fontSize = text.length > 2 ? 30 : 36;
	const svgSize = 64;

	const font = await opentype.load(fontPath);
	const fPath = font.getPath(text, 0, 0, fontSize);
	const textPath = fPath.toPathData();
	const radius = svgSize / 2;
	const textBBox = fPath.getBoundingBox();
	const tx = ((svgSize - (textBBox.x2 - textBBox.x1)) / 2) - textBBox.x1
	const ty = ((svgSize - (textBBox.y2 - textBBox.y1)) / 2) - textBBox.y1

	// console.log({tx, ty, textBBox})

	const svgContent = `
        <svg width="${svgSize}" height="${svgSize}" viewBox="0 0 ${svgSize} ${svgSize}" xmlns="http://www.w3.org/2000/svg">
            <circle cx="${radius}" cy="${radius}" r="${radius}" fill="${fillColor}" />
            <g transform="translate(${tx} ${ty})">
                <path d="${textPath}" fill="${textColor}" />
            </g>
        </svg>
    `;

	return svgContent;
}

const outputBaseDir = path.join(__dirname, 'output')
createDirIfNotExists(outputBaseDir)

fs.readFile(path.join(__dirname, 'icons.json'), 'utf8', async (error, data) => {
	if (error) {
		console.error('Error reading icons JSON file:', error);
		return;
	}

	try {
		const jsonData = JSON.parse(data);
		jsonData.forEach(async (item) => {
			const { ICON, COLOR, TEXT_COLOR } = item;
			const TEXT = item.TEXT || ICON;
			const iconContent = await generateRoundedIcon(TEXT, `#${COLOR}`, `#${TEXT_COLOR}`)
			fs.writeFileSync(path.join(outputBaseDir, ICON + '.svg'), iconContent);
		});
	} catch (error) {
		console.error('Error generating rounded icons:', error);
	}
});
