import React from 'react'
import Button from '../../UI/Button/Button'

import Card from '../../UI/Card/Card'

import './Contact.css'

function Contact() {
	return (
		<div className="main-content contact__main-div">
			<p className='contact__description'>Anything to add or comment?<br /> Do reach out by filling feedback form and I will get back to you as soon as possible</p>
			<form className="contact__form">
				<h1>Feedback Form</h1>
				<Card className={'contact__card'}>
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
					<div className='contact__submit-button-div'>
						<Button type={'submit'} className='btn btn-success'>Submit</Button>
					</div>
				</Card>
			</form>
		</div>
	)
}
export default Contact
