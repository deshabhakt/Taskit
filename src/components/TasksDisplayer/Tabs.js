import React, { useEffect, useState } from 'react'

import './TabbedLayout.css'
const Tabs = ({ selectedTabHandler, selectedTab }) => {
	const [currentTab, setCurrentTab] = useState('ongoing')

	const [style,setStyle] = useState({
		ongoing:{
			transition:'500ms',
			backgroundColor:'orange',
			flex:'2',
			borderRadius:'1rem',
			marginLeft:'-1rem',
		},
		complete:{
			transition:'500ms',
			backgroundColor:'aquamarine',
			flex:'1',
			borderRadius:'1rem',
			marginRight:'-1rem',
		}
	})

	useEffect(()=>{
		setStyle(prev=>{
			return {
				complete:prev.ongoing,
				ongoing:prev.complete
			}
		})
	},[selectedTab])

	return (
		<>
		<div className='tabs__background-div'>
			<div style={currentTab==='ongoing'?{backgroundColor:'orange',flex:'1'}:{}}></div>
			<div style={currentTab==='complete'?{backgroundColor:'orange',flex:'1'}:{}}></div>
		</div>
		<div className="tabs-div" style={{textAlign:'centre'}}>
			<div
				style={style.complete}
				onClick={() => {
					setCurrentTab('ongoing')
					selectedTabHandler('ongoing')
				}}
			>
				On-going
			</div>
			<div
				style={style.ongoing}
				onClick={() => {
					setCurrentTab('complete')
					selectedTabHandler('complete')
				}}
			>
				Complete
			</div>
		</div>
		</>

	)
}
export default Tabs
