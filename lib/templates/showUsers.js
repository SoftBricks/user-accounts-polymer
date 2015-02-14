_.extend(UserManagementTemplates.umShowUsersHelpers, {
	hPanel: function() {
		console.log(UserManagementPolymer._headerPanelId);
		return UserManagementPolymer._headerPanelId;
	}
});

Template.umShowUsers.helpers(UserManagementTemplates.umShowUsersHelpers);

Template.umShowUsers.rendered = function () {
	var userList = this.find('#userList');
	userList.users = UserManagementTemplates.umShowUsersHelpers.users().fetch();
	userList.clickedUserCallback = function(userId) {
		Router.go('umShowUser', {
			userId: userId
		});
	};
};