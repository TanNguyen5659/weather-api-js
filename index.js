const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "3ada86d8768ec5ceb8b7f7177f32f018";

weatherForm.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
    event.preventDefault();

    const city = cityInput.value;

    if (city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error("Could not fetch weather data");
            }

            const weatherData = await response.json();
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error);
            displayError(error);
        }
    } else {
        displayError("Please enter a valid city");
    }
}

function displayWeatherInfo(data) {
    console.log(data);
    const { weather, name: city, main: { temp, temp_max, temp_min, humidity }, weather: [{ description }] } = data;

    const { id } = weather[0];

    let backgroundColor;

    switch (true) {
        case id >= 200 && id < 300: // Thunderstorm
            backgroundColor = '#2c3e50'; // Dark blue
            break;
        case id >= 300 && id < 400: // Drizzle
            backgroundColor = '#3498db'; // Blue
            break;
        case id >= 500 && id < 600: // Rain
            backgroundColor = '#2980b9'; // Light blue
            break;
        case id >= 600 && id < 700: // Snow
            backgroundColor = '#f2f4f7'; // Light gray
            break;
        case id >= 700 && id < 800: // Atmosphere
            backgroundColor = '#34495e'; // Dark gray
            break;
        case id === 800: // Clear
            backgroundColor = '#1abc9c'; // Green
            break;
        case id > 800 && id < 900: // Clouds
            backgroundColor = '#7f8c8d'; // Gray
            break;
        default:
            backgroundColor = '#95a5a6'; // Light gray
            break;
    }

    document.body.style.backgroundColor = backgroundColor;

    card.innerHTML = `
        <h1 class="cityDisplay">${city}</h1>
        <p class="tempDisplay">${temp.toFixed(1)}°F</p>
        <p class="humidityDisplay">High: ${temp_max.toFixed(1)}°F</p>
        <p class="humidityDisplay">Low: ${temp_min.toFixed(1)}°F</p>
        <p class="humidityDisplay">Humidity: ${humidity}%</p>
        <p class="descDisplay">${description}</p>
    `;
    card.style.display = "flex";
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}
