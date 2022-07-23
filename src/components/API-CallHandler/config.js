export const SERVER_URL = 'https://task-manager-101.herokuapp.com/'

// export const SERVER_URL = 'http://127.0.0.1:5000/'
// export const SERVER_URL = 'http://localhost:5000/'

export const HEADERS = (token) => {
	const headers = {
		Authorization: `Bearer ${token}`,
	}
	return headers
}
