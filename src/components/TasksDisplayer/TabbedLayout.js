import React from 'react'

import TaskCard from './TaskCard/TaskCard'

import './TabbedLayout.css'

const TabbedLayout = ({
	tasksList,
	editButtonClickHandler,
	deleteButtonClickHandler,
	taskCompletionToggleHandler,
}) => {
	return (
		<>
			{tasksList !== undefined && tasksList.length > 0 ? (
				<div className="tabbed-layout">
					{tasksList.map((task, index) => {
						return (
							<TaskCard
								key={task._id}
								task={task}
								index={index}
								editButtonClickHandler={editButtonClickHandler}
								deleteButtonClickHandler={
									deleteButtonClickHandler
								}
								taskCompletionToggleHandler={
									taskCompletionToggleHandler
								}
							/>
						)
					})}
				</div>
			) : (
				<h1 className="no-tasks-found-div">No Tasks Found</h1>
			)}
		</>
	)
}
export default TabbedLayout
