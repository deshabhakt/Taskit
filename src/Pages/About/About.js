import React from 'react'
import './About.css'

import githubLogo from '../../utils/images/github-logo.png'
import linkedInLogo from '../../utils/images/linkedin-logo.png'
import facebookLogo from '../../utils/images/facebook-logo.png'

function About() {
	return (
		<div className="about">
			<h1>Find Me Here</h1>
			<div className="socials">
				<a href="https://github.com/deshabhakt">
					<img src={githubLogo} alt="github logo" />
				</a>
				<a href="https://www.linkedin.com/in/deshabhakt-gavali/">
					<img src={linkedInLogo} alt="github logo" />
				</a>
				<a href="https://www.facebook.com/deshabhakt5">
					<img src={facebookLogo} alt="github logo" />
				</a>
			</div>
		</div>
	)
}
export default About