function getWeather(data, i) {
	return data[i].n.weather[0].description;
}
function getTemp(data, i) {
	return data[i].n.main.temp;
}
function getDate(data, i) {
	return data[i].n.dt_txt.substring(0, 10);
}
function getIcon(data, i, parent) {
	let img = document.createElement('img'); 
    img.src = 'http://openweathermap.org/img/wn/' + data[i].n.weather[0].icon + '@2x.png';
    parent.appendChild(img);
}
function send() {
	let city = document.getElementById("city").value;
	if (city) {
		console.log(city);
		ajax("sendCity", city, (data) => {
			let parent = document.getElementById('view');
			parent.innerHTML = '';
			for (let i = 0; i < 6; i++) {
				let node = document.createElement('DIV');
				let child = document.createElement('p');
				child.innerHTML = "<span>" + getDate(data, i) + "</span><br>" + "T: " + Math.round(getTemp(data, i)) + "&#8451;";
				node.appendChild(child);
				getIcon(data, i, node);
				parent.appendChild(node);
			}
		});
	}
}