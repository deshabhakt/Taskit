import React from 'react'

import { motion } from 'framer-motion'

import './TaskCard.css'

import editImage from '../../../utils/images/edit-button-favicon.png'
import deleteImage from '../../../utils/images/delete-button-favicon.png'
import checkedImage from '../../../utils/images/checked.png'
import unCheckedImage from '../../../utils/images/unchecked.png'

const TaskCard = ({
	task,
	index,
	editButtonClickHandler,
	deleteButtonClickHandler,
	taskCompletionToggleHandler,
}) => {
	const animation = {
		initialOpacity: 0,
		animateOpacity: 1,
		transitionDuration: index / 10,
	}

	return (
		<motion.div
			initial={{ opacity: animation.initialOpacity }}
			animate={{ opacity: animation.animateOpacity }}
			transition={{ duration: animation.transitionDuration }}
			className="task"
		>
			<div className="task-title">{task.title}</div>
			<hr style={{ margin: '4px 0px' }} />
			<div className="task-description">{task.description}</div>
			<div className="task-footer-div">
				<div className="task-timestamp">
					{/* <p> */}
					Last Modified: {task.lastModifiedOn}
					{/* </p> */}
				</div>
				<Buttons
					task={task}
					editButtonClickHandler={editButtonClickHandler}
					deleteButtonClickHandler={deleteButtonClickHandler}
					taskCompletionToggleHandler={taskCompletionToggleHandler}
				/>
			</div>
		</motion.div>
	)
}

const Checkbox = ({ task, taskCompletionToggleHandler }) => {
	return (
		<>
			{task.completed ? (
				<img
					onClick={() => {
						taskCompletionToggleHandler(task._id, false)
					}}
					src={checkedImage}
					alt="checked-button"
				/>
			) : (
				<img
					onClick={() => {
						taskCompletionToggleHandler(task._id, true)
					}}
					src={unCheckedImage}
					alt="un-checked-button"
				/>
			)}
		</>
	)
}

const Buttons = ({
	task,
	editButtonClickHandler,
	deleteButtonClickHandler,
	taskCompletionToggleHandler,
}) => {
	return (
		<div className="buttons-div">
			<Checkbox
				task={task}
				taskCompletionToggleHandler={taskCompletionToggleHandler}
			/>
			<img
				onClick={() => {
					editButtonClickHandler(task._id)
				}}
				src={editImage}
				alt="edit-button"
			/>

			<img
				onClick={() => {
					deleteButtonClickHandler(task._id)
				}}
				src={deleteImage}
				alt="delete-button"
			/>
		</div>
	)
}

export default TaskCard
