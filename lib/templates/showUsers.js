Template.umShowUsers.helpers(UserManagementTemplates.umShowUsersHelpers);

Template.umShowUsers.rendered = function () {
	var userList = this.find('#userList');
	console.log(document.getElementById(UserManagementPolymer._headerPanelId).scroller);
	userList.users = UserManagementTemplates.umShowUsersHelpers.users().fetch();
	userList.hPanel = UserManagementPolymer._headerPanelId;
	userList.clickedUserCallback = function(userId) {
		Router.go('umShowUser', {
			userId: userId
		});
	};
};