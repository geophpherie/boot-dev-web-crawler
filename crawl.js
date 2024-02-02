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
    const dom = new jsom.JSDOM(htmlBody)

    const elements = dom.window.document.querySelectorAll('a')

    const urls = []

    for (const element of elements) {
        if (element.href.startsWith('/')) {
            urls.push(`${baseURL}${element.href}`)
        }
        else {
            urls.push(element.href)
        }
    }
    return urls
}

async function crawlPage(url) {
    // fetch the webpage of the current url
    try {
        const response = await fetch(url)
        if (!response.ok) {
            console.log(`response error :: ${response.status}`)
            return
        }

        if (!response.headers.get('content-type').includes('text/html')) {
            console.log('invalid content-type')
            return
        }

        console.log(await response.text())
    } catch (e) {
        console.log(`an error has ocurred :: ${e.message}`)
        return
    }



    // else print html body and peace out 
}

module.exports = {
    normalizeURL,
    getURLsfromHTML,
    crawlPage
}