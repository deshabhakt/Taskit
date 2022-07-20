import axios from 'axios'
import { SERVER_URL, HEADERS, TOKENS } from '../config'

const createTask = async (payload, token = '') => {
	const url = SERVER_URL + 'tasks/'
	try {
		const TOKEN = token === '' ? TOKENS.deshabhakt : token

		const data = await axios.post(url, payload, {
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

export default createTask
