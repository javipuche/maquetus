const colors = require('colors')

const errorMessage = (message, file, name = 'maquetus') => console.error(`${file && colors.red(file)}\n${colors.red(message)}`)

module.exports = errorMessage
