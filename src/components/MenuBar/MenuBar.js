import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import Logo from '../../UI/Logo/Logo'

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
				className="menu-bar-icon"
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
				<div
					style={
						userName && {
							borderLeft: '2px solid rgb(255, 255, 255)',
							height: '1.3rem',
						}
					}
				></div>
				<Link
					to={
						logOnText === 'Sign In'
							? '/signin'
							: logOnText === 'Sign Up'
							? '/signup'
							: '/signin'
					}
					className="logonhandler"
					onClick={() => {
						if (loginState) {
							logoutHandler()
						}
					}}
				>
					{loginState ? 'Sign Out' : logOnText}
				</Link>
			</div>
		</nav>
	)
}

export default MenuBar
