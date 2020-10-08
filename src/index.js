const { resolveConfig, loadConfig } = require('./resolve')
const program = require('commander')
const pkg = require('../package.json')
const { build } = require('./build')
const { serve } = require('./serve')

const config = loadConfig()
resolveConfig(config)

program.version(pkg.version, '-V, --version')
    .arguments('<mode>')
    .action(function (mode, cmd) {
        console.log(mode)
        if (mode === 'build') {
            build(config)
        } else if (mode === 'serve') {
            serve(config)
        }
    })
    .parse(process.argv)



