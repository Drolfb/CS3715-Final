// BASE SETUP
// ==============================================

var express = require('express');
var app     = express();
var bodyParser = require('body-parser');
var port    =   process.env.PORT || 3331;
var dummyVars = require('./createDummy');
var http = require('http');
var fs = require('fs');

var users = new Array();
var feed = new Array();
var groups = new Array();
var usersText, feedText, groupsText;

//dummyVars.setDummyVars(apiFunctions.feed, apiFunctions.groups, apiFunctions.users);
readLocalStorage();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);

function prepStrings() {

usersText = JSON.stringify(users);
groupsText = JSON.stringify(groups);
feedText = JSON.stringify(feed);

};

prepStrings(); // initialize texts for fast loading

// ROUTES
// ==============================================

// API functions
app.post('/api/joinGroup', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var currentUser = req.body.currentUser;
    var i = req.body.i;
    if (currentUser !== undefined && i !== undefined) {
        joinGroup(currentUser, i);
    }
    prepStrings();
});

app.post('/api/leaveGroup', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var currentUser = req.body.currentUser;
    var i = req.body.i;
    if (currentUser !== undefined && i !== undefined) {
        leaveGroup(currentUser, i);
    }
    prepStrings();
});

app.post('/api/editPost', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var currentUser = req.body.currentUser;
    var message = req.body.message;
    var i = req.body.i;
    if (currentUser !== undefined && message !== undefined && i !== undefined) {
        editPost(currentUser, message, i);
    }
    prepStrings();
});

app.post('/api/newPost', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var currentUser = req.body.currentUser;
    var message = req.body.message;
    if (currentUser !== undefined && message !== undefined) {
        newPost(currentUser, message);
    }
    prepStrings();
});

app.post('/api/postLocation', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var currentUser = req.body.currentUser;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    if (currentUser !== undefined && latitude !== undefined && longitude !== undefined) {
        postLocation(currentUser, latitude, longitude);
    }
    prepStrings();
});

app.post('/api/editProfile', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var currentUser = req.body.currentUser;
    var age = req.body.age;
    var gender = req.body.gender;
    var bio = req.body.bio;
    if (currentUser !== undefined && age !== undefined && gender !== undefined && bio !== undefined) {
        editProfile(currentUser, age, gender, bio);
    }
    prepStrings();
});

app.post('/api/addFriend', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var currentUser = req.body.currentUser;
    var id = req.body.id;
    if (currentUser !== undefined && id !== undefined) {
        addFriend(currentUser, id);
    }
    prepStrings();
});

app.post('/api/removeFriend', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var currentUser = req.body.currentUser;
    var id = req.body.id;
    if (currentUser !== undefined && id !== undefined) {
        removeFriend(currentUser, id);
    }
    prepStrings();
});

app.get('/api/prepStrings', function(req, res) {
    console.log("/api/prepStrings called.");
    prepStrings();
    console.log("prepStrings command finished.");
});

// get functions
app.get('/get/users', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(usersText);
});

app.get('/get/feed', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(feedText);
});

app.get('/get/groups', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(groupsText);
});

app.use(express.static('../'));
    app.get('/', function(req, res) {
        fs.readFile('../index.html', 'utf8', function(err, text){
            res.send(text);
        });
    });

http.createServer(app).listen(port);

// START THE SERVER
// ==============================================
// app.listen(port);
console.log('Magic happens on port ' + port);

// API Functions are defined right here
// ==============================================

function joinGroup(currentUser, i) {

	currentUser = parseInt(currentUser);
	i = parseInt(i);

	groups[i].members.push(currentUser);
	users[currentUser].groups.push(i);
	
	saveLocalStorage();
};

function leaveGroup(currentUser, i) {

	currentUser = parseInt(currentUser);
	i = parseInt(i);

	var groupsIndex = groups[i].members.indexOf(currentUser);
	groups[i].members.splice(groupsIndex, 1);

	var usersIndex = users[currentUser].groups.indexOf(i);
	users[currentUser].groups.splice(usersIndex, 1);

	saveLocalStorage();
};

function editPost(currentUser, message, i) {

	currentUser = parseInt(currentUser);
	//i = parseInt(i);
	
	newPost = newPost.toString().split("\n").join("<br>"); // replace newlines with appropriate HTML tags
	newPost = newPost.toString().split("\r").join("<br>"); // also consider \r, which is used by some systems
	console.log("i = " + i + ", feed[i] = " + feed[i]);
	feed[i].message = message;
	
	saveLocalStorage();
};

function newPost(currentUser, message) {

	currentUser = parseInt(currentUser);

	var dateObj = new Date();
	var post = new Post(message, users[currentUser].fullName, currentUser, dateObj.toString());

	feed.push(post);

	saveLocalStorage();

};

function postLocation(currentUser, latitude, longitude) {

	currentUser = parseInt(currentUser);

	var dateObj = new Date();

	var newLocation = new Location(currentUser, latitude, longitude, dateObj.toString());
	users[currentUser].location.push(newLocation);

	saveLocalStorage();

}

function editProfile(currentUser, age, gender, bio) {

	currentUser = parseInt(currentUser);

	bio = bio.split("\n").join("<br>"); // replace newlines with appropriate HTML tags
	bio = bio.split("\r").join("<br>"); // also consider \r, which is used by some systems

	users[currentUser].age = age;
	users[currentUser].gender = gender;
	users[currentUser].bio = bio;

	saveLocalStorage(); 	// never forget to save! nasty f$#@ing bug.
};

function addFriend(currentUser, id) {

	currentUser = parseInt(currentUser);
	id = parseInt(id);

	users[currentUser].friends.push(id);
	users[id].friends.push(currentUser);
	saveLocalStorage();

};

function removeFriend(currentUser, id) {

	currentUser = parseInt(currentUser);
	id = parseInt(id);

	var currentUserIndex = users[currentUser].friends.indexOf(id);
	var idIndex = users[id].friends.indexOf(currentUser);

	if ((currentUserIndex == -1) || (idIndex == -1)) {
		console.log("Error removing friend! currentUserIndex = " + currentUserIndex + ", idIndex = " + idIndex);
		return; // otherwise we'd get rid of a random element, messing up all friends lists!
	}

	users[currentUser].friends.splice(currentUserIndex, 1);
	users[id].friends.splice(idIndex, 1)
	saveLocalStorage();

};

function readLocalStorage() {

    var fs = require('fs');
        
    try{
    	feedText = fs.readFileSync('./feed.json', 'utf8');
        
        groupsText = fs.readFileSync('./groups.json', 'utf8');
         
        usersText = fs.readFileSync('./users.json', 'utf8');

	feed = JSON.parse(feedText);
	groups = JSON.parse(groupsText);
	users = JSON.parse(usersText);
        
    	
    }
    catch(e){
    	dummyVars.setDummyVars(feed, groups, users);
	feedText = JSON.stringify(feed);
	usersText = JSON.stringify(users);
	groupsText = JSON.stringify(groups);
    	saveLocalStorage(users, groups, feed);
    }
    console.log("readLocalStorage() called.");
    

};

function saveLocalStorage(users, groups, feed) {
    
    var fs = require('fs');

    prepStrings();

    fs.writeFileSync("./feed.json", feedText);

    fs.writeFileSync("./groups.json", groupsText);

    fs.writeFileSync("./users.json", usersText);
	console.log("saveLocalStorage() called.");

};

// Object constructors are defined right here
// ==============================================

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
