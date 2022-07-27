import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import Logo from '../../UI/Logo/Logo'

import logOutIcon from '../../utils/images/singout.png'
import userSettingsIcon from '../../utils/images/setting.png'

import './MenuBar.css'

const MenuBar = ({ loginState, logoutHandler, userName }) => {
	const [logOnText, setLogOnText] = useState('Sign In/Up')

	const location = useLocation()

	useEffect(() => {
		setLogOnText((prev) => {
			const newText = location.pathname.slice(1)
			if (newText === 'signin') {
				return 'Sign Up'
			} else if (newText === 'signup') {
				return 'Sign In'
			} else {
				return 'Sign In/Up'
			}
		})
	}, [location])
	return (
		<nav className="menu-bar">
			<Logo
				className="menubar-logo__menu-bar-icon"
				imgStyles={{ width: '2rem' }}
				titleStyles={{ fontSize: '1rem', color: 'white' }}
			/>
			<Link to="/tasks" className="menu-bar-link">
				Tasks
			</Link>
			<Link to="/about" className="menu-bar-link">
				About
			</Link>
			<Link to="/contact" className="menu-bar-link">
				Contact
			</Link>
			<div className="menu-bar-log-in-span">
				<p className="user-name">{userName && `Welcome ${userName}`}</p>
				<div className={userName && 'username-separator-div'}></div>
				{!loginState && (
					<Link
						to={
							logOnText === 'Sign In'
								? '/signin'
								: logOnText === 'Sign Up'
								? '/signup'
								: '/signin'
						}
						className="logonhandler"
					>
						{logOnText}
					</Link>
				)}
				{loginState && (
					//   'Sign Out'
					<SignedIn logOutHandler={logoutHandler} />
				)}
			</div>
		</nav>
	)
}

const SignedIn = ({ logOutHandler }) => {
	const navigate = useNavigate()
	return (
		<div className="signed-in__main-div">
			<img
				className="signed-in__img-setting"
				src={userSettingsIcon}
				alt={'settings icon'}
				onClick={() => {
					navigate('/account_settings')
				}}
			/>
			<img
				className="signed-in__img-sign-out"
				src={logOutIcon}
				alt={'singout icon'}
				onClick={() => {
					logOutHandler()
					navigate('/signin')
				}}
			/>
		</div>
	)
}

export default MenuBar
