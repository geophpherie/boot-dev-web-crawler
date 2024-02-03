const { argv } = require('node:process')

const { crawlPage } = require('./crawl')
const { printReport } = require('./report')

async function main(argv) {

    if (argv.length != 3) {
        console.log('ERROR: Incorrect number of arguments.')

        return
    }

    baseUrl = argv[2]
    console.log(`Starting crawler at :: ${baseUrl}`)
    const pages = await crawlPage(baseUrl, baseUrl, {})
    console.log(`crawling complete!`)

    printReport(pages)

}

main(argv)
