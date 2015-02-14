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
	'submit': function () {
		console.log('submit');
	},
	'change #adminToggle': function(event, template) {
		var checkbox = $(template.find('input[name=admin]'));
		checkbox.prop("checked", !checkbox.prop("checked"));
	}
});