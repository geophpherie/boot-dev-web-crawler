const { test, expect } = require('@jest/globals')

const { normalizeURL, getURLsfromHTML } = require('./crawl')

test("https trailing slash", () => {
    const url = "https://blog.boot.dev/path/"
    expect(normalizeURL(url)).toEqual('blog.boot.dev/path')
})

test("http trailing slash", () => {
    const url = "http://blog.boot.dev/path/"
    expect(normalizeURL(url)).toEqual('blog.boot.dev/path')
})

test("https no trailing slash", () => {
    const url = "https://blog.boot.dev/path"
    expect(normalizeURL(url)).toEqual('blog.boot.dev/path')
})

test("http no trailing slash", () => {
    const url = "http://blog.boot.dev/path"
    expect(normalizeURL(url)).toEqual('blog.boot.dev/path')
})

test('find single href', () => {
    const baseUrl = "http://boot.dev"
    const htmlBody = '<a href="https://boot.dev/path">Learn Backend Development</a>'
    const result = ['https://boot.dev/path']
    expect(getURLsfromHTML(htmlBody, baseUrl)).toEqual(result)
})

test('find relative href', () => {
    const baseUrl = "http://boot.dev"
    const htmlBody = '<a href="/path">Learn Backend Development</a>'
    const result = ['http://boot.dev/path']
    expect(getURLsfromHTML(htmlBody, baseUrl)).toEqual(result)
})

test('find multiple href', () => {
    const baseUrl = "http://boot.dev"
    const htmlBody = '<a href="https://boot.dev/path">Learn Backend Development</a><a href="https://boot.dev/info">Backend Development</a>'
    const result = ['https://boot.dev/path', 'https://boot.dev/info']
    expect(getURLsfromHTML(htmlBody, baseUrl)).toEqual(result)
})