import React, { useEffect, useState } from 'react'

import fetchUserDetails from '../../API-CallHandler/Users-API/fetchUserDetails'

import Button from '../../../UI/Button/Button'
import './MyProfile.css'

const MyProfile = ({ token }) => {
	const [userInfo, setUserInfo] = useState({
		name: 'username',
		email: 'user@mail.com',
	})

	const [backupUserInfo, setBackupUserInfo] = useState()

	const [toEdit, setToEdit] = useState(false)

	useEffect(() => {
		fetchUserDetails(token)
			.then((res) => {
				setUserInfo({
					name: res.data.name,
					email: res.data.email,
				})
				setBackupUserInfo({
					name: res.data.name,
					email: res.data.email,
				})
			})
			.catch((e) => {
				setUserInfo({
					name: 'something went wrong',
					email: 'something went wrong',
				})
			})
	}, [])

	return (
		<div className="my-profile__main-div">
			<h1 className="my-profile__user-info-title">User Information</h1>
			{!toEdit ? (
				<div className="my-profile__user-info">
					<div>
						<label htmlFor="name" className="my-profile__labels">
							Name
						</label>
						<h1 id="name">{userInfo.name}</h1>
					</div>
					<div>
						<label
							htmlFor="email"
							className="my-profile__labels"
							id="my-profile__email-label"
						>
							Email
						</label>
						<h1 id="email">{userInfo.email}</h1>
					</div>
				</div>
			) : (
				<div className="my-profile__user-info">
					<div>
						<label htmlFor="name" className="my-profile__labels">
							Name
						</label>
						<input type="text" value={userInfo.name} id="name" />
					</div>
					<div>
						<label
							htmlFor="email"
							className="my-profile__labels"
							id="my-profile__email-label"
						>
							Email*
						</label>
						<h1 id="email">{userInfo.email}</h1>
						{/* <input type="email" value={userInfo.email} id="email" /> */}
					</div>
				</div>
			)}
			<div className="my-profile__buttons-div">
				<Button
					className={
						'my-profile__button ' +
						(!toEdit
							? 'my-profile__button-edit-inactive'
							: 'my-profile__button-edit-active')
					}
					onClickHandler={() => {
						setToEdit((prev) => !prev)
					}}
				>
					Edit
				</Button>
				{toEdit && (
					<Button
						onClick={() => {}}
						className="btn btn-success my-profile__button"
					>
						Submit
					</Button>
				)}
			</div>
			{toEdit && (
				<p
					style={{
						padding: '2rem',
						color: 'blue',
						textAlign: 'center',
					}}
				>
					<em>*Changing email is currently disabled</em>
				</p>
			)}
		</div>
	)
}

export default MyProfile
