const fm = require('front-matter')
const hbs = require('handlebars')
const { basename, extname, join } = require('path')
const getLayout = require('./getLayout')
const registerHelpers = require('./registerHelpers')
const registerPartials = require('./registerPartials')
const getData = require('./getData')
const rootPath = require('./rootPath')

const compiler = (tmpl, opts) => {
    const template = hbs.compile(tmpl, { noEscape: true })
    return template(opts)
}

const render = (file, options) => {
    registerHelpers(join(__dirname, '../helpers'))

    if (options.helpers) {
        registerHelpers(options.helpers)
    }

    registerPartials(options.partials)

    const data = options.data ? getData(options.data) : {}
    const attributes = fm(file.contents.toString()).attributes
    const globals = Object.assign(attributes, data, { root: rootPath(file), page: basename(file.path, extname(file.path)) })
    const body = compiler(fm(file.contents.toString()).body, globals)
    const html = compiler(getLayout(file, attributes, options), Object.assign(globals, { body: body }))
    return html
}

module.exports = render
