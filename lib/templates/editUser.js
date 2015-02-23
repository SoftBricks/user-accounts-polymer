Template.umEditUser.helpers(UserManagementTemplates.umEditUserHelpers);

UserManagementPolymer.submitEditUserForm = function(event, template) {
	event.preventDefault();
	template.find('button[type=submit]').click();
};

Template.umEditUser.events({
	'click #saveUser': function(event, template) {
		UserManagementPolymer.submitEditUserForm(event, template);
	},
    'change #adminToggle': function(event, template) {
        var checkbox = $(template.find('input[name="profile.admin"]'));
        checkbox.prop("checked", !checkbox.prop("checked"));
    },
});

AutoForm.hooks({
    editUserForm: {
        onSuccess: function(operation, result, template) {
            var toast = $("[global-toast]")[0];
            toast.text = 'User was edited successfully';
            toast.show();
        }
    }
});