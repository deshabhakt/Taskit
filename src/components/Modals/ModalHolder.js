import React from 'react'

import { motion } from 'framer-motion'
// import motion from '../../../node_modules/framer-motion/dist/es/index'

import './ModalHolder.css'

const ModalHoder = (props) => {
	return (
		<motion.div
			className="modal-main-div"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1 }}
			onKeyDown={(event) => {
				try {
					props.keyStrokeHandler(event)
				} catch {}
			}}
		>
			<div
				className="backdrop"
				onClick={() => {
					props.taskHandler(undefined)
				}}
			></div>
			{props.children}
		</motion.div>
	)
}

export default ModalHoder
