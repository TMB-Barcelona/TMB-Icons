# TMB-Icons: Icons for TMB-Barcelona

## Usage

* Latest Icons: https://tmb-barcelona.github.io/TMB-Icons/
* TMB S3 CDN Examples: 
  * Index: https://cdn.tmb.cat/icons/v1.1.1/static/index.html
  * SVGs: https://cdn.tmb.cat/icons/v1.1.1/static/svg/L1.svg
  * PNGs: https://cdn.tmb.cat/icons/v1.1.1/static/png/64/L1.png
  * Mapbox Sprites: https://cdn.tmb.cat/icons/v1.1.1/static/mapboxgl/sprites.json


## Origin

Original icons taken from from Wikimedia Commons in SVG format.
Original URLs available at `sources.txt`.
Some icons have been edited for homogeinity.
Base size is 64x64 px.

## Generate PNG icons

`npm run svg2png`

## Generate sprites for mapbox-gl styles

`npm run mapbox`

## Generate React components and pack as module

`npm run build-react`

## Generate index.html for gh-pages

`npm run build-static`

## Publish on github pages

`npm run gh-pages`


## How to release

To make a new version of library, we need to do it from master branch. For example, to do a `v0.0.2` version:


```bash
npm version 0.0.2
npm release
npm run gh-pages
npm run upload-to-s3
```

This will do:
1. Update version on `package.json`
2. Updates `CHANGELOG.md`
3. Git commit and tag with v0.0.2
4. Push commit and tag to git
5. Make a `tmb-react-components.v0.0.1.tgz` with transpiled code
6. Make a github release `v0.0.1` and upload tgz file and mapbox sprites as asset

After that, we have a new [release](https://github.com/geomatico/TMB-Icons/releases) on github.


