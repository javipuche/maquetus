const { dirname, relative, join } = require('path')

const rootPath = (file) => {
    const path = relative(dirname(file.path), file.base)
    const slash = !path ? './' : '/'
    return join(path, slash)
}

module.exports = rootPath
