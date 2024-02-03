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

async function crawlPage(baseUrl, currentUrl, pages) {
    const parsedBaseUrl = new URL(baseUrl)

    const parsedCurrentUrl = new URL(currentUrl)

    if (parsedBaseUrl.hostname !== parsedCurrentUrl.hostname) {
        console.log(`${parsedBaseUrl} doesn't match ${parsedCurrentUrl}, returning.`)
        return pages

    }
    const normalizedUrl = normalizeURL(currentUrl)

    if (normalizedUrl in pages) {
        pages[normalizedUrl] += 1
        return pages
    } else {
        if (baseUrl !== currentUrl) {
            pages[normalizedUrl] = 1
        } else {
            pages[normalizedUrl] = 0
        }
    }
    // fetch the webpage of the current url
    console.log(`Now fetching ${currentUrl}`)
    try {
        const response = await fetch(currentUrl)
        if (!response.ok) {
            console.log(`response error :: ${response.status}`)
            return pages
        }

        if (!response.headers.get('content-type').includes('text/html')) {
            console.log('invalid content-type')
            return pages
        }

        const newUrls = getURLsfromHTML(await response.text(), baseUrl)

        for (const newUrl of newUrls) {
            pages = await crawlPage(baseUrl, newUrl, pages)

        }
    } catch (e) {
        console.log(`an error has ocurred :: ${e.message}`)
        return pages
    }

    return pages
}

module.exports = {
    normalizeURL,
    getURLsfromHTML,
    crawlPage
}