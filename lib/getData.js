const fs = require('fs')
const directoryTree = require('directory-tree')
const yaml = require('js-yaml')
const { basename, extname } = require('path')
const { allowedDataExtensions } = require('./config')
const errorMessage = require('./errorMessage')

const createDataObj = (files, obj = {}) => {
    files.forEach((file) => {
        if (file.type === 'directory') {
            obj[file.name] = createDataObj(file.children)
        } else if (file.extension === '.json') {
            try {
                obj[basename(file.name, extname(file.name))] = JSON.parse(fs.readFileSync(file.path))
            } catch (err) {
                return errorMessage(err, file)
            }
        } else if (file.extension === '.yml') {
            obj[basename(file.name, extname(file.name))] = yaml.safeLoad(fs.readFileSync(file.path))
        }
    })

    return obj
}

const getData = (path, obj = {}) => {
    const files = directoryTree(path, {
        normalizePath: true,
        extensions: new RegExp(`.(${allowedDataExtensions.join('|')})`)
    })

    return Object.assign(obj, createDataObj(files.children))
}

module.exports = getData
