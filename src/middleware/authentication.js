const User = require('../models/user-model')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
	try {
		// const token = req.header('authorization')
		// now this token contains 'Bearer {authToken}'
		// to remove bearer we do following
		// console.log(req.header('Authorization'))

		const token = req.header('Authorization').split(' ')[1]

		// console.log('logging token from authenticator token', token)
		const decodedToken = jwt.verify(token, process.env.JWT_SECRECT)

		const user = await User.findOne({
			_id: decodedToken._id,
			'tokens.token': token,
		})

		if (!user) {
			throw new Error('user not found')
		}

		req.user = user
		req.authToken = token
		// console.log(
		// 	'logging from authenticator multiple ',
		// 	req.method,
		// 	req.path,
		// 	req.user,
		// 	req.authToken
		// )
		next()
	} catch (e) {
		res.status(401).send({ error: 'Authentication Failed' })
	}
}

module.exports = auth
