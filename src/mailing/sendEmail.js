require('dotenv').config()

const nodemailer = require('nodemailer')

module.exports = async (email, subject, html) => {
	try {
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
		// console.log(config)
		const transporter = nodemailer.createTransport(config)
		const sendingConfig = {
			from: process.env.MY_EMAIL,
			to: email,
			subject: subject,
			html: html,
		}
		// console.log(sendingConfig)
		await transporter.sendMail(sendingConfig)
		console.log('email sent successfully')
	} catch (error) {
		console.log('email not sent!')
		console.log(error)
		return error
	}
}
