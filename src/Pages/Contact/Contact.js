import React from 'react'

import { Navigate } from 'react-router-dom'

import './Contact.css'

function Contact() {
	return (
		<div>
			<Navigate to="/about" replace={true} />
			<h1>Contact</h1>
		</div>
	)
}
export default Contact
