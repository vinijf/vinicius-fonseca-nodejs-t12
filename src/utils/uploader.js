const multer = require('multer')
const path = require("path")

module.exports = app => {
    let uploader = multer({
        storage: multer.diskStorage({
            destination: (req, file, callback) => {
                callback(null, "uploads/")
            },
            filename: (req, file, callback) => {
                callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
            }
        })
    })

    return uploader;
}