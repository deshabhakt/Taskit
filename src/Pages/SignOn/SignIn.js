import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import loginUser from '../../components/API-CallHandler/Users-API/loginUser'
import Button from '../../UI/Button/Button'
import Card from '../../UI/Card/Card'
import './SignIn.css'

function SignIn({ signInHandler, isValidCreds }) {
	const [loginData, setLoginData] = useState({
		email: '',
		password: '',
	})

	const setloginDataHelper = (event) => {
		const targetName = event.target.name
		const targetValue = event.target.value
		setLoginData((prev) => {
			return { ...prev, [targetName]: targetValue }
		})
	}
	const loginHandler = (event) => {
		event.preventDefault()
		loginUser(loginData)
			.then((res) => {
				console.log(res.data)
				const { authToken, userName } = res.data
				signInHandler(authToken, userName)
			})
			.catch((e) => {
				signInHandler(null)
			})
	}

	return (
		<div className="sign-in-div">
			<form
				className="sign-in-form"
				onSubmit={(event) => {
					loginHandler(event)
				}}
			>
				<Card>
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
						<Link
							className="button-wrapper btn btn-primary"
							to="/signup"
						>
							Sing Up
						</Link>
						<Button className="btn btn-success" type={'submit'}>
							Sign In
						</Button>
					</div>
				</Card>
			</form>
			{isValidCreds === false && <h1>Invalid credentials</h1>}
		</div>
	)
}
export default SignIn
