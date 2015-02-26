Template.umShowUsers.helpers(_.extend(UserManagementTemplates.umShowUsersHelpers, {
	headerId: function() {
		return UserManagementPolymer._headerPanelId;
	}
}));

Template.umShowUsers.rendered = function () {
	var userList = this.find('user-list');

	Tracker.autorun(function () {
		var users = Meteor.users.find().fetch();
		userList.users = users;
	});

	userList.clickedUserCallback = function(e, user) {
		UserManagementTemplates.umUserListItemEvents['click .clickableRow'].call(user, e);
	};
};

Template.umShowUsers.events(UserManagementTemplates.umShowUsersEvents);

Template.userListItem.helpers(UserManagementTemplates.umUserListItemHelpers);

Template.userListItem.events(UserManagementTemplates.umUserListItemEvents);