const hljs = require('highlight.js')
const marked = require('marked')

const trimTabs = (s) => {
    const m = s.match(/(\s+)/)
    return (m) ? s.replace(new RegExp('(^|\n)' + m[1], 'g'), '$1') : s
}

module.exports = (options) => {
    const renderer = new marked.Renderer()

    renderer.code = (code, language) => {
        if (typeof language === 'undefined') language = 'html'

        const renderedCode = hljs.highlight(language, code).value
        const output = `
            <div class="c-code">
                <pre><code class="${language}">${renderedCode}</code></pre>
            </div>
        `

        return output
    }

    return marked(trimTabs(options.fn(this)), { renderer })
}
