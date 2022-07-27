import axios from 'axios'
import { HEADERS, SERVER_URL } from '../config'

const getLengths = async (token) => {
	const url = SERVER_URL + 'get-number-of-tasks'
	const data = await axios.get(url, {
		headers: { ...HEADERS(token) },
	})
	return data
}

export default getLengths
