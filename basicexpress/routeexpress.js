const fs = require('fs')
const express = require('express')
const querystring = require('querystring')

const port = process.env.PORT || 1337
const app = express()

function respondText(req, res){
    res.end('Hi there! I\'m using express!! \'sup')
}

function respondJson(req, res){
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({text: 'hi there!', numbers: [1,2,3,4]}))
}

function respondNotFound(req, res){
    res.writeHead(404, {'Content-Type' : 'text/plain'})
    res.end('Not found, go back!')
}

function respondEcho(req, res){
    const {input = ''} = querystring.parse(
        req.url
        .split('?')
        .slice(1)
        .join('')
    )

    res.setHeader('Content-Type', 'application/json')
    res.end(
        JSON.stringify({
            normal: input,
            shouty: input.toUpperCase(),
            characterCount: input.length,
            backwards: input
            .split('')
            .reverse()
            .join()
        })
    )
}

function respondStatic(req, res){
    const filename = `${__dirname}/../public${req.url.split('/static')[1]}`
    fs.createReadStream(filename)
    .on('error', () => respondNotFound(req, res))
    .pipe(res)
}

app.get('/', respondText)
app.get('/json', respondJson)
app.get('/echo', respondEcho)
app.get('/static/*', respondStatic)
app.listen(port, () => console.log(`The app is working and listening on port ${port}`));