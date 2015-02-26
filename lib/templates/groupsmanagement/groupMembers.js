Meteor.startup(function() {
	Template.userList.rendered = function() {
		var ul = document.querySelector('.member-list');
		var tmpl = this;

		Tracker.autorun(function() {
			var members = tmpl.data.users.fetch();
			if (members) {
				ul.users = members;

				if (members.length > 0) {
					$('.member-list-wrapper').removeClass('hidden');
					// ul.updateList();
				} else {
					// no users in the db
					$('.member-list-wrapper').addClass('hidden');
				}
			} else {
				// there are no users yet
				$('.member-list-wrapper').addClass('hidden');
			}
		});

		ul.clickedUserCallback = function(e, user) {
			// UserManagementTemplates.umEditGroupEvents['click .fullname'].call(user, e);
			// $('.member-list-wrapper').addClass('hidden');
		};
	};

	Template.groupMembers.helpers({
		users: function () {
			return Meteor.users.find({'profile.groups.id': Router.current().params.groupId});
		}
	});

	Template.addGroupMemberDialog.events({
		'keyup #userSearchField': function(e) {
			var text = $(e.currentTarget).val();
			UserSearch.search(text);
		}
	});

	Template.addGroupMemberDialog.rendered = function() {
		var checklist = document.getElementById('memberCheckList');

		checklist.itemClicked = function(item) {
			var groupId = Router.current().params.groupId;
			var userId = item._id;
			if (item.checked === 'checked') {
				Meteor.call('addUserToGroup', userId, null, groupId);
			} else {
				Meteor.call('removeUserFromGroup', userId, null, groupId);
			}
		};
		Tracker.autorun(function() {
			var group = UserManagementTemplates.umShowGroupHelpers.group();
			var users = UserSearch.getData({
				transform: function(matchText, regExp) {
					return matchText;
				},
				sort: {
					isoScore: -1
				}
			});
			var extendedUsers = [];
			_.each(users, function(user) {
				var checked = '';
				if (_.indexOf(_.pluck(group.users, 'id'), user._id) != -1) {
					checked = 'checked';
				}
				extendedUsers.push(_.extend(user, {
					checked: checked
				}));
			});
			checklist.items = extendedUsers;
		});
	};
});