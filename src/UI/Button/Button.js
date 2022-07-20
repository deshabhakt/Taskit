import React from 'react'
import './Button.css'

const Button = (props) => {
	return (
		<button
			className={`button-wrapper ${props.className}`}
			onClick={(event) => {
				try {
					props.onClickHandler(event)
				} catch {}
			}}
			type={props.type !== undefined ? props.type : 'button'}
		>
			{props.children}
		</button>
	)
}

export default Button
