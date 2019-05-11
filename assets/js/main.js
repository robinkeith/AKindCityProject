mapId="map";

 
let baseMaps = {
  "Mapnik":  L.tileLayer.provider('OpenStreetMap.Mapnik'),
  "OSM Vivid": L.tileLayer.provider('OpenStreetMap.HOT')
};

let overlayMaps = {
  "Toilets": overpassLayerByAmmenity('"amenity=toilets"'),
  "Accessible": overpassLayerByAmmenity('"wheelchair"="yes"'),
  "NOT Accessible": overpassLayerByAmmenity('"wheelchair"="no"')
};


 function overpassLayerByAmmenity(test){
  let query='(node[' + test+'](BBOX);way[' + test+'](BBOX););out;&gt;;out skel qt;';
  //relation['+ test+'](BBOX);
  return new L.OverPassLayer({
    debug: false,
    //markerIcon: L.Icon(),
    timeout: 30 * 1000, // Milliseconds
  
    query: query,
    endpoint: "https://overpass-api.de/api/"
  });
 }


  var map=  L.map(mapId, {
    center: [52.627653,1.291114],
    zoom: 15,
    zoomControl: false,
    layers:[baseMaps["Mapnik"]]
  });
  //L.tileLayer.provider('OpenStreetMap.Mapnik').addTo(map);
  L.control.pan({ position: 'topleft' }).addTo(map);
  L.Control.zoomHome({position: 'topleft'}).addTo(map);

  L.easyButton( 'fa-cubes', function(){
    window.location.href = "map3d.html";
    }, "View a 3D map").addTo(map);

  /*
 
  */

  
  L.control.layers(baseMaps, overlayMaps).addTo(map);