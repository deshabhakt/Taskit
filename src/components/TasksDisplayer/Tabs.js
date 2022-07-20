import React, { useState } from 'react'

import './TabbedLayout.css'

const Tabs = ({ selectedTabHandler, selectedTab }) => {
	const [currentTab, setCurrentTab] = useState('ongoing')
	return (
		<div className="tabs-div">
			<div
				className={
					currentTab === 'ongoing'
						? ' selected-tab'
						: 'not-selected-ongoing-tab'
				}
				onClick={() => {
					setCurrentTab('ongoing')
					selectedTabHandler('ongoing')
				}}
			>
				On-going
			</div>
			<div
				className={
					currentTab === 'complete'
						? ' selected-tab'
						: 'not-selected-complete-tab'
				}
				onClick={() => {
					setCurrentTab('complete')
					selectedTabHandler('complete')
				}}
			>
				Complete
			</div>
		</div>
	)
}
export default Tabs
