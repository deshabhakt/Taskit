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
			</div>`,
	}
}

const verificationSuccessMail = (name) => {
	return {
		subject: 'Email verified Successfully',
		body: `<div>
				<h1>Hey ${name},</h1>
				<p>Your Mail has been verified successfully.</p>
			</div>`,
	}
}

module.exports = { verificationMail, verificationSuccessMail }
