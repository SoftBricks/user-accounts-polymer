Template.umDeleteRole.events({
	'tap #deleteRole': function(e) {
		Meteor.call('removeRole', Router.current().params.roleId, function(error, result) {
			if (!error) {
				// show message
				Router.go('umManageRoles');
				GlobalUI.toast(TAPi18n.__('roleRemoved'));
			}else{
				GlobalUI.toast(error.message);
			}
		});
	}
});