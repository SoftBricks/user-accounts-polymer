Template.umEditUser.helpers(UserManagementTemplates.umEditUserHelpers);

UserManagementPolymer.submitEditUserForm = function(event, template) {
	event.preventDefault();
	template.find('button[type=submit]').click();
};

Template.umEditUser.events({
	'click #createUser': function(event, template) {
		UserManagementPolymer.submitEditUserForm(event, template);
	},
});

AutoForm.hooks({
    editUserForm: {
        onSuccess: function(operation, result, template) {
        	console.log(operation, result);
            var toast = $("[global-toast]")[0];
            toast.text = 'User was edited successfully';
            toast.show();
        }
    }
});