const express = require('express')
require('dotenv').config()

const port = 4000
const app = express()
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const fileUpload =require("./utils/fileUpload");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('uploads'))


app.use("/upload",fileUpload);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
