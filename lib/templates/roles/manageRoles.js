Meteor.startup(function(){
    Template.umManageRoles.helpers(_.extend(UserManagementTemplates.umManageRolesHelper, {
		headerId: function() {
			return UserManagementPolymer._headerPanelId;
		}
    }));

    Template.umManageRoles.events(UserManagementTemplates.umManageRolesEvents);
});

Template.umManageRoles.rendered = function () {
	// set attributes for global fab
	Session.set('globalFabVisible', true);
	Session.set('globalFabAttributes', {});
	Template.umGlobalFab.eventHandler = function() {
		Router.go('umAddRole');
	};

	// init user list
	var roleList = this.find('roles-list');
	if (!roleList) {
		return;
	}

	Tracker.autorun(function() {
		var roles = Meteor.roles.find().fetch();
		// if (UmUi.activeSearch.get() === true) {
		// 	roles = RolesSearch.getData({
		// 		transform: function(matchText, regExp) {
		// 			return matchText;
		// 		},
		// 		sort: {
		// 			isoScore: -1
		// 		}
		// 	});
		// }
		roleList.roles = roles;
	});

	roleList.clickedDeleteRoleCallback = function(e, role) {
		console.log(e, role);
		UmUi.showDialog({
			template: 'umDeleteRole',
			heading: __('removeQuestion', __('role'))
		});
		// UserManagementTemplates.umUserListItemEvents['click .clickableRow'].call(role, e);
	};
};