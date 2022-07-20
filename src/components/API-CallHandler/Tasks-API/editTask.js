import axios from 'axios'
import { SERVER_URL, HEADERS, TOKENS } from '../config'

const AllowedChanges = ['title', 'description', 'completed', 'lastModifiedOn']

const editTask = async (editedTask, token = '') => {
	const changes = {}
	const keys = Object.keys(editedTask)

	for (let i = 0; i < keys.length; i++) {
		if (AllowedChanges.includes(keys[i])) {
			changes[keys[i]] = editedTask[keys[i]]
		}
	}
	const payload = {
		_id: editedTask._id,
		changes,
	}

	const url = SERVER_URL + 'tasks/' + payload._id
	try {
		const TOKEN = token === '' ? TOKENS.deshabhakt : token

		const data = await axios.patch(url, payload, {
			headers: {
				...HEADERS(TOKEN),
			},
		})
		return data
	} catch (e) {
		console.log('error', e)
		throw new Error(e)
	}
}

export default editTask
