module.exports = (...rest) => {
    let arg = Array.prototype.slice.call(rest)
    arg.pop()
    return arg.join('')
}
