import axios from 'axios'
import { SERVER_URL, HEADERS } from '../config'
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
		const res = await axios.get(queryURL, {
			headers: HEADERS(token),
		})
		return res
	} catch (e) {
		return {
			code: 500,
			message: 'Unable to get data from server',
		}
	}
}

export default fetchTasks
