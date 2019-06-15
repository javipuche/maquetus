module.exports = (...rest) => {
    const params = Array.prototype.slice.call(rest)
    const pagesNames = params.slice(0, -1)
    const options = params[params.length - 1]

    if (!pagesNames.includes(options.data.root.page)) {
        return options.fn(this)
    }
}
