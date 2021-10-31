let d = new Date()
// Create a new date instance dynamically with JS
let newDate = d.getMonth()+1+'/'+ d.getDate()+'/'+ d.getFullYear();
/* Global Variables */
let URL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const Key ="2526672c019a649b32d1fca91317d30e"
// when we click on genetate button 
document.getElementById('generate').addEventListener("click", Go);
//the Go function will execute when clicking
async function Go(e){
    // get the data from inputs
    const zip =  document.getElementById('zip').value;
    const feelings =  document.getElementById('feelings').value;
    // get information from API
    const response = await fetch(`${URL}${zip},us&appid=${Key}`);
    let Temps = await response.json();
    sendTemps('/posting',{date:newDate,temp:Temps.main.temp,content:feelings}).then(updateUI())
}
// send data to the server
async function sendTemps (url = '',data = {}){
    const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    });
    try{
        const updatedData = await response.json();
        console.log(updatedData);
        return updatedData;
    }catch(error){
    console.log("error", error);
    }
}
//to Update the data
async function updateUI() {
    const req = await fetch('/Total')
    try{
        const allData =await req.json()
        const Date = document.getElementById('date');
        const Temperature = document.getElementById('temp');
        const Feelings = document.getElementById('content');
        Date.innerHTML = `Today is: ${allData.Date}`;
        Temperature.innerHTML =`Temprature: ${allData.Temperature}`;
        Feelings.innerHTML =`I feel ${allData.Feelings}`;
    }catch(error) {
        console.log("error", error);
    }
}