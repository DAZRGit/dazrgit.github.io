
var google;

function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    // var myLatlng = new google.maps.LatLng(40.71751, -73.990922);
    var myLatlng = new google.maps.LatLng(11.997682, 121.915627);
    // 39.399872
    // -8.224454
    
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 9,

        // The latitude and longitude to center the map (always required)
        center: myLatlng,

        // How you would like to style the map. 
        scrollwheel: false,
        styles: [{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"hue":"#f49935"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"hue":"#fad959"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"hue":"#a1cdfc"},{"saturation":30},{"lightness":49}]}]
    };    

    // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');

    // Create the Google Map using out element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);
    
    // JSON
    var json = [{
        "title": "Ceremonia - Basílica de Nuestra señora de Colmenar Viejo",
        "lat":  40.657681, 
        "lng":  -3.766327,
    }, {
        "title": "Fiesta - Por determinar",
        "lat": 40.437715, 
        "lng": -3.637652,
    }]
    var arr = [];
    // Loop the JSON
    for (var i = 0, length = json.length; i < length; i++) {
        var data = json[i],
        // Create the waypoints
        latLng = new google.maps.LatLng(data.lat, data.lng);
        arr.push(latLng);

        // Create the markers
        var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: data.title,
            icon: 'images/loc.png'
        });
    }
     //  Fit these bounds to the map
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < arr.length; i++) {
      bounds.extend(arr[i]);
    }
    map.fitBounds(bounds);    
}
google.maps.event.addDomListener(window, 'load', init);