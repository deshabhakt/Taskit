import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Logo from '../../UI/Logo/Logo'
import Card from '../../UI/Card/Card'
import Button from '../../UI/Button/Button'
import loginUser from '../../components/API-CallHandler/Users-API/loginUser'
import FormFeedback from '../../UI/FormFeedback/FormFeedback'

import loadingGIF from '../../utils/Loading-Image/128x128.gif'

import './SignIn.css'

function SignIn({ signInHandler }) {
	const [loginData, setLoginData] = useState({
		email: '',
		password: '',
	})
	const [loadingState, setLoadingState] = useState(false)
	const [feedBack, setFeedBack] = useState({
		h1: '',
		p: '',
		isError: '',
	})

	const navigate = useNavigate()

	const setloginDataHelper = (event) => {
		const targetName = event.target.name
		const targetValue = event.target.value
		setLoginData((prev) => {
			return { ...prev, [targetName]: targetValue }
		})
	}
	const loginHandler = (event) => {
		event.preventDefault()
		setLoadingState(true)
		setFeedBack({ h1: '', p: '' })
		loginUser(loginData)
			.then((res) => {
				// console.log(res)
				setLoadingState(false)
				if (res.data.error.message) {
					return setFeedBack({
						h1: res.data.error.message.h1,
						p: res.data.error.message.p,
						isError: true,
					})
				}

				const { authToken, userName, message, verificationStatus } =
					res.data.success
				if (!verificationStatus) {
					setFeedBack({
						h1: message.h1,
						p: message.p,
					})
					return
				}

				signInHandler(authToken, userName)
			})
			.catch((e) => {
				setLoadingState(false)
				setFeedBack({
					h1: 'Something went wrong...',
					p: '500 : Server Error',
				})
				signInHandler(null)
			})
	}

	return (
		<form
			className="main-content sign-in-form"
			onSubmit={(event) => {
				loginHandler(event)
			}}
		>
			<Logo
				imgStyles={{ width: '3rem' }}
				titleStyles={{ fontSize: '2rem' }}
			/>
			<Card>
				<div className="div-title">
					<h1>Sign In</h1>
				</div>
				<label htmlFor="email">Email</label>
				<input
					type="text"
					name="email"
					value={loginData.email}
					onChange={setloginDataHelper}
					required
					autoFocus
				/>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					name="password"
					value={loginData.password}
					onChange={setloginDataHelper}
					required
					autoFocus
				/>
				<div className="sign-in-buttons-div">
					<Button
						className="btn btn-primary"
						onClickHandler={() => {
							navigate('/signup', { replace: true })
						}}
					>
						Sing Up
					</Button>
					<Button className="btn btn-success" type={'submit'}>
						Sign In
					</Button>
				</div>
				<a style={{ textAlign: 'center' }} href="/forgotpassword">
					Forgot Password?
				</a>
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
export default SignIn
