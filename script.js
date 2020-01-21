const http = require('http');
const fs = require('fs');
const fetch = require('node-fetch');
//Server serverOptions
let serverOptions = {
	appPath: "app/",
	port: 8080
}

function sendFile(req, res, path, ctype){
	console.dir(req.url);
	return fs.readFile(path, (err, data) => {
		if (err) {
			res.writeHead(404, {'Content-Type': 'text/html'});
			return res.end("404 Not Found");
		} else {
			res.writeHead(200, {'Content-Type': ctype});
			res.write(data);
			return res.end();
		}
	});
}

const requestListener = (req, res) => {
	if (req.method === "POST") {
		let body = '';
		let forecast;
	    req.on('data', function (data) {
	        body += data;
	    });
	    req.on('end', function () {
	    	let d = JSON.parse(body);
	    	console.dir(d.data);
	    	let url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + d.data + '&units=metric&mode=json&appid=eecbb437c561f7c59076dd5cff3731c5';
			fetch(url, {method: 'GET'})
			    .then(res => res.json())
			    .then((json) => {
			    	if(json){
			    		let weather = [];
						let dn = parseInt(new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').substring(8, 10));
						let i = 0;
						json['list'].forEach((n)=>{
							if (dn == json['list'][i]['dt_txt'].substring(8, 10)) {
								weather.push({n});
								dn = dn+1;
							}
							i = i+1;
						});
						res.writeHead(200, {'Content-Type': 'application/json'});
					    return res.end(JSON.stringify(weather));
					}
			});
	    });
	} else if (req.url === "/index.html") {
		sendFile(req, res, serverOptions.appPath + req.url.substr(1), 'text/html')
	} else if (req.url === "/ajax.js" || req.url === "/script.js") {
		sendFile(req, res, serverOptions.appPath + req.url.substr(1), 'text/javascript')
	} else {
		sendFile(req, res, 'index.html', 'text/html')
	}
}
const server = http.createServer(requestListener);
server.listen(serverOptions.port);
console.log("Server is listening on localhost:" + serverOptions.port + "...")