let d = new Date()
// Create a new date instance dynamically with JS
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey ="2526672c019a649b32d1fca91317d30e"
// when we click on genetate button 
document.getElementById('generate').addEventListener("click", Go);
function Go(e){
    // get the data from inputs
    const zip =  document.getElementById('zip').value;
    const feelings =  document.getElementById('feelings').value;
    getWeather(baseURL, zip , apiKey)
    .then(function(data){
        postData('/add',{date:newDate,temp:data.main.temp,content:feelings}
        ).then(updateUI())
    })
}
// get the data from API
async function getWeather(baseURL, zip , apiKey){
    const response = await fetch(`${baseURL}${zip},us&appid=${apiKey}`)
    try{
        const data = await response.json();
        return data;
    }catch(error){
        console.log("error", error);
    }
}
// send data to the server
async function postData (url = '',data = {}){
    const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    });
    try{
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error){
    console.log("error", error);
    }
}
//to Update the data
async function updateUI() {
    const req = await fetch('/all')
    try{
        const allData =await req.json()
        document.getElementById('date').innerHTML= `Date: ${allData[0].date}`;
        document.getElementById('temp').innerHTML= `Temprature: ${allData[0].temp}`;
        document.getElementById('content').innerHTML=`I feel ${allData[0].content}`;
    }catch(error) {
        console.log("error", error);
    }
}