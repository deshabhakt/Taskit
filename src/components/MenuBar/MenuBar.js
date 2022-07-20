import React from 'react'
import { Link } from 'react-router-dom'
import './MenuBar.css'

const MenuBar = ({ loginState, logoutHandler, userName }) => {
	return (
		<nav className="menu-bar">
			<Link to="/" className="menu-bar-spans">
				Home
			</Link>
			<Link to="/tasks" className="menu-bar-spans">
				Tasks
			</Link>
			<Link to="/about" className="menu-bar-spans">
				About
			</Link>
			<Link to="/contact" className="menu-bar-spans">
				Contact
			</Link>
			<div className="menu-bar-spans menu-bar-log-in-span">
				<p className="user-name">
					{userName !== undefined ? `Welcome ${userName}   |   ` : ''}
				</p>
				<Link
					to="/signin"
					className="logonhandler"
					onClick={() => {
						if (loginState) {
							logoutHandler()
						}
					}}
				>
					{loginState ? 'Sign Out' : 'Sign In/Up'}
				</Link>
			</div>
		</nav>
	)
}

export default MenuBar
