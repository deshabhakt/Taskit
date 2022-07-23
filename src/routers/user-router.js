/*
This file contains api-calls related to task-collection of task-manager-api database
These calls are configured as express router calls
*/

// importing express and initializing router for task-model related api calls
const express = require('express')
const userRouter = express.Router()

//importing sharp for handling image size (i.e. width and height)
const sharp = require('sharp')

// importing users-model from ../models/user-model
const User = require('../models/user-model')

// importing authenticator middleware
const auth = require('../middleware/authentication')

// importing uploadAvatarValidator middleware for validating fileuploads
const uploadAvatarValidator = require('../middleware/uploadAvatarValidator')

// mailing helpers
const {
	verificationMail,
	verificationSuccessMail,
	resetPasswordVerificationMail,
	passwordChangeMail,
} = require('../mailing/mails')

const sendMail = require('../mailing/sendEmail')

// setting up headers
userRouter.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header(
		'Access-Control-Allow-Headers',
		'Origin,Content-Type,Authorization,Accept,'
	)
	res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE')
	next()
})

// create user api call
userRouter.post('/users', async (req, res) => {
	try {
		const exists = await User.find({ email: req.body.email })
		// console.log(exists)
		if (exists && exists.length > 0) {
			return res.send({
				error: {},
				success: {
					message: {
						h1: 'User already exists',
						p: 'Try Logging In',
					},
					status: 201,
				},
			})
		}

		const newUser = new User({
			...req.body,
			verification: false,
		})

		const token = await newUser.generateAuthToken()

		const verificationLink =
			process.env.URL + `/verify?email=${newUser.email}&token=${token}`
		const mail = verificationMail(newUser.name, verificationLink)

		newUser.verificationToken = token

		await newUser.save()

		sendMail(newUser.email, mail.subject, mail.body).then(() => {
			// // console.log('user saved and mail sent')
			return res.send({
				error: {},
				success: {
					message: {
						h1: 'Verification mail sent successfully',
						p: 'Do check spam folder',
					},
					userdata: newUser,
					token,
					status: 201,
				},
			})
		})
	} catch (e) {
		// console.log(e)
		res.send({
			error: {
				message: {
					h1: 'Failed to create Account',
					p: '',
				},
				status: 400,
			},
			success: {},
		})
	}
})

userRouter.post('/users/forgotpassword', async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email })
		// console.log(user)
		if (!user) {
			res.send({
				error: {
					message: { h1: 'Email not found.', p: 'Try Signing Up In' },
					status: 404,
				},
				success: {},
			})
		}
		const token = await user.generateAuthToken()

		const verificationLink =
			process.env.URL +
			`/reset-password-token-validation?email=${user.email}&token=${token}`

		const mail = resetPasswordVerificationMail(user.name, verificationLink)

		user.verificationToken = token
		await user.save()

		sendMail(user.email, mail.subject, mail.body).then(() => {
			res.send({
				error: {},
				success: {
					message: {
						h1: 'Password reset mail sent successfully.',
						p: 'Do check spam folder',
					},
					status: 400,
				},
			})
		})
	} catch (e) {
		// console.log(e)
		res.send({
			error: {
				message: {
					h1: 'Something went wrong...',
					p: '',
				},
				status: 400,
			},
			success: {},
		})
	}
})

userRouter.get('/reset-password-token-validation', async (req, res) => {
	try {
		const email = req.query.email
		const verificationToken = req.query.token
		const user = await User.findOne({ email })
		if (!user) {
			return res.send({
				error: {
					message: {
						h1: 'User not found',
						p: 'Try siging up',
					},
					status: 404,
				},
				success: {},
			})
		}
		const isTokenValid = user.verificationToken === verificationToken
		if (!verificationToken) {
			user.verificationToken = 'invalid'
			await user.save()
			return res.redirect(
				process.env.FRONTEND_URL +
					`/forgotpassword?email=${email}&resetToken=invalid`
			)
		}
		user.verificationToken = 'valid'
		await user.save()
		res.redirect(
			process.env.FRONTEND_URL +
				`/resetpassword?email=${email}&resetToken=valid`
		)
	} catch (e) {
		// console.log(e)
		res.redirect(
			process.env.FRONTEND_URL +
				`/forgotpassword?email=${email}&resetToken=error`
		)
	}
})

