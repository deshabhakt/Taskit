import axios from 'axios'

import { SERVER_URL, HEADERS } from '../config'

const deleteUser = async (token) => {
	const url = SERVER_URL + 'users/me'
	const data = await axios.delete(url, {
		headers: { ...HEADERS(token) },
	})
	return data
}

export default deleteUser
