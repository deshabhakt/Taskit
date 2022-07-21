import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import getDateTimeStamp from '../../utils/GetTimeDate'

import Tabs from '../TasksDisplayer/Tabs'
import TabbedLayout from '../TasksDisplayer/TabbedLayout'
import EditTaskModal from '../Modals/EditTaskModal'
import CreateTaskModal from '../Modals/CreateTaskModal'

import './TasksHandler.css'
import fetchTasks from '../API-CallHandler/Tasks-API/fetchTasks'
import deleteTask from '../API-CallHandler/Tasks-API/deleteTask'
import editTask from '../API-CallHandler/Tasks-API/editTask'
import createTask from '../API-CallHandler/Tasks-API/createTask'

function TasksHandler({ token }) {
	const [toEdit, setToEdit] = useState(false)
	const [taskToBeEdited, setTaskToBeEdited] = useState({})

	const [isCreateTask, setIsCreateTask] = useState(false)

	const [tasks, setTasks] = useState()

	const [selectedTab, setSelectedTab] = useState('ongoing')
	const [errorObject, setErrorObject] = useState({
		h1: '',
		p: '',
	})

	const [loadingState, setLoadingState] = useState(false)

	const taskCreateHandler = (createdTask) => {
		setLoadingState(true)
		setIsCreateTask(false)
		setErrorObject({
			h1: '',
			p: '',
		})
		if (createdTask === undefined) {
			return
		}
		const newTask = {
			...createdTask,
			lastModifiedOn: getDateTimeStamp(),
			createdOn: getDateTimeStamp(),
		}
		// return
		createTask(newTask, token)
			.then((res) => {
				fetchTasksHelper()
			})
			.catch((e) => {
				setErrorObject({
					h1: 'Something went Wrong',
					p: '',
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
		setLoadingState(true)
		editTask({ _id: id, completed: toggledState }, token)
			.then((res) => {
				fetchTasksHelper()
			})
			.catch((e) => {
				setErrorObject({
					h1: 'Something went Wrong',
					p: '',
				})
			})
	}

	const taskEditDoneHandler = (editedTask) => {
		setLoadingState(true)
		setToEdit(false)
		if (editedTask === undefined) {
			return
		}
		editedTask.lastModifiedOn = getDateTimeStamp()

		editTask(editedTask, token)
			.then(() => {
				fetchTasksHelper()
			})
			.catch((e) => {
				return setErrorObject({
					h1: 'Something went Wrong',
					p: '',
				})
			})
	}

	const deleteButtonClickHandler = (id) => {
		setLoadingState(true)
		deleteTask(id, token)
			.then(() => {
				fetchTasksHelper()
				setLoadingState(false)
			})
			.catch((e) => {
				setErrorObject({
					h1: 'Something went Wrong',
					p: '',
				})
			})
	}
	const tasksHandler = (tasks) => {
		setTasks(tasks)
	}
	const fetchTasksHelper = async () => {
		setLoadingState(true)
		await fetchTasks(selectedTab, token).then((res) => {
			setLoadingState(false)
			// console.log(res)
			if (!res.data) {
				return setErrorObject({
					h1: 'Something went wrong',
					p: '500 | Unable to connect to server',
				})
			}
			if (res.data.errorMessage) {
				setErrorObject({ ...res.data.errorMessage.message })
				return tasksHandler([])
			} else {
				return tasksHandler(res.data.tasks)
			}
		})
	}

	useEffect(() => {
		fetchTasksHelper()
	}, [selectedTab, token])

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				marginTop: '4.5rem',
			}}
		>
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
				errorObject={errorObject}
				loadingState={loadingState}
			/>
		</div>
	)
}

export default TasksHandler