userRouter.patch('/resetpassword', async (req, res) => {
	try {
		const email = req.body.email
		const newPassword = req.body.password
		const user = await User.findOne({ email })

		if (!user) {
			return res.send({
				error: {
					message: {
						h1: 'User not found',
						p: 'Try siging up',
					},
					status: 404,
				},
				success: {},
			})
		}

		const isTokenValid = user.verificationToken === 'valid'

		if (!isTokenValid) {
			return res.redirect(
				process.env.FRONTEND_URL + '/forgotpassword?resetToken=invalid'
			)
		}
		if (!user.verified) {
			user.verified = true
		}
		user.password = newPassword
		await user.save()

		const mail = passwordChangeMail(user.name)

		sendMail(user.email, mail.subject, mail.body).then(() => {
			res.send({
				error: {},
				success: {
					message: {
						h1: 'Password Changed Successfully',
						p: '',
					},
					status: 400,
				},
			})
		})
	} catch (e) {
		// console.log(e)
		res.send({
			error: {
				message: {
					h1: 'Something went wrong...',
					p: '',
				},
				status: 404,
			},
			success: {},
		})
	}
})

userRouter.get('/verify', async (req, res) => {
	try {
		const email = req.query.email
		const verificationToken = req.query.token
		// // console.log(req.query)
		const user = await User.findOne({ email })
		// // console.log(user)
		if (!user) {
			return res.send({
				error: {
					message: {
						h1: 'User not found',
						p: 'Try siging up.',
					},
					status: 404,
				},
				success: {},
			})
		}
		const verificationStatus = user.verificationToken === verificationToken
		if (!verificationStatus) {
			const token = await user.generateAuthToken()

			const verificationLink =
				process.env.URL + `/verify?email=${user.email}&token=${token}`
			const mail = verificationMail(user.name, verificationLink)

			user.verificationToken = token
			await user.save()

			return sendMail(user.email, mail.subject, mail.body).then(() => {
				res.send({
					error: {
						message: {
							h1: 'Verification Link Expired',
							p: 'Verification link is sent again.<br/>Please verify your account to continue',
						},
						status: 404,
					},
					success: {},
				})
			})
		}

		user.verified = true
		user.verificationToken = ''

		await user.save()

		const mail = verificationSuccessMail(user.name)

		sendMail(user.email, mail.subject, mail.body).then(() => {
			const title = 'Email verification successful'
			return res.redirect('/success?title=' + title)
		})
	} catch (e) {
		// console.log(e)
		res.send({
			error: {
				message: {
					h1: 'Something went wrong...',
					p: 'Please try again',
				},
				status: 404,
			},
			success: {},
		})
	}
})

userRouter.get('/success', (req, res) => {
	// console.log(req.query.title)
	res.send(
		`<div>
			<h1>${req.query.title}</h1>
			<a href='${process.env.FRONTEND_URL}/signin'>
				<h1>Login here</h1>
			</a>
		</div>`
	)
})

// get user profile api call
userRouter.get('/users/me', auth, (req, res) => {
	res.send(req.user)
})

// updating user by id api call
userRouter.patch('/users/me', auth, async (req, res) => {
	const updates = Object.keys(req.body)
	const allowedUpdates = ['name', 'email', 'password', 'age']

	const isValid = updates.every((update) => allowedUpdates.includes(update))
	if (!isValid) {
		return res.send({
			error: {
				message: {
					h1: 'Invalid Update',
					p: '',
				},
				status: 400,
			},
			success: {},
		})
	}

	try {
		// const user = await User.findByIdAndUpdate(
		//     req.params.id,
		//     req.body,
		//     { new: true, runValidators: true }
		// )
		// using findByIdAndUpdate sometime does not trigger schemaname.pre or schemaname.post middleware
		// so we modify it as below

		updates.forEach((update) => {
			req.user[update] = req.body[update]
		})

		await req.user.save()

		res.send({
			error: {},
			success: {
				message: {
					h1: 'Data updated Successfully',
					p: '',
				},
				data: req.user,
				status: 200,
			},
		})
	} catch (e) {
		res.send({
			error: {
				message: {
					h1: 'Something went wrong',
					p: '500 | Server Error',
				},
				status: 500,
			},
			success: {},
		})
	}
})

