Template.umShowUsers.helpers(_.extend(UserManagementTemplates.umShowUsersHelpers, {
	headerId: function() {
		return UserManagementPolymer._headerPanelId;
	},
	userList: function() {
		return UserSearch.getData({
			transform: function(matchText, regExp) {
				return matchText;
			},
			sort: {
				isoScore: -1
			}
		});
	},
	activeUmSearch: function() {
		return UmUi.activeSearch.get();
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
	var userAvatars = [];

	Tracker.autorun(function() {
		var users = Meteor.users.find().fetch();
		if (UmUi.activeSearch.get() === true) {
			users = UserSearch.getData({
				transform: function(matchText, regExp) {
					return matchText;
				},
				sort: {
					isoScore: -1
				}
			});
		}

		_.forEach(users, function(user, key) {
			if (!userAvatars[user._id]) {
				var userHash = Gravatar.hash(user.emails[0].address);
				userAvatars[user._id] = 'https://www.gravatar.com/avatar/' + userHash + '?size=40';
			}
			users[key].avatar = userAvatars[user._id];
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