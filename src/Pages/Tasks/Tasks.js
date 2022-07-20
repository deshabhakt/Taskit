import React from 'react'
import TasksHandler from '../../components/Tasks-Handler/TasksHandler'

import './Tasks.css'

function Tasks({ token }) {
	return (
		<>
			<TasksHandler token={token} />
		</>
	)
}
export default Tasks
