const map = L.map('map').setView([27.7172, 85.3240], 10);
//s->sub domain,z->zoom level , x and y are coordinates
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution =  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tiles = L.tileLayer(tileUrl,{ attribution });
tiles.addTo(map);

//circle layer
const CLayer = L.circle([27.7172, 85.3240],{radius:500});
CLayer.addTo(map);

// define rectangle geographical bounds and its layer
var bounds = [[54.559322, -5.767822], [56.1210604, -3.021240]];
const rectangle = L.rectangle(bounds,{color: "#ff7800", weight: 1});
rectangle.addTo(map);

//create a red polygon from an array of LatLng points
var latlngs = [[37, -109.05],[41, -102.05],[37, -102.04]];
var polygon = L.polygon(latlngs, {color: 'red'}).addTo(map);

// create a red polyline from an array of LatLng points
var polylineData = [
    [45.51, -122.68],
    [37.77, -122.43],
    [34.04, -118.2]
];
var polyline = L.polyline(polylineData, {color: 'green'}).addTo(map);
// zoom the map to the polyline
// map.fitBounds(polyline.getBounds());

//circle marker in map
const cmarker = L.circleMarker([50.5, 30.5]);
cmarker.addTo(map);

//only marker
const myIcon = L.icon({
    iconUrl: 'my-icon.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
});
const popUpMarker = L.marker([27.7172, 85.3240],{title:'nepal',icon:myIcon});
popUpMarker.bindPopup('<p>Hello world!<br />This is a nice popup.</p>');
popUpMarker.addTo(map);

