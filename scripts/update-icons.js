const path = require('path')
const config = require('../config.json')
const { createDirIfNotExists, downloadFile } = require('./utils')

const outputBaseDir = path.join(__dirname, '..', 'svg')
createDirIfNotExists(outputBaseDir)

//get icons from data sources (url)
const updateIcons = async () => {
    for (icon of config.icons) {
        await downloadFile(icon.url, outputBaseDir, `${icon.name}.${icon.format}`)
    }
}

updateIcons()