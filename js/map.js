function initMap() {

	// Google maps is ready to be used
	var theDiv = document.querySelector('#judomap');

	// Data on the Dojo
	var judoData = {
		lat: -41.259561,
		lng: 174.952727
	};

	// Create the map
	var mapOptions = {
		zoom: 15,
		center: judoData
	};

	var theMap = new google.maps.Map(theDiv, mapOptions);
	// Options for the Judo Marker
	var judoMarkerOptions = {
		position: judoData,
		map: theMap,
		icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
	};
	// Now we can create markers
	var judoMarker = new google.maps.Marker( judoMarkerOptions );

	// Find out where the user is
	// Make sure the device has Geolocation capabilities
	if( navigator.geolocation ) {
		navigator.geolocation.getCurrentPosition(function(position){

			console.log(position);

			var userData = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};

			//Prepare marker options
			var userMarkerOptions = {
				position: userData,
				map: theMap
			} 

			// Create a marker to represent the user
			var userMarker = new google.maps.Marker( userMarkerOptions );

			// prepare the logic
			var directionsService = new google.maps.DirectionsService();

			//prepare the gpu
			var directionsDisplay = new google.maps.DirectionsRenderer();

			//tell the gpu which map to paint on
			directionsDisplay.setMap(theMap);

			// directions settings
			var directionSettings = {
				origin: userData,
				destination: judoData,
				travelMode: google.maps.TravelMode['DRIVING']
			};

			// do the calculations (This is actually sent to google)
			directionsService.route(directionSettings, function(response, status){
				if (status === 'OK') {
					directionsDisplay.setDirections(response);
				}
			});
		});
		// Yes the device has Geolocation capabilities

	} else {
		// dead
	}


}