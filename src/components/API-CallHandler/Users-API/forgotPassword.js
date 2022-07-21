import axios from 'axios'
import { SERVER_URL } from '../config'

const forgotPassword = async (payload) => {
	const url = SERVER_URL + 'users/forgotpassword/'
	try {
		console.log(payload)
		const data = await axios.post(url, payload, {
			headers: {},
		})
		return data
	} catch (error) {
		console.log('error', error)
	}
}

export default forgotPassword
