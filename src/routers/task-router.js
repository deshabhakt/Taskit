/* 
This file contains api-calls related to task-collection of task-manager-api database
These calls are configured as express router calls
*/

// importing express and initializing router for task-model related api calls
const express = require('express')
const taskRouter = express.Router()

// importing tasks-model from models/task-model
const Task = require('../models/task-model')

// importing authenticator middleware
const auth = require('../middleware/authentication')
const getDateTimeStamp = require('../utils/GetTimeStamp')

taskRouter.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header(
		'Access-Control-Allow-Headers',
		'Origin,Content-Type,Authorization,Accept,'
	)
	res.header(
		'Access-Control-Allow-Methods',
		'GET,POST,PATCH,DELETE'
	)
	next()
})

// create task api call
taskRouter.post('/tasks', auth, async (req, res) => {
	try {
		const newTask = new Task({
			...req.body,
			owner: req.user._id, // associating owner with task by using owner id
		})

		await newTask.save()
		res.status(201).send({
			message: 'Task created successfylly',
			data: newTask,
		})
	} catch (e) {
		res.status(400).send(e)
	}
})

// get all tasks api call
/*
query params
filtering: /tasks?completed=true
Paging   : /tasks?limit=1&skip=1   skip==> how many documents i.e. data entries should be skipped
sorting  : /tasks?sortBy=createdAt_   
In sorting we use 
_ -> for sorting in descending order (this is passed as -1 to database options)
(no _) -> for sorting in asending order(this is passed as 1 to database options)
*/
taskRouter.get('/tasks', auth, async (req, res) => {
	const match = {} // for filtering
	if (req.query.completed) {
		match.completed =
			(req.query.completed === 'True' || req.query.completed === 'true')
	}
	const sort = {} // for paging and sorting
	if (req.query.sortBy) {
		const parts = req.query.sortBy.split(':')
		sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
	}

	try {
		await req.user.populate({
			path: 'tasks',
			match,
			options: {
				limit: parseInt(req.query.limit),
				skip: parseInt(req.query.skip),
				sort,
			},
		})
		const data = req.user.tasks
		// console.log(data)
		// // alternative to above code is
		// await req.user.populate('tasks').execPopulate()
		// // both the above lines work same

		if (!data || data.length === 0) {
			return res.status(200).send({ error: 'No tasks Found',tasks:[] })
		}

		res.send({tasks:data})
	} catch (e) {
		res.status(500).send({ error: 'something went wrong' })
	}
})

// get task by id api call
taskRouter.get('/tasks/:id', auth, async (req, res) => {
	try {
		const _id = req.params.id
		const data = await Task.findOne({ _id, owner: req.user._id })
		if (!data) {
			return res.status(404).send({ error: 'Task not found' })
		}
		res.status(302).send({ data })
	} catch (e) {
		res.status(404).send(e)
	}
})

// update task by id api call
taskRouter.patch('/tasks/:id', auth, async (req, res) => {
	const id = req.params.id
	const changes = req.body.changes
	const updates = Object.keys(changes)
	const allowedUpdates = ['title', 'description', 'completed','lastModifiedOn']

	const isValid = updates.every((update) => allowedUpdates.includes(update))

	if (!isValid) {
		return res.status(400).send()
	}
	try {
		// const task = await Task.findByIdAndUpdate(
		//     req.params.id,
		//     req.body,
		//     { new: true, runValidators: true }
		// )
		// above code (i.e. findByIdAndUpdate function) sometimes fail to trigger mongoose middleware (a function applied on model schema)
		// that's why we use following code

		const task = await Task.findOne({
			_id: id,
			owner: req.user._id,
		})
		if (!task) {
			return res.status(200).send({ message: 'Task not found',data:undefined })
		}

		updates.forEach((update) => {
			task[update] = changes[update]
		})
		// updates.lastModifiedOn = getDateTimeStamp()
		await task.save()

		res.send({message:'Task found',data:task})
	} catch (e) {
		res.status(400).send(e)
	}
})

// deleting task by id api call
taskRouter.delete('/tasks/:id', auth, async (req, res) => {
	try {
		const task = await Task.findOne({
			_id: req.params.id,
			owner: req.user._id,
		})

		// console.log('task found',task)

		if (!task) {
			return res.status(200).send({ message: 'Task not found',data:undefined })
		}

		await task.remove()

		res.send({
			message: 'Task deleted successfully.',
			data: task,
		})
	} catch (e) {
		res.status(400).send(e)
	}
})

// dummy routes

// dummytasks inserter
taskRouter.post('/insertdummies', auth, async (req, res) => {
	try {

		const dummyTasks = []
		for (let i = 0; i < 10; i++) {
			dummyTasks.push({
				title: 'This is task ' + (i + 1),
				description: 'This is description for task ' + (i + 1),
				completed: i % 2 === 0,
				owner:req.user._id
			})
		}
		
		await Task.insertMany(dummyTasks)
		res.status(201).send({
			message: 'Tasks created successfylly',
			data: dummyTasks,
		})
	} catch (e) {
		res.status(400).send(e)
	}
})



// exporting taskRouter
module.exports = taskRouter
