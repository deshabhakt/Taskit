import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../../../UI/Button/Button'

import deleteTasks from '../../API-CallHandler/Tasks-API/deleteTasks'
import getLengths from '../../API-CallHandler/Tasks-API/getNumberOfTasks'
import deleteUser from '../../API-CallHandler/Users-API/deleteUser'

import './DeleteThings.css'
const mapping = {
	'complete-tasks': 'complete',
	'incomplete-tasks': 'inComplete',
	'all-tasks': 'all',
}

const DeleteThings = ({ token, callbackForAccountDeletionUpdation }) => {
	const [numberOfTasks, setNumberOfTasks] = useState({
		complete: 0,
		inComplete: 0,
		all: 0,
	})

	const [thingToBeDeleted, setThingToBeDeleted] = useState()
	const [isDeletionConfirmed, setIsDeletionConfirmed] = useState(false)
	const navigate = useNavigate()

	const onDeleteInitimationHandler = (thingBeingDeleted) => {
		setThingToBeDeleted(thingBeingDeleted)
		setIsDeletionConfirmed(false)
	}

	const onDeleteConfirmationHandler = (isConfirm) => {
		if (isConfirm === false) {
			setThingToBeDeleted('')
			setIsDeletionConfirmed(false)
			return
		}
		deleteTasks(thingToBeDeleted, token)
			.then((res) => {
				setNumberOfTasks((prev) => {
					if (thingToBeDeleted === 'all-tasks') {
						return {
							complete: 0,
							inComplete: 0,
							all: 0,
						}
					}

					let totalLeftTasks =
						prev.all - prev[mapping[thingToBeDeleted]]
					totalLeftTasks = totalLeftTasks < 0 ? 0 : totalLeftTasks
					return {
						...prev,
						[mapping[thingToBeDeleted]]: 0,
						all: totalLeftTasks,
					}
				})
				if (numberOfTasks[mapping[thingToBeDeleted]] === 0) {
					setIsDeletionConfirmed('empty')
				} else {
					setIsDeletionConfirmed(true)
				}
			})
			.catch((e) => console.log(e))
	}

	useEffect(() => {
		setIsDeletionConfirmed(false)
		getLengths(token)
			.then((res) => {
				const lengths = res.data.success.data
				setNumberOfTasks(lengths)
			})
			.catch((e) => {
				console.log(e)
				setNumberOfTasks({
					complete: 'error',
					inComplete: 'error',
					all: 'error',
				})
			})
	}, [])

	// handling account deletion
	const onAccountDeleteConfirmationHandler = (isConfirm) => {
		if (isConfirm === false) {
			setThingToBeDeleted('')
			setIsDeletionConfirmed(false)
			return
		}
		deleteUser(token)
			.then((res) => {
				console.log(res)
				navigate('/logout')
			})
			.catch((e) => {
				console.log(e)
				setIsDeletionConfirmed('error')
			})
	}

	const commonProps = {
		thingToBeDeleted: thingToBeDeleted,
		isDeletionConfirmed: isDeletionConfirmed,
		onDeleteIntimationHandler: onDeleteInitimationHandler,
		onDeleteConfirmationHandler: onDeleteConfirmationHandler,
	}

	return (
		<div className="delete-things__main-div">
			<ItemToBeDelete
				id={'complete-tasks'}
				title={'Delete complete Tasks?'}
				description={`Total number of complete task ${numberOfTasks.complete}`}
				{...commonProps}
			/>

			<ItemToBeDelete
				id={'incomplete-tasks'}
				title={'Delete incomplete Tasks?'}
				description={`total number of complete task ${numberOfTasks.inComplete}`}
				{...commonProps}
			/>

			<ItemToBeDelete
				id={'all-tasks'}
				title={'Delete all Tasks?'}
				description={`Total number of complete task ${numberOfTasks.all}`}
				{...commonProps}
			/>
			<ItemToBeDelete
				id={'account'}
				title={'Delete my account?'}
				description={''}
				thingToBeDeleted={thingToBeDeleted}
				onDeleteIntimationHandler={onDeleteInitimationHandler}
				onDeleteConfirmationHandler={onAccountDeleteConfirmationHandler}
			/>
		</div>
	)
}

const ItemToBeDelete = ({
	id,
	title,
	description,
	thingToBeDeleted,
	isDeletionConfirmed,
	onDeleteIntimationHandler,
	onDeleteConfirmationHandler,
}) => {
	return (
		<div className="delete-things__item-to-be-deleted">
			<div className="delete-things__item-holder-div-1">
				<div>
					<h1>{title}</h1>
					<p>{description}</p>
				</div>
				<Button
					className="btn btn-danger delete-things__item-to-be-delete-btn"
					onClickHandler={() => {
						onDeleteIntimationHandler(id)
					}}
				>
					Yes
				</Button>
			</div>
			{thingToBeDeleted === id && (
				<DeleteConfirmation
					thingToBeDeleted={id}
					onClickHandler={onDeleteConfirmationHandler}
					isDeletionConfirmed={isDeletionConfirmed}
				/>
			)}
		</div>
	)
}

const DeleteConfirmation = ({
	thingToBeDeleted,
	onClickHandler,
	isDeletionConfirmed,
}) => {
	const split = thingToBeDeleted.split('-')
	let itemBeingDeleted = split[0]
	if (split.length === 2) {
		itemBeingDeleted += ' ' + split[1]
	}
	return (
		<div className="delete-things__confirmation-div">
			<h1>
				Do you really want to delete
				<strong style={{ color: 'red' }}> {itemBeingDeleted}</strong> ?
			</h1>
			<div>
				<Button
					className="btn btn-success delete-things__confirmation-btn-no"
					onClickHandler={() => onClickHandler(false)}
				>
					No! I don't want.
				</Button>
				<Button
					className="btn btn-danger delete-things__confirmation-btn-yes"
					onClickHandler={() => onClickHandler(true)}
				>
					Yes!
				</Button>
			</div>
			{isDeletionConfirmed === 'error' && (
				<h4
					style={{
						textAlign: 'center',
						color: 'red',
						fontSize: '1rem',
					}}
				>
					Something went wrong
				</h4>
			)}
			{isDeletionConfirmed === 'empty' && (
				<h4
					style={{
						textAlign: 'center',
						color: 'blue',
						fontSize: '1rem',
					}}
				>
					Nothing to delete
				</h4>
			)}
			{isDeletionConfirmed === true && (
				<h4
					style={{
						textAlign: 'center',
						color: 'green',
						fontSize: '1rem',
					}}
				>
					All {itemBeingDeleted} deleted successfully
				</h4>
			)}
		</div>
	)
}

export default DeleteThings
