import React, { useState, useEffect, useContext } from 'react'

export const LogOnContext = React.createContext()

export const LogOnProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [authToken, setAuthToken] = useState('')
	const [userInfo, setUserInfo] = useState({
		name: 'username',
		password: 'user@mail.com',
	})

	const logInHandler = (token, userInfo) => {
		localStorage.setItem('user-login-state', true)
		localStorage.setItem('user-auth-token', token)
		localStorage.setItem('user-name', JSON.stringify(userInfo))
		setIsLoggedIn(true)
		setAuthToken(token)
		setUserInfo(userInfo)
	}

	const hotReloadLogging = () => {
		const prevLoginState = localStorage.getItem('user-login-state')
		const prevAuthToken = localStorage.getItem('user-auth-token')
		const prevUserName = JSON.parse(localStorage.getItem('user-name'))
		console.log(prevLoginState)
		if (prevLoginState === 'true') {
			setIsLoggedIn(true)
			setAuthToken(prevAuthToken)
			setUserInfo(prevUserName)
		}
	}

	const logOutHandler = () => {
		localStorage.removeItem('user-login-state')
		localStorage.removeItem('user-auth-token')
		localStorage.removeItem('user-name')
		setIsLoggedIn(false)
		setAuthToken('')
		setUserInfo(undefined)
	}

	useEffect(() => {
		const prevLoginState = localStorage.getItem('user-login-state')
		const prevAuthToken = localStorage.getItem('user-auth-token')
		const prevUserName = JSON.parse(localStorage.getItem('user-name'))
		console.log(prevLoginState)
		if (prevLoginState === 'true') {
			setIsLoggedIn(true)
			setAuthToken(prevAuthToken)
			setUserInfo(prevUserName)
		}
	}, [])

	return (
		<LogOnContext.Provider
			value={{
				token: authToken,
				isLoggedIn: isLoggedIn,
				userInfo: userInfo,
				logInHandler: logInHandler,
				logOutHandler: logOutHandler,
				hotReloadLogging: hotReloadLogging,
			}}
		>
			{children}
		</LogOnContext.Provider>
	)
}

export const LogOnConsumer = (props) => {
	return (
		<LogOnContext.Consumer>
			{() => {
				return props.children
			}}
		</LogOnContext.Consumer>
	)
}

export const useLogOnContext = () => {
	return useContext(LogOnContext)
}
