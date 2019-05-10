mapId="map";


//function createMap(mapId) {

  //var map = L.map('map').setView([51.505, -0.09], 13);;

  var map=  L.map(mapId, {
    center: [52.627653,1.291114],
    zoom: 15,
    zoomControl: false
  });
  L.tileLayer.provider('OpenStreetMap.Mapnik').addTo(map);
  L.control.pan().addTo(map);
 // L.control.zoomHome({position: 'topright'}).addTo(map);
  
  //L.tileLayer.provider('OpenStreetMap.HOT').addTo(map);