import React from 'react'

import githubLogo from '../../utils/images/github-logo.png'
import linkedInLogo from '../../utils/images/linkedin-logo.png'
import facebookLogo from '../../utils/images/facebook-logo.png'

import './Contact.css'
import Card from '../../UI/Card/Card'

function Contact() {
	return (
		<div className="main-content contact__main-div">
				<form className="contact__form">
					<Card>
					<label>Name</label>
					<input type="text" name="name" />
					<label>Email</label>
					<input type="email" name="email" />
					<label>Message</label>
					<textarea
						name="message"
						type="text"
						rows={5}
						cols={30}
					/>
					</Card>
				</form>
		</div>
	)
}
export default Contact