// deleting user by id api call
userRouter.delete('/users/me', auth, async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.user._id)

		await user.remove()
		res.send({
			message: 'User deleted successfully.',
			data: req.user,
		})
	} catch (e) {
		res.status(400).send(e)
	}
})

// route for logging in user
userRouter.post('/users/login', async (req, res) => {
	try {
		const user = await User.findByCredentials(
			req.body.email,
			req.body.password
		)
		// console.log(user)

		const token = await user.generateAuthToken()
		if (!user.verified) {
			const verificationLink =
				process.env.URL + `/verify?email=${user.email}&token=${token}`

			const email = verificationMail(user.name, verificationLink)
			await sendMail(user.email, email.subject, email.body)
			// // console.log(user)
			return res.send({
				error: {
					verificationStatus: user.verified,
					message: {
						h1: 'Account Not Verified!',
						p: ' Verification Link sent Again. Do check spam folder',
					},
				},
				success: {},
			})
		}

		res.send({
			error: {},
			success: {
				status: 200,
				authToken: token,
				userName: user.name,
				verificationStatus: user.verified,
				message: {
					h1: 'Login Successful',
					p: '',
				},
			},
		})
	} catch (e) {
		// console.log(e)
		if (e.creds === 'wrong') {
			return res.send({
				error: {
					message: {
						h1: 'Unable to log-in',
						p: 'Please check credentials',
					},
					status: 404,
				},
				success: {},
			})
		}
		if (!e.userFound) {
			return res.send({
				error: {
					message: {
						h1: 'User not found',
						p: '',
					},
					status: 404,
				},
				success: {},
			})
		}
		return res.send({
			error: {
				message: {
					h1: 'Something went wrong...',
					p: 'Do try again and problem still persists ping us!',
				},
				status: 500,
			},
			success: {},
		})
	}
})

// route for logging out user
userRouter.post('/users/logout', auth, async (req, res) => {
	req.user.tokens = req.user.tokens.filter((token) => {
		return req.authToken !== token
	})
	await req.user.save()
	res.send({
		error: {},
		success: {
			message: { h1: 'Successfully Logged out of the device.', p: '' },
			status: 200,
		},
	})
})

// route for logging out user from all sessions
userRouter.post('/users/logoutAll', auth, async (req, res) => {
	req.user.tokens = []
	await req.user.save()
	res.send({
		error: {},
		success: {
			message: { h1: 'Successfully Logged out of all devices.', p: '' },
			status: 200,
		},
	})
})

// router for uploading avatar
userRouter.post(
	'/users/me/avatar',
	auth,
	uploadAvatarValidator.single('avatar'), // here avatar is query name send with request
	async (req, res) => {
		const buffer = await sharp(req.file.buffer)
			.resize({ width: 250, height: 250 })
			.png()
			.toBuffer()

		req.user.avatar = buffer
		await req.user.save()
		res.send()
	},
	(error, req, res, next) => {
		res.status(400).send({ error: error.message })
	}
)

// router for fetching avatar
userRouter.get('/users/:id/avatar', async (req, res) => {
	try {
		const user = await User.findById(req.params.id)
		if (!user || !user.avatar) {
			throw new Error('Invalid Request')
		}
		res.set('Content-Type', 'image/png')
		res.send(user.avatar)
	} catch (error) {
		res.status(400).send({ error })
	}
})

// route for deleting an avatar
userRouter.delete('/users/me/avatar', auth, async (req, res) => {
	req.user.avatar = undefined
	await req.user.save()
	res.send()
})

// exporting user-router
module.exports = userRouter
