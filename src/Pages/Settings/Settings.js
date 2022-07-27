import React, { useState } from 'react'
import DeleteThings from '../../components/AccountSettings/Delete/DeleteThings'
import MyProfile from '../../components/AccountSettings/MyProfile/MyProfile'

import './Settings.css'

const Settings = ({ token }) => {
	// state for handling selected tab
	const [selectedTab, setSelectedTab] = useState('my_profile')

	const onTabClickHandler = (clickedTab) => {
		setSelectedTab(clickedTab)
	}

	return (
		<div className="main-content settings__main-div">
			<SideBar
				onTabClickHandler={onTabClickHandler}
				selectedTab={selectedTab}
			/>
			<div className="settings__main-content">
				{selectedTab === 'my_profile' && <MyProfile token={token} />}
				{selectedTab === 'change_password' && <>change_password</>}
				{selectedTab === 'delete_things' && (
					<DeleteThings token={token} />
				)}
			</div>
		</div>
	)
}

const SideBar = ({ onTabClickHandler, selectedTab }) => {
	const onSelectStyle = {
		backgroundColor: 'purple',
		color: 'white',
	}
	return (
		<div className="settings__sidebar">
			<li
				key={'my_profile'}
				style={selectedTab === 'my_profile' ? onSelectStyle : {}}
				onClick={() => {
					onTabClickHandler('my_profile')
				}}
			>
				My Profile
			</li>
			<li
				key={'change_password'}
				style={selectedTab === 'change_password' ? onSelectStyle : {}}
				onClick={() => {
					onTabClickHandler('change_password')
				}}
			>
				Change Password
			</li>
			<li
				key={'delete_things'}
				style={selectedTab === 'delete_things' ? onSelectStyle : {}}
				onClick={() => {
					onTabClickHandler('delete_things')
				}}
			>
				Delete Things
			</li>
		</div>
	)
}

export default Settings
