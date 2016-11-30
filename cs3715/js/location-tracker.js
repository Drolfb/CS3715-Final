function locationInit() {

	checkLocalStorage();
	randomColor();
	generateHeader();
	findLocation();
	window.setInterval(function(){
		checkLocalStorage();
	  	genTable(); // update the table every second
	}, 1000);

};

var myLatitude;
var myLongitude;
var colors = new Array();

function findLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(createMap)
	}
	else {
		alert("Geolocation's not here man.");
	}
}
function createMap(position) {
	myLatitude = position.coords.latitude;
	myLongitude = position.coords.longitude;

	var cloudMap = new google.maps.LatLng(myLatitude, myLongitude);
	var mapSettings = {
		zoom: 15,
		center: cloudMap
	};
	var mapDiv = document.getElementById("map");
	map = new google.maps.Map(mapDiv, mapSettings);
	
	genTable();
}

function addMarker(map, LatLng, content, icon) {
	var markerOptions = {
			position: LatLng,
			map: map,
			clickable: true,
			icon: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + icon
		};
	var marker = new google.maps.Marker(markerOptions);
	var infoWindowOptions = {
			content: content,
			position: LatLng,
		};
	var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
	
	google.maps.event.addListener(marker, "click", function() {
		infoWindow.open(map);
	});
	
}
function genTable() {
	var i = currentUser;
	var table = document.getElementById("locationTable");
	var tableContent = "<table style=width:100%><tr><th>Name</th><th>Last Location</th><th>Timestamp</th><th>Pin Locations</th></tr>";
	tableContent = tableContent + "<tr><td>" + users[i].fullName + "</td><td>";
	tableContent = tableContent + users[i].location[(users[i].location.length - 1)].latitude + ", " + users[i].location[(users[i].location.length - 1)].longitude + "</td><td>";
	tableContent = tableContent + users[i].location[(users[i].location.length - 1)].timestamp + "</td><td>";
	tableContent = tableContent + "<input type=\"button\" value=\"Pin Locations\" onclick=\"pinLocations(" + i + ");\"/></td></tr>";
	for (i = 0; i < users.length; i++) {
		if (($.inArray(i, users[currentUser].friends) == -1) && i != currentUser) {continue;} // not a friend, omitting this person. but we need to have the current user's location in there too.
		pinLocation(i, users[i].location[(users[i].location.length - 1)].latitude, users[i].location[(users[i].location.length - 1)].longitude, colors[i], users[i].location[(users[i].location.length - 1)].timestamp); // let's pin their location while we're at it!
		if (i == currentUser) {continue;} // this is the current user, omitting their name
		tableContent = tableContent + "<tr><td>" + users[i].fullName + "</td><td>" // their full name
		tableContent = tableContent + users[i].location[(users[i].location.length - 1)].latitude + ", " + users[i].location[(users[i].location.length - 1)].longitude + "</td><td>"; // their location
		tableContent = tableContent + users[i].location[(users[i].location.length - 1)].timestamp + "</td><td>"; // when they put the location in
		tableContent = tableContent + "<input type=\"button\" value=\"Pin Locations\" onclick=\"pinLocations(" + i + ");\"/></td></tr>"; // the button to pin their latest location on the map
	}
	tableContent = tableContent + "</table>";
	table.innerHTML = tableContent;
}
function pinLocation(id, latitude, longitude, icon, timestamp) {
	myLatLng = new google.maps.LatLng({lat: latitude, lng: longitude});
	var content = users[id].fullName + " was at: " + myLatLng + " in " + timestamp;
	addMarker(map, myLatLng, content, icon);
}
function randomColor() {
	for (i = 0; i < users.length; i++) {
		var color = Math.floor(Math.random()*0xFFFFFF).toString(16);
		if (color.length < 6) {color = (randomColor());} // if color's length is less than 6, it's invalid. let's run it again recursively.
		colors[i] = color;
	}
}
function pinLocations(id) {

	for (i = 0; i < users[id].location.length; i++) {
		var latitude = users[id].location[i].latitude;
		var longitude = users[id].location[i].longitude;
		var timestamp = users[id].location[i].timestamp;
		pinLocation(id, latitude, longitude, colors[id], timestamp);
	}

}
function postLocation() {

	var dateObj = new Date();
	var selectedLocation = document.getElementById("selectedLocation");

	switch(selectedLocation.value) {
   	case "myLatLng":
       		var latitude = myLatitude;
		var longitude = myLongitude;
       		break;
    	case "MUNCenter":
        	var latitude = 47.5735085;
		var longitude = -52.7363132;
        	break;
    	case "VillageMall":
        	var latitude = 47.535043;
		var longitude = -52.7530485;
        	break;
    	case "AvalonMall":
        	var latitude = 47.561271;
		var longitude = -52.7563026;
        	break;
    	case "Downtown":
        	var latitude = 47.5610208;
		var longitude = -52.7132025;
        	break;
    	default:
        	alert("An error has occured. Please try again later.");
	}
	var newLocation = new Location(currentUser, latitude, longitude, dateObj.toString());
	users[currentUser].location.push(newLocation);
	postData(SERVER + "api/postLocation", "currentUser=" + currentUser + "&latitude=" + latitude + "&longitude=" + longitude);
	genTable(); // update the table

}
