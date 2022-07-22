import React, { useState } from 'react'

import forgotPassword from '../../components/API-CallHandler/Users-API/forgotPassword'

import Logo from '../../UI/Logo/Logo'
import Card from '../../UI/Card/Card'
import Button from '../../UI/Button/Button'

import loadingGIF from '../../utils/Loading-Image/128x128.gif'

import './SignIn.css'
import FormFeedback from '../../UI/FormFeedback/FormFeedback'

const ForgotPassword = () => {
	const [email, setEmail] = useState('')
	const [loadingState, setLoadingState] = useState(false)
	const [feedBack, setFeedBack] = useState({
		h1: '',
		p: '',
		isError: false,
	})

	const onSubmitHandler = (event) => {
		event.preventDefault()
		setLoadingState(true)
		forgotPassword({ email })
			.then((res) => {
				setLoadingState(false)
				if (res.data.error.message) {
					return setFeedBack({
						h1: res.data.error.message.h1,
						p: res.data.error.message.p,
						isError: true,
					})
				}
				if (res.data.success) {
					setFeedBack({
						h1: res.data.success.message.h1,
						p: res.data.success.message.p,
						isError: false,
					})
				}
				// console.log('res', res.data.success, res.data.error)
			})
			.catch((e) => {
				console.log(e)
				return setFeedBack({
					h1: 'Something went wrong',
					p: '',
					isError: true,
				})
			})
	}

	return (
		<form className="main-content sign-in-form" onSubmit={onSubmitHandler}>
			<Logo
				imgStyles={{ width: '3rem' }}
				titleStyles={{ fontSize: '2rem' }}
			/>
			<Card>
				<div className="div-title">
					<h1>Reset Password</h1>
				</div>
				<label htmlFor="email">Email</label>
				<input
					type="text"
					name="email"
					value={email}
					onChange={(event) => {
						setEmail((prev) => event.target.value)
					}}
					required
					autoFocus
					placeholder="Enter registered mail"
				/>
				<Button
					className="btn btn-success reset-password-btn"
					type={'submit'}
				>
					Request verification code
				</Button>
			</Card>
			<div className="sign-up-form__validation_div">
				{loadingState && (
					<img
						style={{ objectFit: 'contain', width: '90px' }}
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
								: { color: 'green' }
						}
						pStyle={{ color: 'gray' }}
					/>
				)}
			</div>
		</form>
	)
}
export { ForgotPassword }
