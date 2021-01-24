
// Personal API Key for OpenWeatherMap API
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let key = '661daa7377189bfe425b6af1f07ac279';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

// Function called by event listener
function performAction(e) {
    const postCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    console.log(newDate);
    getTemperature(baseURL, postCode, key)
        .then(function (data) {
            // Add data to POST request
            postData('http://localhost:3000/addWeatherData', { temperature: data.main.temp, date: newDate, user_response: feelings })
                // Function which updates UI
                .then(function () {
                    updateUI()
                })
        })
}

/* Function to GET Web API Data*/
const getTemperature = async (baseURL, code, key) => {
    const response = await fetch(`${baseURL}${code},us&APPID=${key}`)
    console.log(response);
    try {
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.log('error', error);
    }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const postRequest = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await postRequest.json();
        return newData;
    }
    catch (error) {
        console.log('Error', error);
    }
}

// Update user interface
const updateUI = async () => {
    const request = await fetch('http://localhost:3000/all');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.user_response;
    }
    catch (error) {
        console.log('error', error);
    }
}
