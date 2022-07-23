import React from 'react'

import './App.css'

const Footer = () => {

	const basedYear = 2022

	const currentYear = new Date().getFullYear()

	const devName = 'Deshabhakt Gavali'
	return (
		<footer>
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
