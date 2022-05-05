#!/usr/bin/env node
const fs = require('fs');
const Mustache = require('mustache');
const {version} = require('../package.json');

const template = fs.readFileSync("index-template.html").toString();

const data = {
    "version": 'v' + version,
	"svg": fs.readdirSync('../static/svg'),
	"png": fs.readdirSync('../static/png/originalSize'),
};

const output = Mustache.render(template, data);

fs.writeFileSync('../static/index.html', output);
