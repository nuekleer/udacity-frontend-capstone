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
