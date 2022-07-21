require('dotenv').config()

const nodemailer = require('nodemailer')

const config = {
	host: process.env.HOST,
	service: process.env.SERVICE,
	port: Number(process.env.EMAIL_PORT),
	secure: process.env.SECURE === 'true',
	auth: {
		user: process.env.MY_EMAIL,
		pass: process.env.PASSWORD,
	},
}
// console.log('config', config)
const transporter = nodemailer.createTransport(config)

transporter.verify(function (error, success) {
	if (error) {
		console.log(error)
	} else {
		console.log('Server is ready for mailing')
	}
})

module.exports = async (email, subject, html) => {
	try {
		const sendingConfig = {
			from: process.env.MY_EMAIL,
			to: email,
			subject: subject,
			html: html,
		}
		// console.log('sendingConfig', sendingConfig)
		await transporter.sendMail(sendingConfig)
		console.log('email sent successfully')
	} catch (e) {
		console.log(e)
	}
}