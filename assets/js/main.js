mapId="map";

 
let baseMaps = {
  "Mapnik":  L.tileLayer.provider('OpenStreetMap.Mapnik'),
  "2.5D" : building25Dlayer(),
  "Mono":  L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }),
  "OSM Vivid": L.tileLayer.provider('OpenStreetMap.HOT')
};

let overlayMaps = {
  "Toilets": overpassLayerByAmmenity('"amenity=toilets"'),
  "Accessible": overpassLayerByAmmenity('"wheelchair"="yes"'),
  "NOT Accessible": overpassLayerByAmmenity('"wheelchair"="no"')
};


function building25Dlayer(){

  const mapBoxAPIkey="pk.eyJ1Ijoicm9iaW5rZWl0aCIsImEiOiJjanZrdnV1cDUwdGRuNGJtbHViNmQ4ZHh6In0.eZvncacC218djhVbySv5CQ";

  return L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: mapBoxAPIkey
  });
  /*return new L.TileLayer('https://{s}.tiles.mapbox.com/v3/'+ mapBoxAPIkey +'/{z}/{x}/{y}.png', {
    attribution: '© Map tiles <a href="https://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    maxNativeZoom: 20
  });*/
  //var osmb = new OSMBuildings(map).load('https://{s}.data.osmbuildings.org/0.2/anonymous/tile/{z}/{x}/{y}.json');
}

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
  
  var gps = new L.Control.Gps({
		//autoActive:true,
		autoCenter:true
	});//inizialize control

	gps
    .on('gps:located', function(e) {
    //	e.marker.bindPopup(e.latlng.toString()).openPopup()
    console.log(e.latlng)
    })
    .on('gps:disabled', function(e) {
      e.marker.closePopup()
    });

	gps.addTo(map);
  
  
  

  L.easyButton( 'fa-cubes', function(){
    window.location.href = "map3d.html";
    }, "View a 3D map").addTo(map);

  /*
 
  */

  
  L.control.layers(baseMaps, overlayMaps).addTo(map);