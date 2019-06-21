const fs = require('fs')
const glob = require('glob')
const { join, extname, normalize } = require('path')
const hbs = require('handlebars')
const { allowedExtensions } = require('./config')

const createPartial = (paths, path = '') => {
    const files = glob.sync(`${paths}/**/*.{${allowedExtensions.join()}}`)

    files.forEach((file) => {
        const basePath = normalize(file).split(join(paths, '/'))[1]
        const partialName = join(path, basePath.split(extname(basePath))[0])
        const content = fs.readFileSync(file, 'utf8')

        hbs.registerPartial(partialName.replace(/\\/g, '/'), content)
    })
}

const registerPartials = (paths) => {
    if (typeof paths === 'object') {
        return Object.entries(paths).forEach(([alias, path]) => createPartial(path, alias))
    } else if (typeof paths === 'string') {
        return createPartial(paths)
    }
}

module.exports = registerPartials
