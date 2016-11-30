var storageChecked = false;

function groupsInit() {

	if (!storageChecked) {
		checkLocalStorage();
		storageChecked = true;
	}

	generateFriendsList();
	generateHeader();

	/* We populate the groups list here. */

	var groupsList = document.getElementById("content");
	var groupsListHTML = "<h2 class = coloredCenteredText>Current Groups</h2>";

	for (i = 0; i < groups.length; i++) {
		if ($.inArray(currentUser, groups[i].members) != -1) {
			groupsListHTML = groupsListHTML + "<div class = block>";
			groupsListHTML = groupsListHTML + "<a href=\"#\" onClick=\"leaveGroup(" + i + ");\"><b class = joinLeave>Leave Group</b></a><b class = groupTitle>" + groups[i].name + "</b><p>" + groups[i].description + "</p>";
			groupsListHTML = groupsListHTML + "<b class = groupTitle>Members</b><ul>";
				for (j = 0; j < groups[i].members.length; j++) {
					groupsListHTML = groupsListHTML + "<li>" + users[groups[i].members[j]].fullName + "</li>";
				}
			groupsListHTML = groupsListHTML + "</ul>";
			groupsListHTML = groupsListHTML + "</div><br>";
		}
	}

	groupsListHTML = groupsListHTML + "<h2 class = coloredCenteredText>Other Groups</h2>";
	for (i = 0; i < groups.length; i++) {
		if ($.inArray(currentUser, groups[i].members) == -1) {
			groupsListHTML = groupsListHTML + "<div class = block>";
			groupsListHTML = groupsListHTML + "<a href=\"#\" onClick=\"joinGroup(" + i + ");\"><b class = joinLeave>Join Group</b></a><b class = groupTitle>" + groups[i].name + "</b><p>" + groups[i].description + "</p>";
			groupsListHTML = groupsListHTML + "<b class = groupTitle>Members</b><ul>";
				for (j = 0; j < groups[i].members.length; j++) {
					groupsListHTML = groupsListHTML + "<li>" + users[groups[i].members[j]].fullName + "</li>";
				}
			groupsListHTML = groupsListHTML + "</ul>";
			groupsListHTML = groupsListHTML + "</div><br>";
		}
	}

	groupsList.innerHTML = groupsListHTML;

};

function joinGroup(i) {

	groups[i].members.push(currentUser);
	users[currentUser].groups.push(i);
	
	postData(SERVER + "api/joinGroup", "currentUser=" + currentUser + "&i=" + i);
	groupsInit();
};

function leaveGroup(i) {

	var groupsIndex = $.inArray(currentUser, groups[i].members);
	groups[i].members.splice(groupsIndex, 1);

	var usersIndex = $.inArray(i, users[currentUser].groups);
	users[currentUser].groups.splice(usersIndex, 1);

	postData(SERVER + "api/leaveGroup", "currentUser=" + currentUser + "&i=" + i);
	groupsInit();
};
