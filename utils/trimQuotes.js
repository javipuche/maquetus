const trimQuotes = (string) => {
    const regexp = /"([^"]*)"/gm
    let match = regexp.exec(string)

    while (match !== null) {
        string = string.replace(match[1], match[1].replace(/\s+/g, ' ').trim())
        match = regexp.exec(string)
    }

    return string
}

module.exports = trimQuotes
