var currentUser;
var users = new Array();
var feed = new Array();
var groups = new Array();
var theme;
var locationInProfile;

// var SERVER = "https://cbkarabudak.pw:8100/";  // remote testing
// var SERVER = "https://192.168.2.254:8100/";	 // local testing
var SERVER = "http://sc-1.cs.mun.ca/"; 		 // department server

function setDummyVars() {

	currentUser = 2;
      
	var isMobile = window.matchMedia("only screen and (max-device-width: 480px)");

	if (isMobile.matches) {theme = "light";}
	else {theme = "dark";}
	
};

function saveLocalStorage() {

		localStorage.setItem("currentUser", currentUser);
		localStorage.setItem("theme", JSON.stringify(theme));

}

function checkLocalStorage() {

	testVal = localStorage.getItem("CloudTracker");
	if (!testVal) {
		alert("LocalStorage data not found! Creating dummy data... Please note that in CloudTracker 4.0, your location will automatically be posted when any profile page is visited. Visit the legal text for a way to disable it!");
		setDummyVars();
		localStorage.setItem("CloudTracker", "test"); // change each time you need a wipe
		localStorage.setItem("currentUser", currentUser);
		loadLiveData(); // we load the live data here
		localStorage.setItem("theme", JSON.stringify(theme));
		localStorage.setItem("locationInProfile", "true");
	}
	else {
		if (testVal != "test") { // let's refresh local storage if CloudTracker was below version 4.0
			alert("Because of the new changes in CloudTracker v4.0, we are forced to reset your LocalStorage data. Please wait while we do exactly that...");
			localStorage.removeItem("CloudTracker");
			location.reload();
		}
		currentUser = localStorage.getItem('currentUser');
		loadLiveData();
		theme = localStorage.getItem("theme");

		currentUser = JSON.parse(currentUser);
		theme = JSON.parse(theme);
		locationInProfile = localStorage.getItem("locationInProfile");

		if (theme == "light") {lightTheme(false);}
		if (theme == "dark") {darkTheme(false);} // I know, this is not the right place for it, but this is one place that's guaranteed to run in every page, and I'm lazy.

	}

};

function loadLiveData() {

	var request = new XMLHttpRequest();  
	request.open('GET', SERVER + 'get/users', false);   
	request.send(null);  
  
	if (request.status === 200) {
	  users = JSON.parse(request.responseText);  
	}

	var request = new XMLHttpRequest();  
	request.open('GET', SERVER + 'get/groups', false);   
	request.send(null);  
  
	if (request.status === 200) {  
	  groups = JSON.parse(request.responseText);  
	}

	var request = new XMLHttpRequest();  
	request.open('GET', SERVER + 'get/feed', false);   
	request.send(null);  
  
	if (request.status === 200) {  
	  feed = JSON.parse(request.responseText);  
	}

};

function changelogInit() {
	checkLocalStorage();
	generateHeader();
	generateFriendsList();
};

function generateFriendsList(id) {

	if (id == undefined) {id = currentUser};
	
	var isFriend;
	var temp1;
	var temp2;
	var nofriend = "";
	var yesfriend = "";
	var friendsList = document.getElementById("friendsList");
	var friendsListHTML = "";
	for (i = 0; i < users.length; i++) {
		if (i == id) {continue}
		if (($.inArray(i, users[currentUser].friends)) != -1){isFriend = 1}
		else {
			isFriend = 0;
		}
		//Create a Added friends list
		if(isFriend == 1) {temp1 ="<div class = \"realfriend\"><a href=\"" + "profile.html?id=" + i + "\"><img class=friendIcon src=\"images/profiles/" + i + "-picture.jpg\"></a><br><b> <a class=friendLink href=\"profile.html?id=" + i + "\">" + users[i].fullName + "</a><br></b></div><br>";
			yesfriend = yesfriend + temp1;
		}
		//Create a Non friends list
		if(isFriend == 0) {temp2 ="<div class = \"friend\"><a href=\"" + "profile.html?id=" + i + "\"><img class=friendIcon src=\"images/profiles/" + i + "-picture.jpg\"></a><br><b> <a class=friendLink href=\"profile.html?id=" + i + "\">" + users[i].fullName + "</a><br></b></div><br>";
			nofriend = nofriend + temp2;
		}
	};
	friendsListHTML = friendsListHTML + yesfriend + nofriend;//Put the two friend lists together
	friendsList.innerHTML = friendsListHTML;

};

