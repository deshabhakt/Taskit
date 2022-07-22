import React from 'react'
import './About.css'

import DevInfo from '../../components/DevInfo/DevInfo'
import Logo from '../../UI/Logo/Logo'

function About() {
	return (
		<div className="main-content about">
			<div className='about__app-info'>
				<Logo
					className={'about__app-logo'}
					imgStyles={{ width: '3rem' }}
					titleStyles={{ fontSize: '2rem' }}
				/>
				<p className='about__app-info-description'>Task!t is a easy to use task manager app.<br/> Users can organize their tasks by storing those heres. <br/>All the tasks are saved into a database and can be accessed anywhere around the world. <br/>And yes we do take care of your privacy and your tasks can only be retrieved and updated by you.</p>
			</div>
			<DevInfo className={"about__dev-info"}/>
		</div>
	)
}
export default About