import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

function Home() {
	return (
		<div className="home">
			<h1>Welcome To</h1>
			<h1>
				<strong>To-Do list App</strong>
			</h1>
			<h2>
				Your{' '}
				<em>
					<stron>one-stop-shop</stron>
				</em>{' '}
				for managing your tasks
			</h2>
			<h2>
				Start by Signing up <a href="/signup">here</a>
			</h2>
		</div>
	)
}
export default Home
