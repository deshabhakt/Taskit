export const SERVER_URL = 'https://task-manager-101.herokuapp.com/'

export const HEADERS = (token) => {
	const headers = {
		Authorization: `Bearer ${token}`,
	}
	return headers
}
