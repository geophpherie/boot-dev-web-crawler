function printReport(pages) {
    const pagesArray = Object.entries(pages)
    pagesArray.sort((a, b) => b[1] - a[1])

    console.log('Starting report')
    for (const page of pagesArray) {
        console.log(`Found ${page[1]} internal links to ${page[0]}`)
    }
}

module.exports = {
    printReport
}