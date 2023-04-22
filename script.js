const getWeatherInfo = async (location) => {
	// Get weather info from weatherapi.com
	try {
		const response = await fetch(
			"https://api.weatherapi.com/v1/current.json?key=f4b4c23936914e548aa25501232104&q=" +
				location
		);

		const json = await response.json();
		return json;
	} catch (err) {}
};

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const location = e.target.querySelector("input").value;

	getWeatherInfo(location).then(function (json) {
		console.log(json);
	});
});
