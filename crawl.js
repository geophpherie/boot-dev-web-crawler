const url = require('node:url');
const jsom = require('jsdom')
const { JSDOM } = jsom

function normalizeURL(url) {
    const parsedUrl = new URL(url)

    const hostname = parsedUrl.hostname

    let pathname
    if (parsedUrl.pathname.endsWith('/')) {
        pathname = parsedUrl.pathname.slice(0, -1)
    } else {
        pathname = parsedUrl.pathname
    }
    return `${hostname}${pathname}`
}

function getURLsfromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody)

    const elements = dom.window.document.querySelectorAll('a')

    const urls = []

    for (let element of elements) {
        if (element.href.startsWith('/')) {
            urls.push(`${baseURL}${element.href}`)
        }
        else {
            urls.push(element.href)
        }
    }
    return urls
}

module.exports = {
    normalizeURL,
    getURLsfromHTML
}