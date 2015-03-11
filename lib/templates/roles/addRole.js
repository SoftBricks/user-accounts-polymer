Meteor.startup(function(){
    Template.umAddRole.helpers(UserManagementTemplates.umAddRoleHelper);
    //Template.umManageRoles.events(UserManagementTemplates.umManageRolesEvents);
});


UserManagementPolymer.submitCreateRoleForm = function(event, template) {
	event.preventDefault();
	var decorators = template.findAll('paper-input-decorator');
	_.each(decorators, function(decorator) {
		var input = $(decorator).find('input');
		decorator.isInvalid = !input[0].validity.valid;
	});
	$('#submitAddRoleForm').click();
};

Template.umAddRole.events({
	'tap #createRole': function (e, template) {
		UserManagementPolymer.submitCreateRoleForm(e, template);
	}
});

AutoForm.hooks({
    addRole: {
        onSuccess: function(operation, result, template) {
            UmUi.toast(TAPi18n.__('createSuccess', TAPi18n.__('role')));
            Router.go('umManageRoles');
        },
        onError: function(operation, error, template) {
            if(error.error === 409){
                error.message = __('alreadyExisting', __('role'));
            }
            UmUi.toast(error.message);
        }
    }
});