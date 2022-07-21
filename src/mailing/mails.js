const verificationMail = (name, verificationLink) => {
	return {
		subject: 'Email verification required',
		body: `<div>
				<h1>Hey ${name}, Welcome to ToDo List</h1>
				<p>
					We are happy to have you onboard. <br />
					Just one more thing to do...
					<br />
					click on below link to verify your email-address.
				</p>
				<link>${verificationLink}</link>
				<h2>Regards,<br/>Team Task!t</h2>
			</div>`,
	}
}

const verificationSuccessMail = (name) => {
	return {
		subject: 'Email verified Successfully',
		body: `<div>
				<h1>Hey ${name},</h1>
				<p>Your Mail has been verified successfully.</p>
				<h2>Regards,<br/>Team Task!t</h2>
			</div>`,
	}
}

const resetPasswordVerificationMail = (name, verificationLink) => {
	return {
		subject: 'Reset Password',
		body: `<div>
				<h1>Hey ${name},</h1>
				<p>To reset password click on below link</p>
				<link>${verificationLink}</link>
				<h2>Regards,<br/>Team Task!t</h2>
			</div>`,
	}
}

const passwordChangeMail = (name, loginLink) => {
	return {
		subject: 'Reset Password',
		body: `<div>
				<h1>Hey ${name},</h1>
				<p>Your password has been reset successfully.<br/>login using below link
				</p>
				<link>${loginLink}</link>
				<h2>Regards,<br/>Team Task!t</h2>
			</div>`,
	}
}

module.exports = {
	verificationMail,
	verificationSuccessMail,
	resetPasswordVerificationMail,
	passwordChangeMail,
}
