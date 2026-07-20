#!/usr/bin/env node
const fs = require('fs');
const Mustache = require('mustache');
const { version } = require('../package.json');
const config = require("../config.json");

const template = fs.readFileSync("index-template.html").toString();

const { icons } = config;
// Group icons by category
const categories = {};
icons.forEach(icon => {
	if (!categories[icon.category]) {
		categories[icon.category] = [];
	}
	categories[icon.category].push(icon);
});

const data = {
	"version": 'v' + version,
	"categories": Object.keys(categories).map(category => ({
		name: category,
		icons: categories[category]
	}))
};

const output = Mustache.render(template, data);

fs.writeFileSync('../static/index.html', output);
