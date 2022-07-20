import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import getDateTimeStamp from '../../utils/GetTimeDate'

import Tabs from '../TasksDisplayer/Tabs'
import TabbedLayout from '../TasksDisplayer/TabbedLayout'
import EditTaskModal from '../Modals/EditTaskModal'
import CreateTaskModal from '../Modals/CreateTaskModal'

import './TasksHandler.css'
import fetchDataFromServer from '../API-CallHandler/Tasks-API/fetchTasks'
import deleteTask from '../API-CallHandler/Tasks-API/deleteTask'
import editTask from '../API-CallHandler/Tasks-API/editTask'
import createTask from '../API-CallHandler/Tasks-API/createTask'

function TasksHandler({ token }) {
	const [toEdit, setToEdit] = useState(false)
	const [taskToBeEdited, setTaskToBeEdited] = useState({})

	const [isCreateTask, setIsCreateTask] = useState(false)

	const [tasks, setTasks] = useState()

	const [selectedTab, setSelectedTab] = useState('ongoing')

	const taskCreateHandler = (createdTask) => {
		setIsCreateTask(false)
		if (createdTask === undefined) {
			return
		}
		const newTask = {
			...createdTask,
			lastModifiedOn: getDateTimeStamp(),
			createdOn: getDateTimeStamp(),
		}
		createTask(newTask, token).then(() => {
			setTasks((prev) => {
				return [{ ...newTask, _id: Math.random() }, ...prev]
			})
		})
	}

	const selectedTabHandler = (tab) => {
		if (tab.toLowerCase() === 'complete') {
			setSelectedTab('complete')
		} else {
			setSelectedTab('ongoing')
		}
	}

	const editButtonClickHandler = (id) => {
		setToEdit(true)
		const taskData = tasks.filter((ele, idx) => {
			return ele._id === id
		})[0]
		setTaskToBeEdited({ taskData })
	}

	const taskCompletionToggleHandler = (id, toggledState) => {
		const newTimeStamp = getDateTimeStamp()
		editTask({ _id: id, completed: toggledState }, token).then(() => {
			const ele = tasks.filter((e, idx) => {
				return e._id === id
			})
			ele.completed = toggledState
			ele.lastModifiedOn = newTimeStamp

			setTasks((prev) => {
				return prev.filter((e, idx) => {
					return e._id !== id
				})
			})
		})
	}

	const taskEditDoneHandler = (editedTask) => {
		setToEdit(false)
		if (editedTask === undefined) {
			return
		}
		editedTask.lastModifiedOn = getDateTimeStamp()

		editTask(editedTask, token)
			.then(() => {
				const previousTask = tasks.filter((ele, idx) => {
					return ele._id === editedTask._id
				})[0]
				if (previousTask.completed === editedTask.completed) {
					setTasks((prev) => {
						return prev.filter((ele) => {
							return ele._id === editedTask._id ? editedTask : ele
						})
					})
				} else {
					setTasks((prev) => {
						return prev.filter((ele) => {
							return ele._id !== editedTask._id
						})
					})
				}
			})
			.catch((e) => console.log(e))
	}

	const deleteButtonClickHandler = (id) => {
		deleteTask(id, token)
			.then(() => {
				setTasks((prev) => {
					return prev.filter((ele, idx) => {
						return ele._id !== id
					})
				})
			})
			.catch((e) => {
				console.log(e)
			})
	}
	useEffect(() => {
		fetchDataFromServer(selectedTab, token)
			.then((res) => {
				setTasks((prev) => {
					return res.data.tasks
				})
			})
			.catch((e) => {
				console.log(e)
			})
	}, [selectedTab, tasks, token])

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<Tabs
				selectedTabHandler={selectedTabHandler}
				selectedTab={selectedTab}
			/>
			<motion.button
				initial={{ rotate: '45deg' }}
				animate={{ rotate: '0deg' }}
				transition={{ duration: 1 }}
				whileHover={{
					scale: 1.05,
				}}
				className="add-note-btn"
				onClick={() => {
					setIsCreateTask(true)
				}}
			>
				+
			</motion.button>
			{isCreateTask && (
				<CreateTaskModal taskCreateHandler={taskCreateHandler} />
			)}

			{toEdit && (
				<EditTaskModal
					taskToBeEdited={taskToBeEdited}
					taskEditDoneHandler={taskEditDoneHandler}
				/>
			)}
			<TabbedLayout
				tasksList={tasks}
				editButtonClickHandler={editButtonClickHandler}
				deleteButtonClickHandler={deleteButtonClickHandler}
				taskCompletionToggleHandler={taskCompletionToggleHandler}
			/>
		</div>
	)
}

export default TasksHandler
