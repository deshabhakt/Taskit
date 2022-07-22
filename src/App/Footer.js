import React from 'react'

import './App.css'

const Footer = () => {
	const year = new Date().getFullYear()
	const devName = 'Deshabhakt Gavali'
	return (
		<footer>
			&copy; {year} :{' '}
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
