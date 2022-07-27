import React, { useState } from 'react'
import Button from '../../UI/Button/Button'

import Card from '../../UI/Card/Card'
import FormFeedback from '../../UI/FormFeedback/FormFeedback'

import './Contact.css'

function Contact() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	})

	const [feedBack, setFeedBack] = useState({
		h1: '',
		p: '',
	})

	const formInputChangeHandler = (event) => {
		const target = event.target.name
		const value = event.taget.value
		setFormData((prev) => {
			return { ...prev, [target]: value }
		})
	}

	const formSubmitHandler = (event) => {
		event.preventDefault()
		setFeedBack({
			h1: 'Thanks for your valueable feedback',
			p: 'We will get back to you ASAP',
		})
	}

	return (
		<div className="main-content contact__main-div">
			<p className="contact__description">
				Anything to add or comment?
				<br /> Do reach out by filling feedback form and I will get back
				to you as soon as possible
			</p>
			<form className="contact__form" onSubmit={formSubmitHandler}>
				<h1>Feedback Form</h1>
				<Card className={'contact__card'}>
					<label htmlFor="name">Name</label>
					<input
						type="text"
						name="name"
						onChange={formInputChangeHandler}
					/>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						onChange={formInputChangeHandler}
					/>
					<label htmlFor="message">Message</label>
					<textarea
						name="message"
						type="text"
						rows={5}
						cols={30}
						onChange={formInputChangeHandler}
					/>
					<div className="contact__submit-button-div">
						<Button type={'submit'} className="btn btn-success">
							Submit
						</Button>
					</div>
				</Card>
			</form>
			{feedBack.h1.length > 0 && (
				<FormFeedback
					feedBack={feedBack}
					h1Style={{ color: 'green' }}
					pStyle={{ color: 'gray' }}
				/>
			)}
		</div>
	)
}
export default Contact
