import React from 'react'

import githubLogo from '../../utils/images/github-logo.png'
import linkedInLogo from '../../utils/images/linkedin-logo.png'
import facebookLogo from '../../utils/images/facebook-logo.png'
import myPic from './mypic.jpg'

import './DevInfo.css'

const DevInfo = ({ className }) => {
    return (
        <div className={`dev-info-div ${className}`}>

            <img src={myPic} alt='my pic' className="dev-pic-img" />
            <div className='dev-info-description-div'>
            <h1>Deshabhakt Gavali</h1>
            <h2>Full-stack Developement Enthusiast</h2>
            </div>
            <p>I work on full-stack web developement projects.
                <br />
                Have anything to discuss? Reach out on any of the following handles</p>
            <div className="socials">
                <img href="https://github.com/deshabhakt" src={githubLogo} alt="github logo" />
                <img href="https://www.linkedin.com/in/deshabhakt-gavali/" src={linkedInLogo} alt="github logo" />
                <img href="https://www.facebook.com/deshabhakt5" src={facebookLogo} alt="github logo" />
            </div>
        </div>
    )
}

export default DevInfo