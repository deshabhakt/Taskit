import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Logo from '../../UI/Logo/Logo'
import Card from '../../UI/Card/Card'
import Button from '../../UI/Button/Button'
import FormFeedback from '../../UI/FormFeedback/FormFeedback'
import resetPassword from '../../components/API-CallHandler/Users-API/resetPassword'

import loadingGIF from '../../utils/Loading-Image/128x128.gif'

import './SignIn.css'

const getQueryParamsFromQueryString = (queryString) => {
	const queryParams = {}
	const queryStringSplited = queryString.slice(1).split('&')
	for (let i = 0; i < queryStringSplited.length; i++) {
		const _strarr = queryStringSplited[i].split('=')
		queryParams[_strarr[0]] = _strarr[1]
	}
	return queryParams
}

function ResetPassword() {
	const [password, setPassword] = useState({
		password1: '',
		password2: '',
	})

	const [loadingState, setLoadingState] = useState(false)
	const [feedBack, setFeedBack] = useState({
		h1: '',
		p: '',
		isError: false,
	})

	const [queryParams, setQueryParams] = useState()

	const navigate = useNavigate()

	const setPasswordHelper = (event) => {
		const name = event.target.name
		const value = event.target.value
		setPassword((prev) => {
			return { ...prev, [name]: value }
		})
		if (feedBack.h1.length !== 0 || feedBack.p.length) {
			setFeedBack({
				h1: '',
				p: '',
				isError: false,
			})
		}
	}
	const onSubmitHandler = (event) => {
		event.preventDefault()
		if (password.password1 !== password.password2) {
			setFeedBack({
				h1: 'Both passwords should be same',
				p: '',
				isError: true,
			})
			return
		}
		setLoadingState(true)
		const payload = {
			password: password.password1,
			email: queryParams.email,
		}
		resetPassword(payload).then((res) => {
			setLoadingState(false)
			if (res.data.error.message) {
				return setFeedBack({
					h1: res.data.error.message.h1,
					p: res.data.error.message.p,
					isError: true,
				})
			}

			return navigate('/signin')
		})
	}

	const location = useLocation().search
	useEffect(() => {
		const params = getQueryParamsFromQueryString(location)
		if (!params.resetToken) {
			return navigate('/signin')
		}
		if (params.resetToken === 'invalid') {
			return navigate('/forgotpassword')
		}
		setQueryParams(params)
		// console.log(params)
	}, [])

	return (
		<form
			className="sign-in-form"
			onSubmit={(event) => {
				onSubmitHandler(event)
			}}
		>
			<Logo
				imgStyles={{ width: '3rem' }}
				titleStyles={{ fontSize: '2rem' }}
			/>
			<Card>
				<div className="div-title">
					<h1>Reset Password</h1>
				</div>
				<label htmlFor="password1">Password</label>
				<input
					type="password"
					name="password1"
					value={password.password1}
					onChange={setPasswordHelper}
					required
					autoFocus
				/>
				<label htmlFor="password2">Re-enter password</label>
				<input
					type="password"
					name="password2"
					value={password.password2}
					onChange={setPasswordHelper}
					required
					autoFocus
				/>
				<div className="sign-in-buttons-div">
					<Button className="btn btn-success" type={'submit'}>
						Reset Password
					</Button>
				</div>
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
								: { color: 'greed' }
						}
						pStyle={{ color: 'gray' }}
					/>
				)}
			</div>
		</form>
	)
}

export default ResetPassword
