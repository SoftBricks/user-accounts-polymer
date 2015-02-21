Template.umAddUser.helpers(UserManagementTemplates.umAddUserHelpers);

UserManagementPolymer.submitCreateUserForm = function(event, template) {
	event.preventDefault();
	var decorators = template.findAll('paper-input-decorator');
	_.each(decorators, function(decorator) {
		var input = $(decorator).find('input');
		decorator.isInvalid = !input[0].validity.valid;
	});
	template.find('button[type=submit]').click();
};

Template.umAddUser.events({
	'click #createUser': function (event, template) {
		UserManagementPolymer.submitCreateUserForm(event, template);
	},
	'change #adminToggle': function(event, template) {
		var checkbox = $(template.find('input[name=admin]'));
		checkbox.prop("checked", !checkbox.prop("checked"));
	},
	// could be done in main package
	'keyup #username': function(event, template) {
		var username = $(event.currentTarget).val();
		var decorator = template.find('#usernameDecorator');
		Meteor.call('checkUsernameExisting', username, function(error, usernameExisting) {
			var input = $(decorator).find('input');
			if(usernameExisting === true) {
				decorator.error = UserManagementTemplates.umAddUserHelpers.usernameError.existing;
				decorator.isInvalid = true;
			} else {
				decorator.error = UserManagementTemplates.umAddUserHelpers.usernameError.empty;
				decorator.isInvalid = !input[0].validity.valid;
			}
		});
	}
});

AutoForm.hooks({
    createUserForm: {
        onSuccess: function(operation, result, template) {
        	console.log(operation, result);
            var toast = $("[global-toast]")[0];
            toast.text = 'User was created successfully';
            toast.show();
        }
    }
});