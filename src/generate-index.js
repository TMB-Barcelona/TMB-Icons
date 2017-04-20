#!/usr/bin/env node
const fs = require('fs');
const Mustache = require('mustache');

const template = fs.readFileSync("index-template.html").toString();

const data = {
	"svg": fs.readdirSync('../docs/svg')
};

const output = Mustache.render(template, data);

fs.writeFileSync('../docs/index.html', output);
