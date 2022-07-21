import axios from 'axios'
import { SERVER_URL } from '../config'

const resetpassword = async (payload) => {
	const url = SERVER_URL + 'resetpassword/'
	try {
		const data = await axios.patch(url, payload, {
			headers: {},
		})
		return data
	} catch (error) {
		// console.log('error', error)
	}
}

const checkResetToken = async (payload) => {
	const url = SERVER_URL + 'reset-password-token-validation/'
	try {
		const data = await axios.post(url, payload, {
			headers: {},
		})
		return data
	} catch (error) {
		// console.log('error', error)
		return error
	}
}
export { checkResetToken }

export default resetpassword
