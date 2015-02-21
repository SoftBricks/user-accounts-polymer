Template.umShowUsers.helpers(UserManagementTemplates.umShowUsersHelpers);

Template.umShowUsers.rendered = function () {
	var userList = this.find('#userList');
	userList.users = UserManagementTemplates.umShowUsersHelpers.users();
	userList.hPanel = UserManagementPolymer._headerPanelId;
	userList.clickedUserCallback = function(userId) {
		Router.go('umShowUser', {
			userId: userId
		});
	};
};