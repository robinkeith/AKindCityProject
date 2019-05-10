mapId="map";


//function createMap(mapId) {

  //var map = L.map('map').setView([51.505, -0.09], 13);;

  var map=  L.map(mapId, {
    center: [52.627653,1.291114],
    zoom: 15,
    zoomControl: false
  });
  L.tileLayer.provider('OpenStreetMap.Mapnik').addTo(map);
  L.control.pan({ position: 'topleft' }).addTo(map);
  L.Control.zoomHome({position: 'topleft'}).addTo(map);

  var attr_osm = 'Map data &copy; <a href="https://openstreetmap.org/">OpenStreetMap</a> contributors',
  attr_overpass = 'POI via <a href="https://www.overpass-api.de/">Overpass API</a>';
  //var osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {opacity: 0.7, attribution: [attr_osm, attr_overpass].join(', ')});

  //var map = new L.Map('map').addLayer(osm).setView(new L.LatLng(52.265, 10.524), 14);

  //OverPassAPI overlay
  var opl = new L.OverPassLayer({
    query: "node(BBOX)['amenity'='toilets'];out;",
    endpoint: "https://overpass-api.de/api/"
  });

  map.addLayer(opl);
  
  //L.tileLayer.provider('OpenStreetMap.HOT').addTo(map);