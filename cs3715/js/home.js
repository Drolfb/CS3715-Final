var storageChecked = false;

function homeInit() {

	if (!storageChecked) {
		checkLocalStorage();
		storageChecked = true;
	}

	generateFriendsList();
	generateHeader();

	var parameters = window.location.search.substr(1);
	if (parameters == "clear-local-storage") { // the user wants to clear their local storage. let's help them!
		localStorage.removeItem("CloudTracker");
		alert("Your local storage for Cloud Tracker has been successfully cleared! Reloading the page now...");
		window.location.href = "./";
	}

	/* We populate the feed here. */

	var mainFeed = document.getElementById("feed");
	var feedHTML = "";

	for (i = (feed.length - 1); i >= 0; i--) {
		feedHTML = feedHTML + "<div class = \"block\" id=\"post" + i + "\">";
		feedHTML = feedHTML + "<b class = \"posterName\">" + feed[i].senderName + "</b><span><small>" + feed[i].timestamp + "</small></span>";
		if (feed[i].senderID == currentUser) {feedHTML = feedHTML + " <small><a href=\"#post" + i + "\" onclick=\"editDialog(" + i + ");\">Edit</a></small>";}
		feedHTML = feedHTML + "<p>" + feed[i].message + "</p>";
		feedHTML = feedHTML + "</div><br>";
	}

	mainFeed.innerHTML = feedHTML;

};

function newPost() {

	var textField = document.getElementById("textField");
	var dateObj = new Date();
	var post = new Post(textField.value, users[currentUser].fullName, currentUser, dateObj.toString());

	feed.push(post);

	postData(SERVER + "api/newPost", "currentUser=" + currentUser + "&message=" + textField.value);
	homeInit();

};

function editDialog(i) {
	var block = document.getElementById("post" + i);
	var message = feed[i].message;
	message = message.split("<br>").join("\n"); // replace HTML newlines with regular newlines
	var blockHTML = "<b class = \"posterName\">" + feed[i].senderName + "</b><span><small>" + feed[i].timestamp + "</small></span><br>";
	var blockHTML = blockHTML + "<textarea id=textField" + i + " rows=\"5\" cols=\"50\">" + message + "</textarea><input type=\"button\" value=\"Post!\" onclick=\"editPost(" + i + ");\"/>";

	block.innerHTML = blockHTML;
	
};

function editPost(i) {
	var textField = document.getElementById("textField" + i);
	newPost = textField.value;
	
	newPost = newPost.split("\n").join("<br>"); // replace newlines with appropriate HTML tags
	newPost = newPost.split("\r").join("<br>"); // also consider \r, which is used by some systems
	feed[i].message = newPost;
	
	postData(SERVER + "api/editPost", "currentUser=" + currentUser + "&i=" + i + "&message=" + newPost);
	homeInit();
};
