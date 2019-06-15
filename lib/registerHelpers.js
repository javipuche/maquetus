const glob = require('glob')
const { basename, extname, resolve } = require('path')
const hbs = require('handlebars')

const registerHelpers = (paths) => {
    const files = glob.sync(`${paths}/**/*.js`)

    files.forEach((file) => {
        const helperName = basename(file, extname(file))
        const helperFunction = require(resolve(file))
        hbs.registerHelper(helperName, helperFunction)
    })
}

module.exports = registerHelpers
