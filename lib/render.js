const fm = require('front-matter')
const hbs = require('handlebars')
const beautifyHtml = require('js-beautify').html
const { basename, extname, join } = require('path')
const errorMessage = require('./errorMessage')
const getLayout = require('./getLayout')
const registerHelpers = require('./registerHelpers')
const registerPartials = require('./registerPartials')
const getData = require('./getData')
const rootPath = require('./rootPath')
const errorTpl = require('../tpl/errorTpl')

const compiler = (tmpl, data = {}, hbsOptions = {}) => {
    const template = hbs.compile(tmpl, Object.assign({ noEscape: true }, hbsOptions))
    return template(data)
}

const render = (file, options) => {
    try {
        registerHelpers(join(__dirname, '../helpers'))

        if (options.helpers) {
            registerHelpers(options.helpers)
        }

        if (options.customHelpers) {
            Object.keys(options.customHelpers).forEach(function (key) {
                hbs.registerHelper(key, options.customHelpers[key])
            })
        }

        registerPartials(options.partials)

        if (options.customPartials) {
            Object.keys(options.customPartials).forEach(function (key) {
                hbs.registerPartial(key, options.customPartials[key])
            })
        }

        const data = options.data ? getData(options.data) : {}
        const attributes = fm(file.contents.toString()).attributes
        const globals = Object.assign(attributes, data, { root: rootPath(file), page: basename(file.path, extname(file.path)) })
        const body = compiler(fm(file.contents.toString()).body, globals, options.hbsOptions)
        const layout = getLayout(file, attributes, options)

        if (!layout) {
            const msg = `Maquetus error: Layout ${attributes.layout} dont't exists.`
            errorMessage(msg, file.path)
            return errorTpl(msg, file.path)
        }

        const html = compiler(layout, Object.assign(globals, { body: body }), options.hbsOptions)
        return beautifyHtml(html, {
            inline: []
        })
    } catch (err) {
        errorMessage(err, file.path)
        return errorTpl(err, file.path)
    }
}

module.exports = render
