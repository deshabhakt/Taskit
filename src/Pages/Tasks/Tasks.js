import React from 'react'
import TasksHandler from '../../components/Tasks-Handler/TasksHandler'

import './Tasks.css'

function Tasks({ token, callBackForTasksLength }) {
	return (
		<>
			<TasksHandler
				token={token}
				callBackForTasksLength={callBackForTasksLength}
			/>
		</>
	)
}
export default Tasks
