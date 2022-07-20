import axios from 'axios'
import { SERVER_URL } from '../config'

const loginUser = async (payload) => {
	const url = SERVER_URL + 'users/login/'
	try {
		const data = await axios.post(url, payload, {
			headers: {},
		})
		return data
	} catch (error) {
		console.log('error', error)
		throw new Error({ error })
	}
}

export default loginUser
