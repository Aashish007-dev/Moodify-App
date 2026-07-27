const multer = require('multer');

const storage = multer.memoryStorage()


const upload = multer({
    storage: storage,
    limits: 1024 * 1024 * 15
})


module.exports = upload;