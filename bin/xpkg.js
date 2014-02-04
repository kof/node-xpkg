#!/usr/bin/env node

var Path = require('path'),
    fs = require('fs'),
    JSON5 = require('json5')

var path = Path.resolve(process.cwd(), process.argv[2] || ''),
    confPath = Path.join(path, 'x-package.json'),
    conf,
    cleanedConf

function error(msg) {
    console.log(msg)
    process.exit(1)
}

if (!fs.existsSync(confPath)) {
    confPath += 5
    if (!fs.existsSync(confPath)) return error('No x-package.json or .json5 found at ' + confPath)
}

conf = JSON5.parse(fs.readFileSync(confPath, 'utf8'))

if (!Array.isArray(conf.packages) || !conf.packages.length) return error('Missing "packages" array in x-package.json')

function extend(a, b) {
    for (var key in b) a[key] = b[key]
    return a
}

// Create an x-package specific declarations free config object.
cleanedConf = extend({}, conf)
cleanedConf.packages.forEach(function(name) {
    delete cleanedConf[name]
})
delete cleanedConf.packages

conf.packages.forEach(function(name) {
    var data = extend({}, cleanedConf)
    if (conf[name]) extend(data, conf[name])
    fs.writeFileSync(Path.join(path, name), JSON.stringify(data, null, '  '))
    console.log('Generated', name)
})
