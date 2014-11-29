#!/usr/bin/env node

var path = require('path')
var fs = require('fs')
var JSON5 = require('json5')
var extend = require('extend')

var dir = path.resolve(process.cwd(), process.argv[2] || '')
var confPath = path.join(dir, 'x-package.json')
var filesMap = {
    npm: 'package.json',
    bower: 'bower.json',
    component: 'component.json',
    jquery: 'name.jquery.json'
}

function error(msg) {
    console.log(msg)
    process.exit(1)
}

if (!fs.existsSync(confPath)) {
    confPath += 5
    if (!fs.existsSync(confPath)) return error('No x-package.json or .json5 found at ' + confPath)
}

var conf = JSON5.parse(fs.readFileSync(confPath, 'utf8'))

conf.overlay || (conf.overlay = {npm: true})

// Create an x-package specific declarations free config object.
var cleanedConf = extend(true, {}, conf)
delete cleanedConf.overlay

Object.keys(conf.overlay).forEach(function(name) {
    var data = extend(true, {}, cleanedConf)
    var def = conf.overlay[name]
    var fileName = filesMap[name]

    if (name == 'jquery') fileName = fileName.replace('name', data.name)
    if (typeof def == 'object') extend(true, data, def)

    fs.writeFileSync(path.join(dir, fileName), JSON.stringify(data, null, '  '))
    console.log('Generated', fileName)
})

