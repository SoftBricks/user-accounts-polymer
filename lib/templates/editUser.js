Template.umEditUser.helpers({
	name: 'Philipp Sporrer',
	user: function () {
		return Meteor.users.findOne({_id: Router.current().params.userId});
	}
});