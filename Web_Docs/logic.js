

//   // Create the tile layers that will be the background of our map
let lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 5,
    id: "light-v10",
    accessToken: API_KEY
  });

let darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 5,
    id: "dark-v10",
    accessToken: API_KEY
  });

let streets= L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    maxZoom: 5,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

// Create the marker colors for our icons
let greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

let redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

let blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// create the overlays group
let overlays = {
  Election_Day:new L.LayerGroup(),
  Early_Voting:new L.LayerGroup(),
  No_Registration:new L.LayerGroup()
};

// begin to go through our data
d3.json("../Data/data.json").then((importedData) => {
  importedData.forEach(createMarkers)
});


  function createMarkers(data){

    // Pull the state, lat, long, election registration "law", and age group dictionary property off of response.data
    let state = data['State'];
    let lat = data['Lat'];
    let lng = data['Lng'];
    let reg = data['Reg'];
    let ages = data['Age'];
    
    //create an empty age list
    let ageList=[]
  
    for (ageGroup in ages){
      // push the age group to a list to be used as a header in the popup table
      ageList.push(ageGroup)
    };
  
    // creating the table
    let table=`<table><thead><strong>${state}</strong><tr><th><strong>Age Groups</strong></th><th><strong>Citizens Registered (%)</strong></th><th><strong>Citizens Voted (%)</strong></th><th><strong>Citizen Population (000's)</strong></th></tr></thead>
    <tr><td><strong>${ageList[0]}</strong></td><td>${data['Age']['18 to 24']['Percent Citizens Registered'][0]}%</td><td>${data['Age']['18 to 24']['Percent Citizens Voted'][0]}%</td><td>${data['Age']['18 to 24']['Total Citizen Population'][0]}</td></tr>
    <tr><td><strong>${ageList[1]}</strong></td><td>${data['Age']['25 to 34']['Percent Citizens Registered'][0]}%</td><td>${data['Age']['25 to 34']['Percent Citizens Voted'][0]}%</td><td>${data['Age']['25 to 34']['Total Citizen Population'][0]}</td></tr>
    <tr><td><strong>${ageList[2]}</strong></td><td>${data['Age']['35 to 44']['Percent Citizens Registered'][0]}%</td><td>${data['Age']['35 to 44']['Percent Citizens Voted'][0]}%</td><td>${data['Age']['35 to 44']['Total Citizen Population'][0]}</td></tr>
    <tr><td><strong>${ageList[3]}</strong></td><td>${data['Age']['45 to 64']['Percent Citizens Registered'][0]}%</td><td>${data['Age']['45 to 64']['Percent Citizens Voted'][0]}%</td><td>${data['Age']['45 to 64']['Total Citizen Population'][0]}</td></tr>
    <tr><td><strong>${ageList[4]}</strong></td><td>${data['Age']['65+']['Percent Citizens Registered'][0]}%</td><td>${data['Age']['65+']['Percent Citizens Voted'][0]}%</td><td>${data['Age']['65+']['Total Citizen Population'][0]}</td></tr>
    <tr><td><strong>${ageList[5]}</strong></td><td>${data['Age']['Total']['Percent Citizens Registered'][0]}%</td><td>${data['Age']['Total']['Percent Citizens Voted'][0]}%</td><td>${data['Age']['Total']['Total Citizen Population'][0]}</td></tr>
    
    </table>`
  
    // create a blank value to use and assign the correct state to the right overlay
    let registrationCode;

  // Creating the marker color and binding the table
    // icon color assignments 
    if (reg== 'Election Day'){
      let iconColor = greenIcon
      let newMarker=L.marker([lat,lng],{icon:iconColor}).bindPopup(table) 
      registrationCode="Election_Day"
      newMarker.addTo(overlays[registrationCode])
  
    } else if (data['Reg']== 'Early Voting'){
      let iconColor = redIcon
      let newMarker=L.marker([lat,lng],{icon:iconColor}).bindPopup(table)
      registrationCode="Early_Voting"
      newMarker.addTo(overlays[registrationCode])
      

    } else {
      let iconColor = blueIcon
      let newMarker=L.marker([lat,lng],{icon:iconColor}).bindPopup(table)
      registrationCode="No_Registration"
      newMarker.addTo(overlays[registrationCode])

    };
  }

// create the layer groups based on the newly created markers
let Election_Day = overlays.Election_Day;
let Early_Voting = overlays.Early_Voting;
let No_Registration = overlays.No_Registration;

// define the basemaps
let baseMaps= {
  "Light": lightmap,
  "Dark": darkmap,
  "Street": streets
};

// intiate the map
let myMap = L.map("map", {
  center: [39.8283, -98.5795],
  zoom: 5.5,
  layers: [streets,Election_Day,Early_Voting,No_Registration]
});

// add the basemaps and the overlays to the map
L.control.layers(baseMaps,overlays).addTo(myMap);