function generateHeader(id) {
	if (id == undefined) {id = currentUser};

	var headerText = document.getElementById("headerText");
	var generatedHeader = "<a href=\"images/profiles/" + id + "-picture.jpg\"><img alt=\"A user's profile picture.\" class=resize src=\"images/profiles/" + id + "-picture.jpg\"></a>"
	generatedHeader = generatedHeader + "<h1><b class=coloredText>" + users[id].fullName + "</b></h1>";
	generatedHeader = generatedHeader + "<h2 class=coloredText> <a class=coloredText href=\"profile.html\">Profile</a> / ";
	generatedHeader = generatedHeader + "<a class=coloredText href=\"groups.html\">Groups</a> / ";
	generatedHeader = generatedHeader + "<a class=coloredText href=\"location.html\">Locations</a><br>";
	generatedHeader = generatedHeader + "<span class=coloredText id=switcherText>User: </span><select onchange=\"userSwitcher()\" id=newUser>";
	for (i=0;i < users.length;i++) {
		if (i == currentUser) {
			generatedHeader = generatedHeader + "<option selected=\"selected\" value=\"" + i + "\">" + users[i].fullName + "</option>";
		}
		else {
			generatedHeader = generatedHeader + "<option value=\"" + i + "\">" + users[i].fullName + "</option>";
		}
	}
	generatedHeader = generatedHeader + "</select><br>";
	generatedHeader = generatedHeader + "<small><a class=coloredText onclick=\"darkTheme()\" href=\"#\">Dark</a> / <a class=coloredText onclick=\"lightTheme()\" href=\"#\">Light</a></small>";

headerText.innerHTML = generatedHeader;

};

function darkTheme(bool) {

	var css = document.createElement( "link" );
	css.href = "./css/dark-theme.css";
	css.rel = "stylesheet";
	css.media = "screen,print";

	document.getElementsByTagName("head")[0].appendChild(css);

	theme = "dark";
	if (bool === undefined) {saveLocalStorage();}

};

function lightTheme(bool) {

	var css = document.createElement( "link" );
	css.href = "./css/light-theme.css";
	css.rel = "stylesheet";
	css.media = "screen,print";

	document.getElementsByTagName("head")[0].appendChild(css);

	theme = "light";
	if (bool === undefined) {saveLocalStorage();}

};

function userSwitcher() {

	var newUser = document.getElementById("newUser");
	localStorage.setItem("currentUser", newUser.value);
	location.reload();

};

function postData(url, postData) {
	var http = new XMLHttpRequest();
	http.open("POST", url, true);
	// postData = "data=" + postData;

	//Send the proper header information along with the request
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	//http.setRequestHeader("Content-length", postData.length);
	//http.setRequestHeader("Connection", "close");

	http.onreadystatechange = function() {//Call a function when the state changes.
		if(http.readyState == 4 && http.status == 200) {
			alert(http.responseText);
		}
	}
	http.send(postData);
};

function disableLocationUpdate() {
	localStorage.setItem("locationInProfile", false);
	location.reload();
};
   
function User(fullName, ID, location, friends, groups, age, bio, gender) {
	this.fullName = fullName;
	this.ID = ID;
	this.location = location;
	this.friends = friends;
	this.groups = groups;
	this.age = age;
	this.bio = bio;
	this.gender = gender;
};

function Picture(fullName, ID, picture) {
	this.picture = picture;
	this.ID = ID;
	this.fullName = fullName;
};

function Post(message, senderName, senderID, timestamp) {
	this.message = message;
	this.senderName = senderName;
	this.senderID = senderID;
	this.timestamp = timestamp;
};

function Group(name, ID, members, description) {
	this.name = name;
	this.ID = ID;
	this.members = members;
	this.description = description;
};

function Location(userID, latitude, longitude, timestamp) {
	this.userID = userID;
	this.latitude = latitude;
	this.longitude = longitude;
	this.timestamp = timestamp;
};
