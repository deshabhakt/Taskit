import axios from 'axios'
import { SERVER_URL, HEADERS, TOKENS } from '../config'

const deleteTask = async (id, token = '') => {
	const url = SERVER_URL + 'tasks/' + id
	try {
		const TOKEN = token === '' ? TOKENS.deshabhakt : token
		const data = await axios.delete(url, {
			headers: {
				...HEADERS(TOKEN),
			},
			data: {},
		})
		return data
	} catch (e) {
		throw new Error(e)
	}
}

export default deleteTask
