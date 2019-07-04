const through = require('through2')
const { extname } = require('path')
const { allowedExtensions } = require('./lib/config')
const render = require('./lib/render')
const errorMessage = require('./lib/errorMessage')

const isHandlebars = (file) => allowedExtensions.indexOf(extname(file.path).split('.').pop()) >= 0

const maquetus = (options) => {
    return through.obj((file, encoding, callback) => {
        if (!options) {
            return callback(errorMessage('Maquetus error: Configure Maquetus options please.'))
        }

        if (options && !options.layouts) {
            return callback(errorMessage('Maquetus error: You must specify a directory for layouts.'))
        }

        if (options && !options.partials) {
            return callback(errorMessage('Maquetus error: You must specify a directory for partials.'))
        }

        if (file.isNull()) {
            return callback(null, file)
        }

        if (file.isStream()) {
            return callback(errorMessage('Maquetus error: Streams not supported!'))
        }

        if (!isHandlebars(file)) {
            return callback(errorMessage(`Maquetus error: File extension not supported! Allowed extensions: ${allowedExtensions.join(', ')}.`))
        }

        try {
            file.contents = Buffer.from(render(file, options))
            file.path = file.path.replace(extname(file.path), (options.ext || '.html'))
            return callback(null, file)
        } catch (err) {
            return callback(errorMessage(err))
        }
    })
}

module.exports = maquetus
