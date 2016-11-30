var id;
var storageChecked = false;

window.onload = setInterval(getLocation, 60000);

function profileInit() {

	if (!storageChecked) {
		checkLocalStorage();
		storageChecked = true;
	}

	var parameters = window.location.search.substr(1);
	var get = parameters.split("id=");
	id = get[1];

	if (id === undefined) {id = currentUser;} // Detect a "My Profile" click
	id = parseInt(id); // Fixes a JQuery bug

	generateHeader(id);
	generateFriendsList(id);

	var content = document.getElementById("content");
	var contentHTML = "<br><h2 class = coloredCenteredText>About Me ";

	if (id == currentUser) {contentHTML = contentHTML + "<small><a class = \"smallerText\" href=\"#\" onClick=\"editDialog()\">Edit</a></small>";}
	contentHTML = contentHTML + "</h2>";
	contentHTML = contentHTML + "<p class = block><b>Age</b>: " + users[id].age + "<br> <b>Gender</b>: " + users[id].gender + "<br>"

	if (id == currentUser) {} // This is the user itself, we do not do anything regarding friendship
	else {
		if ($.inArray(id, users[currentUser].friends) == -1) {contentHTML = contentHTML + "<input type=\"button\" value=\"Add Friend\" onclick=\"addFriend();\"/><br>"} // This is not the user's friend, we add an add friend button
		else {contentHTML = contentHTML + "<input type=\"button\" value=\"Remove Friend\" onclick=\"removeFriend();\"/><br>"} // This is a friend, we add a remove friend button
	}
	contentHTML = contentHTML + "<br>" + users[id].bio + "</p>";
	contentHTML = contentHTML + "<h2 class = coloredCenteredText>Groups</h2>";

	for (i = 0; i < groups.length; i++) {
		if ($.inArray(id, groups[i].members) != -1) {
			contentHTML = contentHTML + "<div class = block>";
			contentHTML = contentHTML + "<b class = groupTitle>" + groups[i].name + "</b><p>" + groups[i].description + "</p>";
			contentHTML = contentHTML + "<b class = groupTitle>Members</b><ul>";
				for (j = 0; j < groups[i].members.length; j++) {
					contentHTML = contentHTML + "<li>" + users[groups[i].members[j]].fullName + "</li>";
				}
			contentHTML = contentHTML + "</ul>";
			contentHTML = contentHTML + "</div><br>";
		}
	}

	content.innerHTML = contentHTML;

	getLocation();

};

function editDialog() {
	var content = document.getElementById("content");
	var contentHTML = "<br><h2 class = coloredCenteredText>About Me ";
	var bio = users[id].bio;
	bio = bio.split("<br>").join("\n"); // replace HTML newlines with regular newlines

	contentHTML = contentHTML + "</h2>";
	contentHTML = contentHTML + "<p class = block><b>Age</b>: <textarea id=ageField rows=\"1\" cols=\"10\">" + users[id].age + "</textarea><br> <b>Gender</b>: <textarea id=genderField rows=\"1\" cols=\"10\">" + users[id].gender + "</textarea> <br>"

	contentHTML = contentHTML + "<br><textarea id=bioField rows=\"3\" cols=\"50\">" + bio + "</textarea> <input type=\"button\" value=\"Update!\" onclick=\"editProfile();\"/></p>";
	contentHTML = contentHTML + "<h2 class = coloredCenteredText>Groups</h2>";

	for (i = 0; i < groups.length; i++) {
		if ($.inArray(id, groups[i].members) != -1) {
			contentHTML = contentHTML + "<div class = block>";
			contentHTML = contentHTML + "<b class = groupTitle>" + groups[i].name + "</b><p>" + groups[i].description + "</p>";
			contentHTML = contentHTML + "<b class = groupTitle>Members</b><ul>";
				for (j = 0; j < groups[i].members.length; j++) {
					contentHTML = contentHTML + "<li>" + users[groups[i].members[j]].fullName + "</li>";
				}
			contentHTML = contentHTML + "</ul>";
			contentHTML = contentHTML + "</div><br>";
		}
	}

	content.innerHTML = contentHTML;
	
};

function editProfile() {

	var newAgeField = document.getElementById("ageField");
	var newAge = newAgeField.value;
	var newGenderField = document.getElementById("genderField");
	var newGender = newGenderField.value;
	var newBioField = document.getElementById("bioField");
	var newBio = newBioField.value;
	newBio = newBio.split("\n").join("<br>"); // replace newlines with appropriate HTML tags
	newBio = newBio.split("\r").join("<br>"); // also consider \r, which is used by some systems

	users[currentUser].age = newAge;
	users[currentUser].gender = newGender;
	users[currentUser].bio = newBio;

	postData(SERVER + "api/editProfile", "currentUser=" + currentUser + "&age=" + newAge + "&gender=" + newGender + "&bio=" + newBio);
	profileInit(); 		// instead of reloading the whole page, why not reload the init function?
};

function addFriend() {

	users[currentUser].friends.push(id);
	users[id].friends.push(currentUser);
	postData(SERVER + "api/addFriend", "currentUser=" + currentUser + "&id=" + id);
	profileInit(); 		// instead of reloading the whole page, why not reload the init function?

};

function removeFriend() {

	var currentUserIndex = $.inArray(id, users[currentUser].friends);
	var idIndex = $.inArray(currentUser, users[id].friends);

	if (id == 7) {
		alert("Harambe shall always live.");
		return;	
	}

	users[currentUser].friends.splice(currentUserIndex, 1);
	users[id].friends.splice(idIndex, 1)
	postData(SERVER + "api/removeFriend", "currentUser=" + currentUser + "&id=" + id);
	profileInit(); 		// instead of reloading the whole page, why not reload the init function?

};

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(updateLocation);
	}
	else {
		alert("Geolocation's not here man.");
	}
}

function updateLocation(position) {
	if(locationInProfile == "true") {
		myLatitude = position.coords.latitude;
		myLongitude = position.coords.longitude;
		var dateObj = new Date();
		var newLocation = new Location(currentUser, myLatitude, myLongitude, dateObj.toString());
		users[currentUser].location.push(newLocation);
		postData(SERVER + "api/postLocation", "currentUser=" + currentUser + "&latitude=" + myLatitude + "&longitude=" + myLongitude);
	}
}
