import React from 'react'

import TaskCard from './TaskCard/TaskCard'
import loadingGIF from '../../utils/Loading-Image/128x128.gif'

import './TabbedLayout.css'

const TabbedLayout = ({
	tasksList,
	errorObject,
	loadingState,
	editButtonClickHandler,
	deleteButtonClickHandler,
	taskCompletionToggleHandler,
}) => {
	return (
		<>
			{tasksList !== undefined &&
			tasksList.length > 0 &&
			!loadingState ? (
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
				<>
					{loadingState && (
						<div className="no-tasks-found-div">
							<img
								style={{ objectFit: 'contain', width: '90px' }}
								src={loadingGIF}
								alt="loading gif"
							/>
						</div>
					)}
					{!loadingState && errorObject.h1 !== '' && (
						<div className="no-tasks-found-div">
							<h1>{errorObject.h1}</h1>
							<p>{errorObject.p}</p>
						</div>
					)}
				</>
			)}
		</>
	)
}
export default TabbedLayout
