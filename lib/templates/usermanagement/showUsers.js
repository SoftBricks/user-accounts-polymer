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

	// set attributes for global fab
	Session.set('globalFabVisible', true);
	Session.set('globalFabAttributes', {});
	Template.umGlobalFab.eventHandler = function() {
		Router.go('umAddUser');
	};
};

Template.umShowUsers.events(UserManagementTemplates.umShowUsersEvents);

Template.userListItem.helpers(UserManagementTemplates.umUserListItemHelpers);

Template.userListItem.events(UserManagementTemplates.umUserListItemEvents);