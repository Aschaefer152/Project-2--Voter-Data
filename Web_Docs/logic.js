
//   // Create the tile layer that will be the background of our map
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

  let grayscale= L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  // Initialize all of the LayerGroups we'll be using
let layers = {
  Age: lightmap,
  Race: darkmap,
  Gender: grayscale
};

//   // Create the map object with options
  var myMap = L.map("map", {
    center: [39.8283, -98.5795],
    zoom: 5.5,
    layers: [
      layers.Age,
      layers.Race,
      layers.Gender
    ]});

    let overlays = {
      "Coming Soon": layers.Age,
      "Empty Stations": layers.Race,
      "Low Stations": layers.Gender
    };


//   // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
L.control.layers(layers).addTo(myMap);

// marker colors
  var greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  var redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  var blackIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });


function createMarkers(data){

  console.log(data)
  // Pull the "stations" property off of response.data
  let state = data['State'];
  let lat = data['Lat'];
  let lng = data['Lng'];
  let reg = data['Reg'];
  let ages = data['Age'];//['18 to 24']['Percent Citizens Registered'][0]
  
  let ageList=[]

  // icon color assignments 
  if (reg== 'Election Day'){
    iconColor = greenIcon
  } else if (data['Reg']== 'Early Voting'){
    iconColor = redIcon
  } else {
    iconColor = blackIcon
  };

  
  for (fake in ages){
    // push the age group to a list to be used as a header
    ageList.push(fake)
  };


let table=`<table><thead><strong>${state}</strong><tr><td><strong>Age Groups</strong></td><td><strong>Citizens Registered (%)</strong></td><td><strong>Citizens Voted (%)</strong></td><td><strong>Citizen Population (000's)</strong></td></tr></thead>
<tr><td><strong>${ageList[0]}</strong></td><td>${data['Age']['18 to 24']['Percent Citizens Registered'][0]}%</td><td>${data['Age']['18 to 24']['Percent Citizens Voted'][0]}%</td><td>${data['Age']['18 to 24']['Total Citizen Population'][0]}</td></tr>
<tr><td><strong>${ageList[1]}</strong></td><td>${data['Age']['25 to 34']['Percent Citizens Registered'][0]}%</td><td>${data['Age']['25 to 34']['Percent Citizens Voted'][0]}%</td><td>${data['Age']['25 to 34']['Total Citizen Population'][0]}</td></tr>
<tr><td><strong>${ageList[2]}</strong></td><td>${data['Age']['35 to 44']['Percent Citizens Registered'][0]}%</td><td>${data['Age']['35 to 44']['Percent Citizens Voted'][0]}%</td><td>${data['Age']['35 to 44']['Total Citizen Population'][0]}</td></tr>
<tr><td><strong>${ageList[3]}</strong></td><td>${data['Age']['45 to 64']['Percent Citizens Registered'][0]}%</td><td>${data['Age']['45 to 64']['Percent Citizens Voted'][0]}%</td><td>${data['Age']['45 to 64']['Total Citizen Population'][0]}</td></tr>
<tr><td><strong>${ageList[4]}</strong></td><td>${data['Age']['65+']['Percent Citizens Registered'][0]}%</td><td>${data['Age']['65+']['Percent Citizens Voted'][0]}%</td><td>${data['Age']['65+']['Total Citizen Population'][0]}</td></tr>
<tr><td><strong>${ageList[5]}</strong></td><td>${data['Age']['Total']['Percent Citizens Registered'][0]}%</td><td>${data['Age']['Total']['Percent Citizens Voted'][0]}%</td><td>${data['Age']['Total']['Total Citizen Population'][0]}</td></tr>

</table>`

newmarker=L.marker([lat,lng],{icon:iconColor}).bindPopup(table).addTo(myMap);

  // console.log(ages)

};

d3.json("../Data/data.json").then((importedData) => {
  importedData.forEach(createMarkers)
});