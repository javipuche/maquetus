const trimBetweenHtmlTags = (string) => {
    const regexp = />([^>]*)</gm
    let match = regexp.exec(string)

    while (match !== null) {
        const replacement = `>${match[1].trim()}<`
        string = string.replace(match[0], replacement)
        match = regexp.exec(string)
    }

    return string
}

module.exports = trimBetweenHtmlTags
