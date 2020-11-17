#!/usr/bin/env node
const fs = require('fs');
const Mustache = require('mustache');
const {version} = require('../package.json');

const template = fs.readFileSync("index-template.html").toString();

const data = {
    "version": 'v' + version,
	"svg": fs.readdirSync('../static/svg'),
	"png64": fs.readdirSync('../static/png/64'),
};

const output = Mustache.render(template, data);

fs.writeFileSync('../static/index.html', output);
