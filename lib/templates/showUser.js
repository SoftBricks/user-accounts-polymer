Template.umShowUser.helpers({
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