const myMap = L.map('map').setView([27.7172, 85.3240], 10);
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution =  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tiles = L.tileLayer(tileUrl,{ attribution });
tiles.addTo(myMap);

function generateList(){
    let ul = document.querySelector('.list');
    storeList.forEach((data)=>{
        let li = document.createElement('li');
        let div = document.createElement('div');
        let a = document.createElement('a');
        let p = document.createElement('p');
        a.addEventListener('click',()=>{
            flyToStore(data);
        });
        div.classList.add('shop-item');
        a.innerText = data.properties.name;
        a.href = '#';
        p.innerText = data.properties.address;

        div.appendChild(a);
        div.appendChild(p);
        li.appendChild(div);
        ul.appendChild(li);
    });
}
generateList();

function makePopupContent(data){
    return `
        <div>
        <h4>${data.properties.name}</h4>
        <p>${data.properties.address}</p>
        <div class="phone-number">
        <a href="tel:${data.properties.phone}">${data.properties.phone}</a>
</div>
</div>
    `;
}

function onEachFeature(feature,layer){
    layer.bindPopup(makePopupContent(feature),{ closeButton: false,offset: L.point(0,-8)});
}
const myIcon = L.icon({
    iconUrl: 'my-icon.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
});
const shopLayer = L.geoJSON(storeList,{
    onEachFeature: onEachFeature,
    pointToLayer: function(feature,latlng){
        return L.marker(latlng,{ icon: myIcon});
    }
});
shopLayer.addTo(myMap);

//fly from one point to other
function flyToStore(data){
    const lat = data.geometry.coordinates[1];
    const lan = data.geometry.coordinates[0];
    myMap.flyTo([lat,lan],15,{
        // animate: false,
        duration: 3 ,// duration in sec
    }); //longitude and latitude
    setTimeout(() => {
        L.popup({closeButton: false, offset: L.point(0, -8)})
            .setLatLng([lat, lan])
            .setContent(makePopupContent(data))
            .openOn(myMap);
    }, 3000);
}
