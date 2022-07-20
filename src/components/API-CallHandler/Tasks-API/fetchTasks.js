import axios from 'axios'
import { SERVER_URL, HEADERS, TOKENS } from '../config'
const fetchTasks = async (
	isCompleted,
	token = '',
	limit = undefined,
	skip = 10
) => {
	// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
	let queryURL =
		SERVER_URL +
		'tasks?completed=' +
		(isCompleted === 'ongoing' ? 'False' : 'True') +
		'&sortBy=updatedAt:desc'
	if (limit) {
		queryURL += '&limit=' + limit + '&skip' + skip
	}
	try {
		const TOKEN = token === '' ? TOKENS.deshabhakt : token
		const data = await axios.get(queryURL, {
			headers: HEADERS(TOKEN),
		})
		return data
	} catch (e) {
		console.log(e)
		return undefined
	}
}

export default fetchTasks
