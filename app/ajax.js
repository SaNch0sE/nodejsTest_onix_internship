async function ajax(action, data, callback){
	const url = 'http://localhost:8080/';
	let dataString = {
		action: action,
		data: data
	};
	const requestData = JSON.stringify(dataString);
	try {
		const request = await fetch(url, {
		    method: 'POST',
		    body: requestData,
		    headers: {
		    	'Content-Type': 'application/json'
		    }
		});
		const response = await request.json();
		callback(response);
	} catch (error) {
		callback('Error: ' + error);
	}
}
//made by https://github.com/SaNch0sE