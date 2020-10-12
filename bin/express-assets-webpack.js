#!/usr/bin/env node

const { resolveConfig, loadConfig } = require('../src/resolve')
const program = require('commander')
const pkg = require('../package.json')
const { build } = require('../src/build')
const { serve } = require('../src/serve')
const { setNodeEnv } = require('../src/utils')

program.version(pkg.version, '-V, --version')
    .arguments('<mode>')
    .action(function (mode, cmd) {
        if (mode === 'build') {
            setNodeEnv('production')
        } else {
            setNodeEnv('development')
        }
        
        const config = loadConfig()
        resolveConfig(config)

        if (mode === 'build') {
            build(config)
        } else if (mode === 'serve') {
            serve(config)
        }
    })
    .parse(process.argv)

