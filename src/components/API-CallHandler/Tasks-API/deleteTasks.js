import axios from 'axios'
import { SERVER_URL, HEADERS } from '../config'

const deleteTasks = async (type, token = '') => {
	const url = SERVER_URL + `tasks/delete-by-category/${type}`
	console.log(url)
	const data = await axios.delete(url, {
		headers: {
			...HEADERS(token),
		},
	})
	return data
}
export default deleteTasks
