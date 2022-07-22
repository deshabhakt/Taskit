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
	const [taskToBeEdited, setTaskToBeEdited] = useState()

	const [isCreateTask, setIsCreateTask] = useState(false)

	const [tasks, setTasks] = useState({
		complete: [],
		ongoing: [],
	})

	const [selectedTab, setSelectedTab] = useState('ongoing')
	const [errorObject, setErrorObject] = useState({
		h1: '',
		p: '',
	})

	const [loadingState, setLoadingState] = useState(false)

	const taskCreateHandler = (createdTask) => {
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

		// API call for storing task in database
		createTask(newTask, token).then(()=>{
			fetchTasksHelper()
		}).catch((e) => {
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
		const taskData = tasks[selectedTab].filter((ele, idx) => {
			return ele._id === id
		})[0]
		setTaskToBeEdited(taskData)
	}

	const taskCompletionToggleHandler = (id, toggledState) => {
		// API call to update the task in database
		editTask({ _id: id, completed: toggledState }, token)
		// handling frontend updation
		const nonSelectedTab =
			selectedTab === 'ongoing' ? 'complete' : 'ongoing'
		setTasks((prev) => {
			const toggledTask = prev[selectedTab].filter((ele, idx) => {
				return ele._id === id
			})[0]
			toggledTask.completed = toggledState
			// console.log('toggled task', toggledTask)
			const selecteTabTasks = prev[selectedTab].filter(
				(ele) => ele._id !== id
			)

			const nonSelectedTabTasks = [toggledTask, ...prev[nonSelectedTab]]
			return {
				[selectedTab]: selecteTabTasks,
				[nonSelectedTab]: nonSelectedTabTasks,
			}
		})
	}

	const taskEditDoneHandler = (editedTask) => {
		setToEdit(false)
		if (editedTask === undefined) {
			return
		}
		editedTask.lastModifiedOn = getDateTimeStamp()

		// handling frontend updation
		setTasks((prev) => {
			const filteredTasks = prev[selectedTab].filter((element, index) => {
				if (element._id === editedTask._id) {
					return false
				}
				return element
			})
			if (prev) {

				return {
					...prev,
					[selectedTab]: [editedTask, ...filteredTasks],
				}
			}
			const nonSelectedTab = selectedTab === 'ongoing' ? 'ongoing' : 'complete'
			return {
				[selectedTab]: [editedTask, ...filteredTasks],
				[nonSelectedTab]: []
			}
		})

		// API call to update the task in database
		editTask(editedTask, token).catch((e) => {
			return setErrorObject({
				h1: 'Something went wrong',
				p: 'Try refreshing...',
			})
		})
	}

	const deleteButtonClickHandler = (id) => {
		// handling deletion for frontend
		setTasks((prev) => {
			return {
				...prev,
				[selectedTab]: prev[selectedTab].filter((ele) => ele._id !== id)
			}
		})
		// API call for deleting task from database
		deleteTask(id, token).catch((e) => {
			// console.log(e)
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
				const fetchedTasks = res.data.tasks
				const ongoing = fetchedTasks.filter((ele, idx) => {
					return ele.completed === false
				})
				const complete = fetchedTasks.filter((ele, idx) => {
					return ele.completed === true
				})
				setTasks({ ongoing, complete })
			}
		})
	}
	useEffect(() => {
		if (
			!tasks.complete ||
			!tasks.ongoing ||
			tasks.complete.length === 0 ||
			tasks.ongoing.length === 0
		) {
			setErrorObject({
				h1: 'No tasks found',
				p: 'Start adding by clicking on + button',
				isError: false,
			})
		}
	}, [tasks, selectedTab])

	useEffect(() => {
		fetchTasksHelper()
	}, [token, selectedTab])

	return (
		<div
			className="main-content"
			style={{
				display: 'flex',
				flexDirection: 'column',
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
					scale: 1.1,
				}}
				className="add-note-btn"
				onClick={() => {
					setIsCreateTask(true)
				}}
			>+</motion.button>
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
				tasksList={
					selectedTab === 'ongoing' ? tasks.ongoing : tasks.complete
				}
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
