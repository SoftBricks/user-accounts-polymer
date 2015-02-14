Template.umEditUser.helpers({
	name: 'Philipp Sporrer',
	user: function () {
		console.log(Meteor.users.findOne({_id: Router.current().params.userId}));
		return Meteor.users.findOne({_id: Router.current().params.userId});
	}
});

Template.umEditUser.events({
	'click .goToUserDetail': function () {
		Router.go('umShowUser', {
			userId: Router.current().params.userId
		});
	}
});