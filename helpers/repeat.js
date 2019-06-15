const Handlebars = require('handlebars')

module.exports = (count, options) => {
    let data = options.data ? Handlebars.createFrame(options.data) : undefined
    let str = ''

    for (var i = 0; i < count; i++) {
        if (data) data.index = i
        str += options.fn(this, { data: data })
    }

    return str
}
