// require('dotenv').config()
// importing express and initializing express-app
const express = require('express')
const app = express()

// initializing mongodb database connection
require('./db/mongoose')
const sendMail = require('./mailing/sendEmail')
// importing user and task collections routers
const userRouter = require('./routers/user-router')
const taskRouter = require('./routers/task-router')

// express.json() converts req.body into json format
// req.body is used during handling API-calls
app.use(express.json())

// setting up routers for user and task collection
app.use(userRouter)
app.use(taskRouter)

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header(
		'Access-Control-Allow-Headers',
		'Origin,Content-Type,Authorization,Accept,'
	)
	res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE')
	next()
})

app.get('/', (req, res) => {
	res.send('<h1>Server for <strong>Task!t app</strong></h1>')
})

// configuring port for runing server
const PORT = process.env.PORT
// starting server on configured port
app.listen(PORT, () => {
	console.log('Server Running on Port ' + PORT)
})
