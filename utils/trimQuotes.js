const trimQuotes = (string) => {
    const regexp = /"([^"]*)"/gm
    let match = regexp.exec(string)

    while (match !== null) {
        const replacement = `"${match[1].replace(/\s+/g, ' ').trim()}"`
        string = string.replace(match[0], replacement)
        match = regexp.exec(string)
    }

    return string
}

module.exports = trimQuotes
