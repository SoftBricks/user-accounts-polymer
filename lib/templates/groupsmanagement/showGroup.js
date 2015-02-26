Meteor.startup(function(){
    Template.umShowGroup.helpers(UserManagementTemplates.umShowGroupHelpers);

    Template.umShowGroup.rendered = function () {
    	// set attributes for global fab
    	Session.set('globalFabAttributes', {
    		'data-open-um-dialog': true,
    		'data-template': 'addGroupMemberDialog',
    		'data-heading': 'addUsersToGroup'
    	});
    };
});