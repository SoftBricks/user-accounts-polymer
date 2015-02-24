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

		groupsList.clickedGroupCallback = function(e, group) {
			UserManagementTemplates.umGroupListItemEvents['click .clickableRow'].call(group, e);
		};
	};

	Template.umShowGroups.events(UserManagementTemplates.umShowUsersEvents);

});