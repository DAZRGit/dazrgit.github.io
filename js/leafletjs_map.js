
var L;

function init() {
    var mapElement = document.getElementById('mapid');
    var jsonArray = "when";
    var centerMap =[40.710250, -3.678752];
    if(mapElement  == null)
    {
        mapElement = document.getElementById('mapid2');
        jsonArray = "guest";
        centerMap =[40.733143, -3.575531]
        if(mapElement == null)
            return;
    }

    var mymap = L.map(mapElement).setView(centerMap, 12);
    // Add layer to map
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 20,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiZGlhbmFhenIiLCJhIjoiY2p2YmR6amh1MHR6NTQ0cW11ODIwbm9yNyJ9.PPSKI9VvvGKFI08yRJBiuQ'
    }).addTo(mymap);
    //Create and open InfoWindow.
   
    // JSON
    var json =[];
    if(jsonArray == "when")
    {
        json = [{
            "title": "Ceremonia - Basílica de Nuestra señora de Colmenar Viejo",
            "lat":  40.657681, 
            "lng":  -3.766327,
        }, {
            "title": "Fiesta - Finca La Dehesilla",
            "lat": 40.725285,
            "lng": -3.563794,
        }];
    }
    else{
        json = [{
            "title": "Fiesta - Finca La Dehesilla",
            "lat": 40.725285,
            "lng": -3.563794,
        },
        {
            "title": "Hostal - Alcudia Sierra Norte",
            "lat":  40.732751, 
            "lng":  -3.582009,
        }, {
            "title": "Hostal - Azul",
            "lat": 40.736115,
            "lng": -3.584128,
        }];
    }
    var arr = [];
    // Loop the JSON
    for (var i = 0, length = json.length; i < length; i++) {
        var data = json[i];
        // Create the markers
        var marker = L.marker([data.lat, data.lng])
                      .addTo(mymap)
                      .bindPopup("<div style = 'width:150px;height:50px'>" + "<a href='http://maps.google.com?q="+data.lat+","+data.lng+"'>"+data.title +"</a>"+ "</div>");
        arr.push([data.lat,data.lng]);    
    
    }
     //  Fit these bounds to the map  
     var bounds = new L.LatLngBounds(arr);
     map.fitBounds(bounds);
}
if (typeof L != 'undefined')
{
    init();
}