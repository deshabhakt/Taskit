const queryStringParser = (queryString) => {
	const queryParams = {}
	const queryStringSplited = queryString.slice(1).split('&')
	for (let i = 0; i < queryStringSplited.length; i++) {
		const _strarr = queryStringSplited[i].split('=')
		queryParams[_strarr[0]] = _strarr[1]
	}
	return queryParams
}
export default queryStringParser 