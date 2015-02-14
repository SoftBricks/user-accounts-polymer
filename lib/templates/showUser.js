Template.umShowUser.helpers({
	firstname: 'Philipp',
	name: 'Sporrer',
	user: function () {
		return Meteor.users.findOne({_id: Router.current().params.userId});
	}
});

Template.umShowUser.events({
	'click .editUser': function () {
		Router.go('umEditUser',{
			userId: Router.current().params.userId
		});
	},
	'click .goToUsers': function () {
		Router.go('umShowUsers');
	}
});