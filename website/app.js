/* Global Variables */
const baseURL ='https://api.openweathermap.org/data/2.5/weather?zip=';
const myApiKey ='&appid=65a57428e701420c62486da64bfa6120&units=imperial';
const serverURL ="http://localhost:4000/";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();




//add event listener to button
 document.getElementById("generate").addEventListener("click" , getUserInput);

// function  listens to event listener
function getUserInput(e){
// user inputs
  const userZipCode =  document.getElementById('zip').value;
  let userFeeling = document.getElementById('feelings').value;
  //API call
 requestWeather(baseURL,userZipCode,myApiKey)

.then(function (data){
console.log(data);


// send data to the server  and save it
  postData("/saveData", {date :d , temp : data.main.temp , content: userFeeling});
  viewData();


  })
}



// get wep API data 
const requestWeather = async (baseURL, userZipCode, myApiKey)=>{
  
  const res = await fetch(baseURL+userZipCode+myApiKey)
  try {
    const data = await res.json();
 
    console.log(data)
   
    return data;
  }  catch(error) {
    console.log("error", error);
  }
}





// Async POST function to send data to server 
const postData = async ( url ="", data = {})=>{
console.log(data);
  const response = await fetch(`${serverURL}saveData`, {
  method: 'POST', 
  credentials: 'same-origin', 
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify(data), // body data type must match "Content-Type" header  
     
});

  try {
    const newData = await response.json();
    return newData;
  }catch(error) {
  console.log("error", error);
  }
};
// retrieve data  and update UI
const viewData = async () =>{
  const res = await fetch(`${serverURL}all`);
  try {
  // Transform into JSON
  const allData = await res.json()
  console.log(allData)
  // Write updated data to DOM elements
  document.getElementById('temp').innerHTML = Math.round(allData.temp)+ '  degrees';
  document.getElementById('content').innerHTML = allData.content;
  document.getElementById('date').innerHTML =allData.date;
  }
  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
 }