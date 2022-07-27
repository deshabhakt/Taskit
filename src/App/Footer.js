import React from 'react'
import { useLocation } from 'react-router-dom'

import './App.css'

const Footer = () => {
	const location = useLocation().pathname

	const basedYear = 2022

	const currentYear = new Date().getFullYear()

	const devName = 'Deshabhakt Gavali'
	return (
		<footer
			style={
				location === '/account_settings'
					? { backgroundColor: 'transparent' }
					: {}
			}
		>
			&copy;{' '}
			{basedYear === currentYear
				? currentYear + ' '
				: basedYear + '-' + currentYear + ' '}
			<a
				className="footer-a-tag"
				href="https://www.github.com/deshabhakt"
			>
				{devName}
			</a>
		</footer>
	)
}

export default Footer
