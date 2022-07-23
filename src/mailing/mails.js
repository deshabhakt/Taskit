const verificationMail = (name, verificationLink) => {
	return {
		subject: 'Task!t | Email verification required',
		body: `<div>
				<h1>Hey ${name}, Welcome to Task!t</h1>
				<h2>
					We are happy to have you onboard. <br />
					Just one more thing to do...
					<br />
					click on below link to verify your email-address.
				</h2>
				<h3 href=${verificationLink}>click here</h3>
				<h3>Regards,<br/>Team Task!t</h3>
			</div>`,
	}
}

const verificationSuccessMail = (name) => {
	return {
		subject: 'Task!t | Email verified Successfully',
		body: `<div>
				<h1>Hey ${name},</h1>
				<h3>Your Mail has been verified successfully.</h3>
				<h3>Regards,<br/>Team Task!t</h3>
			</div>`,
	}
}

const resetPasswordVerificationMail = (name, verificationLink) => {
	return {
		subject: 'Task!t | Reset Password',
		body: `<div>
				<h1>Hey ${name},</h1>
				<h2>To reset password click on below link</h2>
				<h3 href=${verificationLink}>click here</h3>
				<h3>Regards,<br/>Team Task!t</h3>
			</div>`,
	}
}

const passwordChangeMail = (name, loginLink) => {
	return {
		subject: 'Task!t | Password reset successfully',
		body: `<div>
				<h1>Hey ${name},</h1>
				<h2>Your password has been reset successfully.<br/>login using below link
				</h2>
				<link>${loginLink}</link>
				<h3 href=${loginLink}>click here</h3>
				<h3>Regards,<br/>Team Task!t</h3>
			</div>`,
	}
}

module.exports = {
	verificationMail,
	verificationSuccessMail,
	resetPasswordVerificationMail,
	passwordChangeMail,
}
