import axios from 'axios'
import { SERVER_URL } from '../config'

const createUser = async (payload) => {
	const url = SERVER_URL + 'users/'
	try {
		const data = await axios.post(url, payload, {
			headers: {},
		})
		return data
	} catch (e) {
		// console.log('error', e)
		throw new Error({ error: e })
	}
}

export default createUser
