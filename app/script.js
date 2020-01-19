function getWeather(data, i){
	return data[i].n.weather[0].description;
}
function getTemp(data, i){
	return data[i].n.main.temp;
}
function getDate(data, i){
	return data[i].n.dt_txt.substring(0, 10);
}
function getIcon(data, i, parent){
	let img = document.createElement('img'); 
    img.src = 'http://openweathermap.org/img/wn/' + data[i].n.weather[0].icon + '@2x.png';
    parent.appendChild(img);
}
function send(){
	let city = document.getElementById("city").value;
	if (city) {
		console.log(city);
		ajax("sendCity", city, (data) => {
			table = document.getElementById("t");
			for (let i = 0; i < 6; i++) {
				let node = document.getElementById(i);
				node.innerHTML = getDate(data, i) + ":<br>" + "T: " + getTemp(data, i) + "&#8451;";
				document.getElementById(i+6).innerHTML = '';
				getIcon(data, i, document.getElementById(i+6));
			}
		});
	}
}