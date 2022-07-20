/* This file contains task-model configuration for mongodb database named task-manager-api*/

// importing mongoose
const mongoose = require('mongoose')

// importing validator for validating user input for various fields
const validator = require('validator')
const getDateTimeStamp = require('../utils/GetTimeStamp')

// configuring task-schema for task-model
const taskSchema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
		required: true,
	},
	description: {
		type: String,
		trim: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	createdOn: {
		type: String,
		default: getDateTimeStamp(),
	},
	lastModifiedOn: {
		type: String,
		default: getDateTimeStamp(),
	},
}, {
	timestamps:true
})

// initializing tasks collection with task-schema
// here 'Task' is collection name. Mongodb converts it to plural for and lowercase. i.e. 'tasks'
const Task = mongoose.model('Task', taskSchema)

// exporting task-model
module.exports = Task
