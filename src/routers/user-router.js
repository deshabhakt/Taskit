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
			// console.log('user saved and mail sent')
			res.status(201).send({
				message: 'User created successfylly',
				userdata: newUser,
				token,
			})
		})
	} catch (e) {
		// console.log(e)
		res.status(400).send(e)
	}
})

userRouter.get('/verify/', async (req, res) => {
	try {
		const email = req.query.email
		const verificationToken = req.query.token
		// console.log(req.query)
		const user = await User.findOne({ email })
		// console.log(user)
		if (!user) {
			res.send({ message: 'User Not Found', data: undefined })
		}
		const verificationStatus = user.verificationToken === verificationToken
		if (!verificationStatus) {
			res.send({ message: 'Verification link expired', data: undefined })
		}

		user.verified = true
		user.verificationToke = ''

		await user.save()

		const mail = verificationSuccessMail(user.name)

		sendMail(user.email, mail.subject, mail.body).then(() => {
			res.redirect('/success')
		})
	} catch (e) {
		// console.log(e)
		res.status(400).send(e)
	}
})

userRouter.get('/success', (req, res) => {
	res.send(
		`<div>
			<h1>Email Verification successful</h1>
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
		return res.status(400).send({ error: 'Invalid updates!' })
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

		res.send(req.user)
	} catch (e) {
		res.status(400).send(e)
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
		const token = await user.generateAuthToken()
		if (!user.verified) {
			const verificationLink =
				process.env.URL +
				`/verify?email=${newUser.email}&token=${token}`

			const email = verificationMail(user.name, verificationLink)
			sendMail(user.email, email.subject, email.body)
			return res.status(200).send({
				message: 'Verification Link sent Again!',
				data: undefined,
			})
		}

		return res.send({ authToken: token, userName: user.name })
	} catch (e) {
		res.status(500).send({
			error: e,
			message: 'Unable to log-in. Please check credentials.',
		})
	}
})

// route for logging out user
userRouter.post('/users/logout', auth, async (req, res) => {
	req.user.tokens = req.user.tokens.filter((token) => {
		return req.authToken !== token
	})
	await req.user.save()
	res.send({ message: 'Successfully Logged out of the devices.' })
})

// route for logging out user from all sessions
userRouter.post('/users/logoutAll', auth, async (req, res) => {
	req.user.tokens = []
	await req.user.save()
	res.send({ message: 'Successfully Logged out of all devices' })
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

// dummy API
userRouter.get('/users', async (req, res) => {
	const allUsers = await User.find()
	res.send({ data: allUsers })
})

// exporting user-router
module.exports = userRouter
