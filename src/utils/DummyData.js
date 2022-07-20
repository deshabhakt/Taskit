const getDummyData = () => {
	const date = new Date()
	const dummyData = []
	for (let i = 0; i < 96; i++) {
		dummyData.push({
			id: Math.random(),
			title: 'This is title ' + (i + 1),
			description:
				'This is a description. This description is for task with title ' +
				(i + 1),
			lastModifiedOn:
				date.toLocaleDateString() +
				' ' +
				date.toLocaleTimeString().toUpperCase(),
			createdOn:
				date.toLocaleDateString() +
				' ' +
				date.toLocaleTimeString().toUpperCase(),
			completed: i % 2 === 0 ? true : false,
		})
	}
	dummyData[1].description =
		'This is a description. This description is for task with title 2This is a description. This description is for task with title 2This is a description. This description is for task with title 2This is a description. This description is for task with title 2This is a description. This description is for task with title 2This is a description. This description is for task with title 2This is a description. This description is for task with title 2'
	return dummyData
}

export default getDummyData
