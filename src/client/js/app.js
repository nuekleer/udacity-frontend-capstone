function handleSubmit(event, url) {
    event.preventDefault();
    //make post call - get api data - update UI
    Client.postData(url, {city:document.getElementById('city').value}).then(function(data){
        Client.postWeather('/getWeather',{lat:data.lat, lng:data.lng, start_date: document.getElementById('start-date').value, end_date: document.getElementById('end-date').value}).then(
                Client.postPix('/getPic',{city: document.getElementById('city').value}));
    });
    document.getElementById("add-trip-form").style.display = "none";
}
function handleShowForm(event){
    document.getElementById("add-trip-form").style.display = "block";
};

export { handleSubmit, handleShowForm }



