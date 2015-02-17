Template.umEditUser.helpers(UserManagementTemplates.umEditUserHelpers);

UserManagementPolymer.submitEditUserForm = function(event, template) {
	event.preventDefault();
	var decorators = template.findAll('paper-input-decorator');
	_.each(decorators, function(decorator) {
		var input = $(decorator).find('input');
		decorator.isInvalid = !input[0].validity.valid;
	});
	template.find('button[type=submit]').click();
};
Template.umEditUser.helpers({
	name: function(){
		return Meteor.users.findOne({_id: Router.current().params.userId},{
			_id:false,
			admin:false,
			createdAt:false,
			emails:false,
			services: false,
			superAdmin:false,
			username:false
		}).profile.fullname;
	},
	user: function () {
		return Meteor.users.findOne({_id: Router.current().params.userId});
	}
});

Template.umEditUser.events({
	'click #editUser': function (event, template) {
		UserManagementPolymer.submitEditUserForm(event, template);
	}
});