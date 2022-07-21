export const SERVER_URL = 'http://192.168.131.13:5000/'

export const HEADERS = (token) => {
	const headers = {
		Authorization: `Bearer ${token}`,
	}
	return headers
}