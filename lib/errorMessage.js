const colors = require('colors')

const errorMessage = (message, file, name = 'maquetus') => console.error(colors.red(message))

module.exports = errorMessage
