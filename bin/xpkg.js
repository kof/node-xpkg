#!/usr/bin/env node

var Path = require('path'),
    fs = require('fs'),
    JSON5 = require('json5')

var path = Path.resolve(process.cwd(), process.argv[2] || ''),
    confPath = Path.join(path, 'x-package.json'),
    conf,
    cleanedConf,
    filesMap

filesMap = {
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

conf = JSON5.parse(fs.readFileSync(confPath, 'utf8'))

function extend(a, b) {
    for (var key in b) a[key] = b[key]
    return a
}

// Create an x-package specific declarations free config object.
cleanedConf = extend({}, conf)
delete cleanedConf.overlay

conf.overlay || (conf.overlay = {npm: true})

Object.keys(conf.overlay).forEach(function(name) {
    var data = extend({}, cleanedConf),
        def = conf.overlay[name],
        fileName = filesMap[name]

    if (name == 'jquery') fileName = fileName.replace('name', data.name)
    if (typeof def == 'object') extend(data, def)

    fs.writeFileSync(Path.join(path, fileName), JSON.stringify(data, null, '  '))
    console.log('Generated', fileName)
})

