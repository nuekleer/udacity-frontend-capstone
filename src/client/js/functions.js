export const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
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
    }
    catch(error) {
        console.log("error", error);
        alert("Unable to look up article at this time");
    }
}

export const postWeather = async ( url = '', data = {})=>{
    const response = await fetch(url, {
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
    }
    catch(error) {
        console.log("error", error);
        alert("Unable to look up weather at this time");
    }
}

export const postPix = async ( url = '', data = {})=>{
    const response = await fetch(url, {
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
    }
    catch(error) {
        console.log("error", error);
        alert("Unable to look up photo at this time");
    }
}

export const showData = async (url = "") =>{ 
    const request = await fetch("/show");
    try {
      // Transform into JSON
      const allData = await request.json();
      //set html to display latest post
      let startDate = new Date(allData.startDate);
      startDate = new Date(startDate.getTime() + startDate.getTimezoneOffset() * 60000);
      let endDate = new Date(allData.endDate);
      endDate = new Date(endDate.getTime() + endDate.getTimezoneOffset() * 60000);
      
      let duration = (endDate - startDate)/(1000 * 3600 * 24);
      duration = "The duration of your trip is " + duration + " days";

      let today = new Date();
      today = new Date(today.getTime() + today.getTimezoneOffset() * 60000);

      let begin = Math.round((startDate - today)/(1000 * 3600 * 24));

      let beginText = allData.city + ', ' + allData.countryName + " is " + begin + " days away";
      
      startDate = (startDate.getMonth()+1)+"/"+startDate.getDate()+"/"+startDate.getFullYear();
      endDate = (endDate.getMonth()+1)+"/"+endDate.getDate()+"/"+endDate.getFullYear();


      document.getElementById('current-trip-city').innerHTML = allData.city;
      document.getElementById('current-trip-country').innerHTML = allData.countryName;
      document.getElementById('current-trip-start-date').innerHTML = startDate;
      document.getElementById('current-trip-end-date').innerHTML = endDate;
      document.getElementById('current-trip-duration').innerHTML = duration;
      document.getElementById('current-trip-days-away').innerHTML = beginText;
      document.getElementById('current-trip-high-temp').innerHTML = allData.maxTemp;
      document.getElementById('current-trip-low-temp').innerHTML = allData.minTemp;
      document.getElementById('current-trip-weather-desp').innerHTML = allData.weatherD;
      
      document.getElementById('current-trip-pic').src = allData.picURL;
      document.getElementById("current-trip").style.display = "block";
    }
    catch(error) {
        console.log("error", error);
        // appropriately handle the error
        alert("Unable to display data at this time");
    }
  }
