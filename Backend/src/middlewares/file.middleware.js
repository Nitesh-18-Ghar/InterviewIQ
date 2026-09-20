const multer = require("multer")

const upload = multer({
    storage: multer.memoryStorage(),       // temporary server ki RAM pe save krta hai as a buffer
    limits: {
        filesize: 3 * 1024 * 1024   // 3MB
    }
})

module.exports = upload