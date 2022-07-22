import './App.css'

import React, { useState, useEffect } from 'react'

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import MenuBar from '../components/MenuBar/MenuBar'

import Home from '../Pages/Home/Home'
import About from '../Pages/About/About'
import Tasks from '../Pages/Tasks/Tasks'
import Contact from '../Pages/Contact/Contact'
import SignIn from '../Pages/SignOn/SignIn'
import SignUp from '../Pages/SignOn/SingUp'
import { ForgotPassword } from '../Pages/SignOn/ForgotPassword'
import ResetPassword from '../Pages/SignOn/ResetPassword'
import Footer from './Footer'

// importing user related API calls handlers

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [userName, setUserName] = useState(undefined)
	const [isValidCreds, setIsValidCreds] = useState(true)
	const [authToken, setAuthToken] = useState('')

	useEffect(() => {
		const prevLoginState = localStorage.getItem('user-login-state')
		const prevAuthToken = localStorage.getItem('user-auth-token')
		const prevUserName = localStorage.getItem('user-name')

		if (prevLoginState === 'true') {
			setIsLoggedIn(true)
			setAuthToken(prevAuthToken)
			setUserName(prevUserName)
		}
	}, [])

	const singInHandler = (token, username) => {
		if (token === null) {
			setIsValidCreds(false)
			return
		}
		localStorage.setItem('user-login-state', true)
		localStorage.setItem('user-auth-token', token)
		localStorage.setItem('user-name', username)
		setUserName(username)
		setIsLoggedIn(true)
		setAuthToken(token)
	}
	const logoutHandler = () => {
		localStorage.removeItem('user-login-state')
		localStorage.removeItem('user-auth-token')
		localStorage.removeItem('user-name')
		setIsLoggedIn(false)
		setAuthToken('')
		setUserName(undefined)
	}

	return (
		<BrowserRouter>
			<MenuBar
				loginState={isLoggedIn}
				logoutHandler={logoutHandler}
				userName={userName}
			/>

			<Routes>
				<Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
				<Route path="/about" element={<About />} />
				<Route path="/contact" element={<Contact />} />

				<Route
					path="/signin"
					element={
						isLoggedIn ? (
							<Navigate to="/tasks" replace={true} />
						) : (
							<SignIn
								signInHandler={singInHandler}
								isValidCreds={isValidCreds}
							/>
						)
					}
				/>

				{!isLoggedIn && <Route path="/signup" element={<SignUp />} />}

				<Route
					path="/tasks"
					element={
						!isLoggedIn ? (
							<Navigate to="/signin" replace={true} />
						) : (
							<Tasks token={authToken} />
						)
					}
				/>
				<Route path="/forgotpassword" element={<ForgotPassword />} />
				<Route path="/resetpassword" element={<ResetPassword />} />
			</Routes>

			<Footer />
		</BrowserRouter>
	)
}

export default App
