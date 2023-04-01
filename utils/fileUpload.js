const multer = require('multer')
const { Router } = require('express')
const pool = require('./db')

const fileUpload = Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`)
  }
})
const upload = multer({ storage })

fileUpload
  .post(
    '/upload-profile-pic',
    upload.array('profile_pic', 12),
    function (req, res, next) {
      if (req.files.length > 0) {
        console.log('ok')
        next()
      } else {
        res.status(400).send('no image')
      }
    },
    function (req, res, next) {
      if (
        ['image/png', 'image/jpg', 'image/gif', 'image/jpeg'].includes(
          req.files[0].mimetype.toLowerCase()
        )
      ) {
        console.log('ok')
        next()
      } else {
        res.status(400).send('wrong file type')
      }
    },
    function (req, res, next) {
      let result = ''
      req.files.map(file => {
        pool.query(
          'INSERT INTO images (name, path) VALUES ($1, $2)',
          [file.filename, `http://localhost:4000/${file.filename}`],
          (err, res) => {}
        )
        result += `<img src="http://localhost:4000/${file.filename}"/>`
      })
      res.send(result)
    }
  )
  .post('/upload-cat-pics', (req, res) => {})

module.exports = fileUpload
