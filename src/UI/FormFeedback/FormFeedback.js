import React from 'react'

import './FormFeedback.css'

const FormFeedback = ({ feedBack, h1Style, pStyle }) => {
	return (
		<div className="form-feedback-div">
			<h1 style={h1Style}>{feedBack.h1 && feedBack.h1}</h1>
			<p style={pStyle}>{feedBack.p && feedBack.p}</p>
		</div>
	)
}
export default FormFeedback
