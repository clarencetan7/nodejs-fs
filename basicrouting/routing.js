function respondText(req, res){
    res.setHeader('Content-Type', 'text/plain')
    res.end('hi')
}

function respondJson(req, res){
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({text: 'hi there!', numbers: [1,2,3,4]}))
}

function respondNotFound(req, res){
    res.writeHead(404, {'Content-Type' : 'text/plain'})
    res.end('Not found, go back!')
}
const http = require('http')
const port = process.env.PORT = 1337;
const server = http.createServer((req, res) => {
    if(req.url === '/') return respondText(req, res)
    if(req.url === '/json') return respondJson(req,res)

    respondNotFound(req, res)
})

server.listen(port)

console.log(`our server is listening to port ${port}`)