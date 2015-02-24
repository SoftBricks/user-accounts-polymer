Meteor.startup(function() {

	Template.umShowGroups.helpers(_.extend(UserManagementTemplates.umShowGroupsHelpers, {
		headerId: function() {
			return UserManagementPolymer._headerPanelId;
		}
	}));

	Template.umShowGroups.rendered = function() {
		var groupsList = this.find('groups-list');

		Tracker.autorun(function() {
			var groups = Groups.find().fetch();
			groupsList.groups = groups;
		});

		groupsList.clickedUserCallback = function(e, groupId) {
			var group = {
				_id: groupId
			};
			UserManagementTemplates.umUserListItemEvents['click .clickableRow'].call(group, e);
		};
	};

	Template.umShowGroups.events(UserManagementTemplates.umShowUsersEvents);

});