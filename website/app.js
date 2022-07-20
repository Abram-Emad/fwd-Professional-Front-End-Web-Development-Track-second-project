// Personal API Key for OpenWeatherMap API
const apiKey = "&appid=76ab340b72821f1b351b5805f73ba4b0&units=metric";
const apiUrl = "http://localhost:4400/";
const catchingerror = (error) => console.error('Three are some errors => ', error);
const generate = document.getElementById('generate');

// Event listener to chang style display from none to block
generate.addEventListener ("click", () => {
  let Display = document.getElementById("holderentry");
    if ( Display.style.display == "none") {
        Display.style.display = "block";
    } else {
        Display.style.display = "block";
    }
}, false);

// Event listener to add function to existing HTML DOM element
/* Function called by event listener */
generate.addEventListener('click',() => {
    const zipCode = document.getElementById('zip');
    const feelings = document.getElementById('feelings');
    // Create a newdate instance dynamically with JS
    let d = new Date();
    let newDate = d.getMonth() +1 +'/'+d.getDate()+'/'+d.getFullYear();
    let data = {
        zipCode: zipCode.value,
        content: feelings.value,
        date: newDate
    };
    getinginformation(data.zipCode).then(zipinformation => {
        if (zipinformation.cod != 200)
            return alert(zipinformation.message)
        data.temp = zipinformation.list[0].main.temp;
        data.maxtemp = zipinformation.list[0].main.temp_max;
        data.mintemp = zipinformation.list[0].main.temp_min;
        ToServer(data);
    }).catch(catchingerror);
});

/* Geting ZipCode Information */
const  getinginformation = async (zipCode) => {return await (await fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}${apiKey}`)).json()}

/* Function to POST data */
const ToServer = async (data) => {
    let response = await fetch(`${apiUrl}add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    try {
        if (!response.ok) {
            alert('Process Failed');
            return;
        }
        response.json().then(data => {
            if (response.ok)
                UpdatingTheUI();
            else
                alert('Process Failed');
        }).catch(catchingerror);

    } catch (error) {
        catchingerror(error);
    }
};

/* Updateing UI */
const UpdatingTheUI = async () => {
    let response = await fetch(`${apiUrl}All`);
    try {
        response.json().then(data => {
            const EleTemp = document.getElementById('temp').innerHTML = `Temprature in Celsius is: ${data.temp}`;
            const EleMaxTemp = document.getElementById('maxtemp').innerHTML = `Maximum Temp is: ${data.maxtemp}`;
            const EleMinTemp = document.getElementById('mintemp').innerHTML = `Minimum Temp is: ${data.mintemp}`;
            const EleDate = document.getElementById('date').innerHTML = `Date is: ${data.date}`;
            const EleContent = document.getElementById('content').innerHTML = `Your Feelings is: ${data.content}`;
        })
    } catch (error) {
        catchingerror(error);
    }
};
