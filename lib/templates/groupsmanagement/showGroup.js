Meteor.startup(function(){
    Template.umShowGroup.helpers(UserManagementTemplates.umShowGroupHelpers);

    Template.umShowGroup.rendered = function () {
    	// console.log(UserManagementTemplates.umShowGroupHelpers.group().parentGroup);

    	// if(UserManagementTemplates.umShowGroupHelpers.group().parentGroup)
    		// Meteor.subscribe('users', UserManagementTemplates.umShowGroupHelpers.group().parentGroup);

    	// console.log(Meteor.users.find().count());
    	// set attributes for global fab
    	Session.set('globalFabAttributes', {
    		'data-open-um-dialog': true,
    		'data-template': 'addGroupMemberDialog',
    		'data-heading': 'addUsersToGroup'
    	});
    };
});