const getWeatherInfo = async (location) => {
	// Get weather info from weatherapi.com
	try {
		const response = await fetch(
			"https://api.weatherapi.com/v1/current.json?key=f4b4c23936914e548aa25501232104&q=" +
				location
		);

		const json = await response.json();
		return json;
	} catch (err) {
		throw "location not found.";
	}
};

const getGifURL = async (state) => {
	const response = await fetch(
		"https://api.giphy.com/v1/gifs/translate?api_key=W57MPdyd2xcoI961iUu8JNCV0H82c6vh&s=" +
			state
	);
	const json = await response.json();
	return json.data.images.original.url;
};

const displayGif = (json) => {
	// if it's lower then 20 degrees celsisu it will get cold-related gifs. and vice versa

	const gif = document.querySelector(".gif");
	const temperature = json.current.temp_c;
	let wordChoice = temperature < 20 ? "cold" : "hot";

	getGifURL(wordChoice).then(function (url_) {
		gif.src = url_;
	});
};

const displayWeather = (json) => {
	const _div = document.querySelector(".display");
	if (_div !== null) {
		_div.remove();
	}

	const table = document.querySelector(".table");

	const div = document.createElement("div");
	div.classList.add("display");

	const h2 = document.createElement("h2");
	const p1 = document.createElement("p");
	const p2 = document.createElement("p");

	h2.textContent = json.location.name;
	p1.textContent = `Temp c ${json.current.temp_c}°`;
	p2.textContent = `Temp f ${json.current.temp_f}°`;

	div.append(h2, p1, p2);
	table.insertBefore(div, document.querySelector(".gif"));
};

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const location = e.target.querySelector("input").value;
	getWeatherInfo(location).then(function (json) {
		displayWeather(json);
		displayGif(json);
	});
});
