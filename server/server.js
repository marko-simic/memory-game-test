const http = require("http")
const fs = require("fs")
const path = require("path")

const server = http.createServer((req, res) => {
  let filePath = path.resolve(__dirname + "/../game" + req.url)

  fs.exists(filePath, (exists) => {
    if (!exists) {
      res.statusCode = 404
      res.end(`File ${filePath} not found!`)
    }

    if (fs.statSync(filePath).isDirectory()) {
      filePath += "/index.html"
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end(`Error getting the file: ${err}.`)
      } else {
        res.end(data)
      }
    })
  })
})

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", () => {
  const addr = server.address()
  console.log("Server listening at", addr.address + ":" + addr.port)
})
