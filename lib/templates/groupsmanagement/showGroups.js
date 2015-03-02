Meteor.startup(function() {

	Template.umShowGroups.helpers(_.extend(UserManagementTemplates.umShowGroupsHelpers, {
		headerId: function() {
			return UserManagementPolymer._headerPanelId;
		}
	}));

	Template.umShowGroups.rendered = function() {
		// set attributes for global fab
		Session.set('globalFabVisible', true);
    	Session.set('globalFabAttributes', {});
    	Template.umGlobalFab.eventHandler = function() {
    		Router.go('umAddGroup');
    	};
    	
    	// init the groups list
		var groupsList = this.find('groups-list');
		if(!groupsList){
			return;
		}

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