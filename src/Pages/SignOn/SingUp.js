import React, { useState } from 'react'

import Logo from '../../UI/Logo/Logo'
import Card from '../../UI/Card/Card'
import Button from '../../UI/Button/Button'
import FormFeedback from '../../UI/FormFeedback/FormFeedback'

import createUser from '../../components/API-CallHandler/Users-API/createUser'

import verifyPassword from '../../utils/passwordVerification'

import loadingGIF from '../../utils/Loading-Image/128x128.gif'

import './SignIn.css'

function SignUp() {
	const [userData, setUserData] = useState({
		name: '',
		email: '',
		password: '',
	})

	const [loadingState, setLoadingState] = useState(false)

	const singUpValChangeHandler = (event) => {
		const targetName = event.target.name
		const targetValue = event.target.value
		setUserData((prev) => {
			return { ...prev, [targetName]: targetValue }
		})
		if (feedBack) {
			setFeedBack({ h1: '', p: '' })
		}
	}

	const [feedBack, setFeedBack] = useState({
		h1: '',
		p: '',
	})

	const onSubmitHandler = () => {
		const mailRegEx = userData.email.match(
			/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
		)
		if (!mailRegEx) {
			return setFeedBack({
				h1: 'Seems like your email is not correct.',
				p: 'Please re-check and submit again🫠',
			})
		}
		if (userData.password && !verifyPassword(userData.password)) {
			return setFeedBack({
				h1: 'In-adequate password',
				p: 'Password must contain minimum eight characters with at least one letter, one number and one special character',
				isError: true,
			})
		}
		setLoadingState(true)
		createUser(userData)
			.then((res) => {
				setLoadingState(false)
				// console.log(res)
				if (res.data.error.message) {
					return setFeedBack({
						p: res.data.error.message.p,
						h1: res.data.error.message.h1,
						isError: true,
					})
				}
				return setFeedBack({
					h1: res.data.success.message.h1,
					p: res.data.success.message.p,
					isError: false,
				})
			})
			.catch((e) => {
				setLoadingState(false)
				setFeedBack({
					p: '500 : Server Error',
					h1: 'Something went wrong...😵',
					isError: false,
				})
			})
	}

	return (
		<form
			className="main-content sign-in-form"
			onSubmit={(event) => {
				event.preventDefault()
				onSubmitHandler()
			}}
		>
			<Logo
				imgStyles={{ width: '3rem' }}
				titleStyles={{ fontSize: '2rem' }}
			/>
			<Card>
				<div className="div-title">
					<h1>Create an Account</h1>
				</div>
				<label htmlFor="name">Name</label>
				<input
					type="text"
					name="name"
					value={userData.name}
					placeholder={'Name goes here...'}
					onChange={singUpValChangeHandler}
					autoFocus
					required
				/>
				<label htmlFor="username/email">Email</label>
				<input
					type="text"
					name="email"
					value={userData.email}
					placeholder={'EMail id goes here...'}
					onChange={singUpValChangeHandler}
					autoFocus
					required
				/>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					name="password"
					value={userData.password}
					placeholder={"Shhh.... Don't tell Anyone"}
					onChange={singUpValChangeHandler}
					autoFocus
					required
					minLength={8}
				/>
				<div className="sign-in-buttons-div">
					<Button type={'submit'} className={'btn btn-primary '}>
						Sign Up
					</Button>
				</div>
			</Card>
			<div className="sign-up-form__validation_div">
				{loadingState && (
					<img
						style={{ objectFit: 'contain', width: '60px' }}
						src={loadingGIF}
						alt="loading gif"
					/>
				)}
				{!loadingState && (
					<FormFeedback
						feedBack={feedBack}
						h1Style={
							feedBack.isError
								? { color: 'red' }
								: { color: 'greed' }
						}
						pStyle={{ color: 'gray' }}
					/>
				)}
			</div>
		</form>
	)
}
export default SignUp
