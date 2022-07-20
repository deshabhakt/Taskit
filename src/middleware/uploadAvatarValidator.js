const multer = require('multer')

const uploadAvatarValidator = multer({
	limits: {
		fileSize: 2000000,
	},
	fileFilter(req, file, callback) {
		if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
			return callback(new Error('Invalid file format'))
		}
		return callback(undefined, true)
	},
})

module.exports = uploadAvatarValidator
