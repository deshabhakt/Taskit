import axios from 'axios'
import { SERVER_URL, HEADERS } from '../config'

const deleteTask = async (id, token = '') => {
	const url = SERVER_URL + 'tasks/' + id
	try {
		const data = await axios.delete(url, {
			headers: {
				...HEADERS(token),
			},
			data: {},
		})
		return data
	} catch (e) {
		throw new Error(e)
	}
}

export default deleteTask
