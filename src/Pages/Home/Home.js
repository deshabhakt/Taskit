import React from 'react'

import Logo from '../../UI/Logo/Logo'

import './Home.css'

function Home({ isLoggedIn }) {
	return (
		<div className="home">
			<Logo imgStyles={{ maxWidth: '3rem' }} />
			<h1>
				Welcome To
				<strong> Task!t</strong>
			</h1>
			<h2>
				Your{' '}
				<em>
					<strong>one-stop-shop</strong>
				</em>{' '}
				for managing your tasks
			</h2>
			<h2>
				{!isLoggedIn ? (
					<>
						Start by Signing up <a href="/signup">here</a>
					</>
				) : (
					''
				)}
			</h2>
		</div>
	)
}
export default Home
