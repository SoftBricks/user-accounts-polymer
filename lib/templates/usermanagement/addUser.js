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
	'tap #createUser': function (event, template) {
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
	},
	'keyup #email': function(event, template) {
		var email = $(event.currentTarget).val();
		var decorator = template.find('#emailDecorator');
		Meteor.call('checkEmailExisting', email, function(error, emailExisting) {
			var input = $(decorator).find('input');
			var validEmail = AutoForm.validateField("createUserForm", "emails.0.address", true);
			if(!validEmail){
				decorator.error = UserManagementTemplates.umAddUserHelpers.emailError.invalid;
				decorator.isInvalid = true;
			}else {
				if (emailExisting === true) {
					decorator.error = UserManagementTemplates.umAddUserHelpers.emailError.existing;
					decorator.isInvalid = true;
				} else {
					decorator.error = UserManagementTemplates.umAddUserHelpers.emailError.empty;
					decorator.isInvalid = !input[0].validity.valid;
				}
			}
		});
	}
});

AutoForm.hooks({
    createUserForm: {
        onSuccess: function(operation, result, template) {
            UmUi.toast(TAPi18n.__('createSuccess', TAPi18n.__('user')));
        },
        onError: function(operation, error, template) {
            UmUi.toast(error.message);
        }
    }
});