import axios from 'axios'
import { SERVER_URL, HEADERS } from '../config.js'

const fetchUserDetails = async (token) => {
	const url = SERVER_URL + 'users/me'
	const data = await axios.get(url, {
		headers: { ...HEADERS(token) },
	})
	return data
}

export default fetchUserDetails
