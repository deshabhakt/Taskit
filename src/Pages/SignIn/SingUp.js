import React, { useState } from 'react'

import Button from '../../UI/Button/Button'
import Card from '../../UI/Card/Card'

import createUser from '../../components/API-CallHandler/Users-API/createUser'

import './SignIn.css'

function SignUp() {
	const [userData, setUserData] = useState({
		name: 'Deshahbakt',
		email: 'dgavali1@gmail.com',
		password: 'DB@@2323@@db',
	})

	const [isVerificationMailSent, setIsVerificationMailSent] = useState(false)

	const singUpValChangeHandler = (event) => {
		const targetName = event.target.name
		const targetValue = event.target.value
		setUserData((prev) => {
			return { ...prev, [targetName]: targetValue }
		})
	}

	const onSubmitHandler = () => {
		createUser(userData)
			.then((res) => {
				console.log(res)
				setIsVerificationMailSent(true)
			})
			.catch((e) => {
				console.log(e)
			})
	}

	return (
		<div className="sign-in-div">
			<form
				className="sign-in-form"
				onSubmit={(event) => {
					event.preventDefault()
					onSubmitHandler()
				}}
			>
				<Card>
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
						<Button type={'submit'} className={'btn btn-primary'}>
							Sign Up
						</Button>
					</div>
				</Card>
			</form>
			{isVerificationMailSent && <h1>Verification Mail sent</h1>}
		</div>
	)
}
export default SignUp
