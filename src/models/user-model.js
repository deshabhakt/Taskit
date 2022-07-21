/* This file contains user-model configuration for mongodb database named task-manager-api*/

// importing mongoose
const mongoose = require('mongoose')

// importing validator for validating user input for various fields
const validator = require('validator')

// importing bcrypt from bcryptjs to hash passwords
const bcrypt = require('bcryptjs')

// importing jwt from jsonwebtoke for generating authentication tokens
const jwt = require('jsonwebtoken')

// importing Tasks model
const Task = require('../models/task-model')

const getDateTimeStamp = require('../utils/GetTimeStamp')

// schema for User model
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('Invalid Email.')
			}
		},
	},
	age: {
		type: Number,
		default: 0,
		validate(value) {
			if (value < 0) {
				throw new Error('Invalid age!')
			}
		},
	},
	password: {
		type: String,
		required: true,
		trim: true,
		validate(value) {
			if (value.includes('password') == true) {
				throw new Error('Very generic password! Try something new:)')
			}
			if (value.length <= 7) {
				throw new Error('Password should be longer than 7 characters')
			}
		},
	},
	tokens: [
		{
			token: {
				type: String,
				required: true,
			},
		},
	],
	avatar: {
		type: Buffer,
	},
	createdOn: {
		type: String,
		default: getDateTimeStamp(),
	},
	lastModifiedOn: {
		type: String,
		default: getDateTimeStamp(),
	},
	verified: {
		type: Boolean,
		default: false,
	},
	verificationToken: {
		type: String,
		expire: 600,
		default: '',
	},
})

// setting up virtual schema for connecting tasks with user

userSchema.virtual('tasks', {
	ref: 'Task',
	localField: '_id',
	foreignField: 'owner',
})

// function for hiding passwords and tokens from user
userSchema.methods.toJSON = function () {
	const user = this.toObject()

	delete user.password
	delete user.tokens
	delete user.avatar

	return user
}

// defining custom function on objects of user-schema for generating authentication tokens
userSchema.methods.generateAuthToken = async function () {
	const user = this
	const token = jwt.sign(
		{ _id: user._id.toString() },
		process.env.JWT_SECRECT
	)

	user.tokens = user.tokens.concat({ token })
	await user.save()
	return token
}

// defining custom function on user-schema for checking user credentials
userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email })
	if (!user) {
		throw {
			userFound: false,
		}
	}

	const isMatch = await bcrypt.compare(password, user.password)

	if (!isMatch) {
		throw {
			creds: 'wrong',
		}
	}

	return user
}

// do not use arrow function after 'save'
userSchema.pre('save', async function (next) {
	const user = this

	// password will be modified when the user is created and when the user updates their password
	if (user.isModified('password')) {
		console.log('password modified so re-hashing')
		user.password = await bcrypt.hash(user.password, 8)
	}

	next()
})

// middleware for deleting tasks when a user is deleted
userSchema.pre('remove', async function (next) {
	const user = this

	await Task.deleteMany({ owner: user._id })
	next()
})

// initalizing user model using user-schema
const User = mongoose.model(
	'User',
	userSchema // here 'User' is collection name. Mongodb converts it to plural for and lowercase. i.e. 'users'
)

// exporting User model
module.exports = User
