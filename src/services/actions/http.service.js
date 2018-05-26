
export const GET = (url, headers) => {

	let defaultheader = {
		'Accept': 'application/json',
		"Content-Type" : 'application/json',
	}
	headers = Object.assign(defaultheader, headers);

 	return fetch(url, {credentials: 'same-origin', headers : headers}).then(function(res){
 		if (res.status >= 400) {
 			throw new Error("Bad response from server");
 		}
 		return res.json();
 	}).catch(function(err){
 		throw new Error("some error detected");
 	});
 }
 
 
 export const POST = (url, obj, headers) => {
 	let data = {};
 
	let defaultheader = {
		"Content-Type" : 'application/json',
	}
	headers = Object.assign(defaultheader, headers);

 	if (headers) {
 		data = { method: 'post', headers: headers, body: JSON.stringify(obj) };
 	} else {
 		data = { method: 'post', body: JSON.stringify(obj) };
 	}
 
 	return fetch(url, data).then(function(res) {
 		if (res.status >= 400) {
 			throw new Error("Bad response from server");
 		}
 		return res.json();
 	}).catch(function(error) {
 		throw error;
 	});
 }
 
 export const PUT = (url, obj, headers) => {
 	let data = {};
 
	let defaultheader = {
		"Content-Type" : 'application/json',
	}
	headers = Object.assign(defaultheader, headers);

 	if (headers) {
 		data = { method: 'PUT', headers: headers, body: JSON.stringify(obj) };
 		console.log('DATA: ', data, JSON.stringify(obj))
 	} else {
 		data = { method: 'PUT', body: JSON.stringify(obj) };
 	}

 	return fetch(url, data).then(function(res) {
 		if (res.status >= 400) {
 			throw new Error("Bad response from server");
 		}
 		return res.json();
 	}).catch(function(error) {
 		throw error;
 	});
 }
  
export const PATCH = (url, obj, headers) => {

	let defaultheader = {
		"Content-Type" : 'application/json',
		"Authorization": "Token "+ window.localStorage.getItem('token')
	}
	headers = Object.assign(defaultheader, headers);
	
 	let data = {};
 	if (headers) {
 		data = { method: 'PATCH', headers: headers, body: JSON.stringify(obj) };
 	} else {
 		data = { method: 'PATCH', body: JSON.stringify(obj) };
 	}
 
 	return fetch(url, data).then(function(res) {
 		if (res.status >= 400) {
 			throw new Error("Bad response from server");
 		}
 		return res.json();
 	}).catch(function(error) {
 		throw new Error("some error detected");
 	});
 }

 export const DELETE = (url, obj, headers) => {
 	let data = {};
 
	let defaultheader = {
		"Content-Type" : 'application/json',
	}
	headers = Object.assign(defaultheader, headers);

 	if (headers) {
 		data = { method: 'DELETE', headers: headers, body: JSON.stringify(obj) };
 	} else {
 		data = { method: 'DELETE', body: JSON.stringify(obj) };
 	}
 
 	return fetch(url, data).then(function(res) {

 		if (res.status >= 400) {
 			throw new Error("Bad response from server");
 		}
 		return res;
 	}).catch(function(error) {
 		console.log(error)
 		throw new Error("some error detected");
 	});
 
 }
