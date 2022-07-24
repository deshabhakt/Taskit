/* This file contains code for initialization of mongodb database connection*/

// importing mongoose
const mongoose = require('mongoose')

// name of the mongodb database
// const databaseName = process.env.DB_NAME
// initializing connection with mongodb database

const connection = mongoose.connect(process.env.DB_URL, {
	useNewUrlParser: true,
})
connection.then((res) => {
	console.log('database connected successfully.')
})


