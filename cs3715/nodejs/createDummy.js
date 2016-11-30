function setDummyVars(feed, groups, users) {

	/* Feed */
	feed[0] = new Post("This is a test post.", "Josh Forward", 0, "Sat Oct 1 2016 12:31:52 GMT-0330");
	feed[1] = new Post("Wow! What a great program. I can see where my group members are at all times! This is better than Facebook.", "Jimmy Redmond", 1, "Fri Oct 7 2016 11:31:52 GMT-0330");
	feed[2] = new Post("I forgot my wallet, can anyone spot me some money for some hotdogs?", "Richard Long", 4, "Mon Oct 10 2016 12:02:17 GMT-0330");
	feed[3] = new Post("Anyone want to meet up on Thursday?", "Debbie Jones", 3, "Mon Oct 10 2016 13:11:12 GMT-0330");
	feed[4] = new Post("Sure thing Debbie, I'm free from 2pm!", "Jimmy Redmond", 1, "Mon Oct 10 2016 13:58:18 GMT-0330");
	feed[5] = new Post("Jimmy you don't look like you're twenty one...", "Richard Long", 4, "Wed Oct 12 2016 9:21:02 GMT-0330");
	feed[6] = new Post("Have you guys heard about the sale on grapes/", "Bobby Bobs", 6, "Mon Nov 7 2016 10:12:54 GMT -0330");
	feed[7] = new Post("HOW DO YOU DO A QUESTION MARK/", "Bobby Bobs", 6, "Mon Nov 7 2016 10:14:18 GMT -0330");
	feed[8] = new Post("NOW MY LETTERS ARE BIG/// HOW DO I STOP THIS/", "Bobby Bobs", 6, "Mon Nov 7 2016 10:15:37 GMT -0330");
	feed[9] = new Post("Woah, so far Cloud Tracker has a total of 1158 lines of code, and 333 &lt;br&gt; tags!", "Canberk Karabudak", 2, "Wed Nov 16 2016 05:21:02 GMT-0330");

	/* Groups */

	/* Green Group (id=0) */
	var greenGroupMembers = [0, 4, 9];
	groups[0] = new Group("Green Group", 0, greenGroupMembers, "A group for people who love the color green!");

	/* Orange Group (id=1) */
	var orangeGroupMembers = [0, 2, 3, 5, 6, 8];
	groups[1] = new Group("Orange Group", 1, orangeGroupMembers, "A group for people who love the color orange!");

	/* Red Group (id=2) */
	var redGroupMembers = [1, 3, 5, 8];
	groups[2] = new Group("Red Group", 2, redGroupMembers, "A group for people who love the color red!");

	/* Blue Group (id=3) */
	var blueGroupMembers = [1, 2, 3, 6, 10];
	groups[3] = new Group("Blue Group", 3, blueGroupMembers, "A group for people who love the color blue!");

	/* Users */

	/* Josh Forward (id=0) */
	var joshFriends = [1, 2, 3, 7, 8, 9, 10];
	var joshGroups = [0, 1];
	var joshFirstLocation = new Location(0, 47.5816016, -52.7284562, "Mon Oct 24 2016 11:31:52 GMT-0230");
	var joshSecondLocation = new Location(0, 47.5889395, -52.7131089, "Mon Oct 24 2016 13:30:18 GMT-0230");
	var joshThirdLocation = new Location(0, 47.5928895, -52.7167353, "Mon Oct 24 2016 8:27:58 GMT-0230");
	var joshFourthLocation = new Location(0, 47.594046, -52.716050, "Mon Oct 24 2016 18:33:18 GMT-0230");
	var joshFifthLocation = new Location(0, 47.6037824, -52.7167257, "Mon Oct 24 2016 9:50:10 GMT-0230");
	var joshLocations = new Array(joshFirstLocation, joshSecondLocation, joshThirdLocation, joshFourthLocation, joshFifthLocation);
	users[0] = new User("Josh Forward", 0, joshLocations, joshFriends, joshGroups, 21, "Can code in CSS, Java, and HTML. Trying to learn C# for Unity. I love video games and TV.", "Male");

	/* Jimmy Redmond (id=1) */
	var jimmyFriends = [0, 2, 7];
	var jimmyGroups = [2, 3];
	var jimmyFirstLocation = new Location(1, 47.6143605, -52.7523694, "Mon Oct 24 2016 12:30:18 GMT-0230");
	var jimmySecondLocation = new Location(1, 47.6395649, -52.6822027, "Mon Oct 24 2016 9:23:59 GMT-0230");
	var jimmyThirdLocation = new Location(1, 47.5753405, -52.6883444, "Mon Oct 24 2016 16:19:51 GMT-0230");
	var jimmyFourthLocation = new Location(1, 47.5691791, -52.7058337, "Mon Oct 24 2016 11:12:23 GMT-0230");
	var jimmyFifthLocation = new Location(1, 47.5657245, -52.7122766, "Mon Oct 24 2016 19:39:08 GMT-0230");
	var jimmyLocations = new Array(jimmyFirstLocation, jimmySecondLocation, jimmyThirdLocation, jimmyFourthLocation, jimmyFifthLocation);
	users[1] = new User("Jimmy Redmond", 1,  jimmyLocations, jimmyFriends, jimmyGroups, 21, "Can code in CSS, Javascript, HTML, C#, and C++. I also get excited by new websites very easily.", "Male");

	/* Canberk Karabudak (id=2) */
	var canberkFriends = [0, 1, 6, 7, 8, 9, 10];
	var canberkGroups = [1, 3];
	var canberkFirstLocation = new Location(2, 47.5627184, -52.7412202, "Mon Oct 24 2016 19:34:44 GMT-0230");
	var canberkSecondLocation = new Location(2, 47.5538892, -52.7688384, "Mon Oct 24 2016 16:20:40 GMT-0230");
	var canberkThirdLocation = new Location(2, 47.5545493, -52.7825899, "Mon Oct 24 2016 9:14:24 GMT-0230");
	var canberkFourthLocation = new Location(2, 47.5519872, -52.7820572, "Mon Oct 24 2016 11:31:02 GMT-0230");
	var canberkFifthLocation = new Location(2, 47.5692515, -52.7018078, "Mon Oct 24 2016 18:30:18 GMT-0230");
	var canberkLocations = new Array(canberkFirstLocation, canberkSecondLocation, canberkThirdLocation, canberkFourthLocation, canberkFifthLocation);
	users[2] = new User("Canberk Karabudak", 2,  canberkLocations, canberkFriends, canberkGroups, 20, "I am a third-year international student, going to Memorial University. I can code in HTML, CSS, Java, C++, and VB. I like coding as a hobby, and am planning to do this as a career.", "Male");

	/* Debbie Jones (id=3) */
	var debbieFriends = [0, 4, 5, 7];
	var debbieGroups = [1, 2, 3];
	var debbieFirstLocation = new Location(3, 47.5189064, -52.8064133, "Mon Oct 24 2016 12:27:19 GMT-0230");
	var debbieSecondLocation = new Location(3, 47.516787, -52.826944, "Mon Oct 24 2016 15:12:58 GMT-0230");
	var debbieThirdLocation = new Location(3, 47.5246193, -52.7772204, "Mon Oct 24 2016 11:49:18 GMT-0230");
	var debbieFourthLocation = new Location(3, 47.5240921, -52.7699513, "Mon Oct 24 2016 19:18:50 GMT-0230");
	var debbieFifthLocation = new Location(3, 47.5300783, -52.7561937, "Mon Oct 24 2016 9:11:58 GMT-0230");
	var debbieLocations = new Array(debbieFirstLocation, debbieSecondLocation, debbieThirdLocation, debbieFourthLocation, debbieFifthLocation);
	users[3] = new User("Debbie Jones", 3,  debbieLocations, debbieFriends, debbieGroups, 20, "Can code in Java and C#. Born in New York, but lived in Newfoundland my whole life. I love cats and dogs but I have a fear of big fish", "Female");

	/* Richard Long (id=4) */
	var richardFriends = [3, 6, 7];
	var richardGroups = [0];
	var richardFirstLocation = new Location(4, 47.5410435, -52.7417804, "Mon Oct 24 2016 11:19:58 GMT-0230");
	var richardSecondLocation = new Location(4, 47.5544514, -52.7430642, "Mon Oct 24 2016 16:49:40 GMT-0230");
	var richardThirdLocation = new Location(4, 47.5622427, -52.7326641, "Mon Oct 24 2016 7:23:58 GMT-0230");
	var richardFourthLocation = new Location(4, 47.5796976, -52.7125215, "Mon Oct 24 2016 17:12:18 GMT-0230");
	var richardFifthLocation = new Location(4, 47.5818945, -52.7006464, "Mon Oct 24 2016 12:09:52 GMT-0230");
	var richardLocations = new Array(richardFirstLocation, richardSecondLocation, richardThirdLocation, richardFourthLocation, richardFifthLocation);
	users[4] = new User("Richard Long", 4,  richardLocations, richardFriends, richardGroups, 21, "Can code in CSS and HTML. I like hotdogs and long walks on the beach.", "Male");

	/* John Davidson (id=5) */
	var johnFriends = [3, 6, 7];
	var johnGroups = [1, 2];
	var johnFirstLocation = new Location(5, 47.5872554, -52.6925686, "Mon Oct 24 2016 12:21:28 GMT-0230");
	var johnSecondLocation = new Location(5, 47.5940807, -52.7170315, "Mon Oct 24 2016 13:02:27 GMT-0230");
	var johnThirdLocation = new Location(5, 47.661488, -52.7146484, "Mon Oct 24 2016 9:07:22 GMT-0230");
	var johnFourthLocation = new Location(5, 47.6231527, -52.7997593, "Mon Oct 24 2016 18:21:58 GMT-0230");
	var johnFifthLocation = new Location(5, 47.5088992, -52.8368964, "Mon Oct 24 2016 16:49:51 GMT-0230");
	var johnLocations = new Array(johnFirstLocation, johnSecondLocation, johnThirdLocation, johnFourthLocation, johnFifthLocation);
	users[5] = new User("John Davidson", 5,  johnLocations, johnFriends, johnGroups, 22, "I like video games and I love to watch TV and movies.", "Male");
	
	/* Bobby Bobs (id=6) */
	var bobbyFriends = [2, 4, 5, 7];
	var bobbyGroups = [1, 3];
	var bobbyFirstLocation = new Location(6, 47.5872652, -52.6925785, "Mon Oct 24 2016 12:21:28 GMT-0230");
	var bobbySecondLocation = new Location(6, 47.5940815, -52.7170392, "Mon Oct 24 2016 13:02:27 GMT-0230");
	var bobbyThirdLocation = new Location(6, 47.6614719, -52.7146421, "Mon Oct 24 2016 9:07:22 GMT-0230");
	var bobbyFourthLocation = new Location(6, 47.6231530, -52.7997071, "Mon Oct 24 2016 18:21:58 GMT-0230");
	var bobbyFifthLocation = new Location(6, 47.5080193, -52.8368099, "Mon Oct 24 2016 16:49:51 GMT-0230");
	var bobbyLocations = new Array(bobbyFirstLocation, bobbySecondLocation, bobbyThirdLocation, bobbyFourthLocation, bobbyFifthLocation);
	users[6] = new User("Bobby Bobs", 6,  bobbyLocations, bobbyFriends, bobbyGroups, 65, "I love prune juice and coding, I also enjoy funny internet me mes.", "Male");
	
	/* Harambe (id=7) */
	var haramFriends = [0, 1, 2, 3, 4, 5, 6, 8, 9, 10];
	var haramGroups = [];
	var haramFirstLocation = new Location(7, 39.144684, -84.510079, "Mon Oct 28 2016 12:21:28 GMT-0230");
	var haramSecondLocation = new Location(7, 39.144685, -84.510080, "Mon Oct 24 2016 13:02:27 GMT-0230");
	var haramThirdLocation = new Location(7, 39.144686, -84.510079, "Mon Oct 24 2016 9:07:22 GMT-0230");
	var haramFourthLocation = new Location(7, 39.144683, -84.510078, "Mon Oct 24 2016 18:21:58 GMT-0230");
	var haramFifthLocation = new Location(7, 39.144687, -84.510081, "Sat May 28 2016 17:29:51 GMT-0230");
	var haramLocations = new Array(haramFirstLocation, haramSecondLocation, haramThirdLocation, haramFourthLocation, haramFifthLocation);
	users[7] = new User("Haram Be", 7,  haramLocations, haramFriends, haramGroups, 17, "I like to save kids from motes. I also enjoy bananas and being shot", "Male");
	
	/* Tyler Beckett (id=8) */
	var tylerFriends = [0, 2, 7, 9, 10];
	var tylerGroups = [1, 2];
	var tylerFirstLocation = new Location(8, 47.5870652, -52.6925785, "Mon Oct 24 2016 12:21:28 GMT-0230");
	var tylerSecondLocation = new Location(8, 47.5941819, -52.7170322, "Mon Oct 24 2016 13:02:27 GMT-0230");
	var tylerThirdLocation = new Location(8, 47.671470, -52.7146428, "Mon Oct 24 2016 9:07:22 GMT-0230");
	var tylerFourthLocation = new Location(8, 47.6231530, -52.7997571, "Mon Oct 24 2016 18:21:58 GMT-0230");
	var tylerFifthLocation = new Location(8, 47.5088903, -52.8368909, "Mon Oct 24 2016 16:49:51 GMT-0230");
	var tylerLocations = new Array(tylerFirstLocation, tylerSecondLocation, tylerThirdLocation, tylerFourthLocation, tylerFifthLocation);
	users[8] = new User("Tyler Beckett", 8,  tylerLocations, tylerFriends, tylerGroups, 23, "fuck you.", "Male");
	
	/* Ryan Ley (id=9) */
	var ryanFriends = [0, 2, 7, 9, 10];
	var ryanGroups = [0];
	var ryanFirstLocation = new Location(9, 47.5872252, -52.6925735, "Mon Oct 24 2016 12:21:28 GMT-0230");
	var ryanSecondLocation = new Location(9, 47.5940819, -52.7174522, "Mon Oct 24 2016 13:02:27 GMT-0230");
	var ryanThirdLocation = new Location(9, 47.6614730, -52.7144217, "Mon Oct 24 2016 9:07:22 GMT-0230");
	var ryanFourthLocation = new Location(9, 47.6235030, -52.7994600, "Mon Oct 24 2016 18:21:58 GMT-0230");
	var ryanFifthLocation = new Location(9, 47.5088993, -52.8368912, "Mon Oct 24 2016 16:49:51 GMT-0230");
	var ryanLocations = new Array(ryanFirstLocation, ryanSecondLocation, ryanThirdLocation, ryanFourthLocation, ryanFifthLocation);
	users[9] = new User("Ryan Ley", 9,  ryanLocations, ryanFriends, ryanGroups, 22, "I like to sail boats and code.", "Male");
	
	/* Nick Hamilton (id=10) */
	var nickFriends = [0, 2, 7, 9, 10];
	var nickGroups = [3];
	var nickFirstLocation = new Location(10, 47.5874692, -52.6925750, "Mon Oct 24 2016 12:21:28 GMT-0230");
	var nickSecondLocation = new Location(10, 47.59409279, -52.717042, "Mon Oct 24 2016 13:02:27 GMT-0230");
	var nickThirdLocation = new Location(10, 47.6614700, -52.7146027, "Mon Oct 24 2016 9:07:22 GMT-0230");
	var nickFourthLocation = new Location(10, 47.6231930, -52.7997690, "Mon Oct 24 2016 18:21:58 GMT-0230");
	var nickFifthLocation = new Location(10, 47.5088903, -52.8368902, "Mon Oct 24 2016 16:49:51 GMT-0230");
	var nickLocations = new Array(nickFirstLocation, nickSecondLocation, nickThirdLocation, nickFourthLocation, nickFifthLocation);
	users[10] = new User("Nick Hamilton", 10,  nickLocations, nickFriends, nickGroups, 20, "I love dank memes!", "Male");

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

module.exports = {setDummyVars: setDummyVars};
