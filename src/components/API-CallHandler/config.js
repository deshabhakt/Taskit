export const SERVER_URL = 'http://192.168.131.13:5000/'

export const HEADERS = (token) => {
	const headers = {
		Authorization: `Bearer ${token}`,
	}
	return headers
}

export const TOKENS = {
	deshabhakt:
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmQ1YWI0ZDhjOWIxMDEyNjU5YzI1ODAiLCJpYXQiOjE2NTgxNzAzMDB9.GqKVooAw2w7ja5oEhGRW0oYvghh4vFbYN5zNoZ_OB5A',
	vinod: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmQ1YWI0MThjOWIxMDEyNjU5YzI1N2MiLCJpYXQiOjE2NTgxNzAzMjd9.jkYYLxbtRdZlykxIOMAINNzLjBz5sCseZJkkF_ZyN6w',
	ssagar: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmQ1YWI1NThjOWIxMDEyNjU5YzI1ODQiLCJpYXQiOjE2NTgxNzAyNzd9.-2PtKPqk1lLQ2-DSixjwQup-5-pNuZDofFWw-46sB8E',
}
