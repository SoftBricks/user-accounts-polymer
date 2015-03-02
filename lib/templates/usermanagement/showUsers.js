Template.umShowUsers.helpers(_.extend(UserManagementTemplates.umShowUsersHelpers, {
	headerId: function() {
		return UserManagementPolymer._headerPanelId;
	}
}));

UserManagementPolymer.userSearchHandler = function(e, template) {
	var text = $(e.currentTarget).val();
	UserSearch.search(text);
};

Template.umShowUsers.rendered = function() {
	// set attributes for global fab
	Session.set('globalFabVisible', true);
	Session.set('globalFabAttributes', {});
	Template.umGlobalFab.eventHandler = function() {
		Router.go('umAddUser');
	};

	// init user list
	var userList = this.find('user-list');
	if (!userList) {
		return;
	}

	Tracker.autorun(function() {
		var users = UserSearch.getData({
			transform: function(matchText, regExp) {
				return matchText;
			},
			sort: {
				isoScore: -1
			}
		});
		if(users.length === 0){
			users = Meteor.users.find().fetch();
		}
		_.forEach(users, function(user, key) {
			users[key].avatar = UserManagementTemplates.umShowUserHelpers.gravatar.call(user);
		});
		userList.users = users;
	});

	userList.clickedUserCallback = function(e, user) {
		UserManagementTemplates.umUserListItemEvents['click .clickableRow'].call(user, e);
	};
};

Template.umShowUsers.events(UserManagementTemplates.umShowUsersEvents);

Template.userListItem.helpers(UserManagementTemplates.umUserListItemHelpers);

Template.userListItem.events(UserManagementTemplates.umUserListItemEvents);