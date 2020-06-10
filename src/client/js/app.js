//handle submitting form
//quad call to get geo info, get weather, get pic, update ui
function handleSubmit(event, url) {
    event.preventDefault();
    //make post call - get api data - update UI
    Client.postData(url, {city:document.getElementById('city').value}).then(function(data){
        Client.postWeather('/getWeather',{lat:data.lat, lng:data.lng, start_date: document.getElementById('start-date').value, end_date: document.getElementById('end-date').value}).then(
            Client.postPix('/getPic',{city: document.getElementById('city').value}).then(Client.showData));
    });
    document.getElementById("add-trip-form").style.display = "none";
    document.getElementsByTagName("nav")[0].style.display = "block";
}
//just a hide show on button click
function handleShowForm(event){
    document.getElementById("add-trip-form").style.display = "block";
};
//remove current trip ui section
function removeTrip(){
    document.getElementById("current-trip").style.display = "none";
    document.getElementsByTagName("nav")[0].style.display = "none";
    document.getElementById("add-trip-form").style.display = "block";
};
//initialize date pickers
function init(){
    let today = new Date();
    today = new Date(today.getTime() + today.getTimezoneOffset() * 60000);
    today = today.getFullYear()+"-"+("0" + (today.getMonth()+1)).slice(-2)+"-"+("0" + today.getDate()).slice(-2);
    document.getElementById("start-date").min = today;
    document.getElementById("end-date").min = today;
}

export { handleSubmit, handleShowForm, removeTrip, init }



