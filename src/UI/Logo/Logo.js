import React from 'react'

import appIcon from '../../utils/images/appIcon.png'

import './Logo.css'

import { Link } from 'react-router-dom'

const Logo = ({ imgStyles, titleStyles, className }) => {
	return (
		<Link to="/" className={`logo ${className}`}>
			<img
				className="logo__img"
				style={imgStyles}
				src={appIcon}
				alt="app icon"
			/>
			<h1 className="logo__h1" style={titleStyles}>
				Task!t
			</h1>
		</Link>
	)
}
export default Logo
