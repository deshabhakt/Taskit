import './App.css'

import React, { useState, useEffect } from 'react'

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import MenuBar from '../components/MenuBar/MenuBar'

import Home from '../Pages/Home/Home'
import About from '../Pages/About/About'
import Tasks from '../Pages/Tasks/Tasks'
import Contact from '../Pages/Contact/Contact'
import SignIn from '../Pages/SignIn/SignIn'
import SignUp from '../Pages/SignIn/SingUp'

// importing user related API calls handlers

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [userName, setUserName] = useState(undefined)
	const [isValidCreds, setIsValidCreds] = useState(null)
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
			<div className="App">
				<MenuBar
					loginState={isLoggedIn}
					logoutHandler={logoutHandler}
					userName={userName}
				/>
				<Routes>
					<Route path="/" element={<Home />} />
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

					{!isLoggedIn && (
						<Route path="/signup" element={<SignUp />} />
					)}

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
				</Routes>
			</div>
		</BrowserRouter>
	)
}

export default App
