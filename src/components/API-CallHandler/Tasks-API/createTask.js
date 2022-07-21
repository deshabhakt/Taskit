import axios from 'axios'
import { SERVER_URL, HEADERS } from '../config'
const createTask = async (payload, token = '') => {
	const url = SERVER_URL + 'tasks/'
	try {
		const data = await axios.post(url, payload, {
			headers: {
				...HEADERS(token),
			},
		})
		console.log(data)
		return data
	} catch (e) {
		console.log('error', e)
		throw new Error(e)
	}
}

export default createTask
