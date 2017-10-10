const express = require('express')
const path = require('path')
const port = process.env.PORT || 3000
const app = express()


app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + "/images")); 


app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(port)
console.log("PMProject Server Started on Port " + port)