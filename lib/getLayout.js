const fs = require('fs')
const { join, extname } = require('path')

const getLayout = (file, attributes, options) => {
    attributes.layout = attributes.layout || 'default'
    const layout = join(options.layouts, attributes.layout) + extname(file.path)

    try {
        return fs.readFileSync(layout, 'utf8')
    } catch (err) {
        return false
    }
}

module.exports = getLayout
