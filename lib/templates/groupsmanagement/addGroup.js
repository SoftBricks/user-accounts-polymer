Meteor.startup(function() {
	Template.umAddGroup.helpers(_.extend(UserManagementTemplates.umAddGroupHelpers, {

	}));
	UserManagementPolymer.submitForm = function(event, template) {
		event.preventDefault();
		template.find('button[type=submit]').click();
	};
	Template.umAddGroup.events(_.extend(UserManagementTemplates.umAddGroupEvents, {
		'click #createGroup': function(event, template) {
			UserManagementPolymer.submitForm(event, template);
		}
	}));
	Template.umAddGroup.rendered = function() {
		var userList = this.find('user-list');
		var groupsList = this.find('groups-list');
		var ul = document.querySelector('user-list');
		var gl = document.querySelector('groups-list');

		Tracker.autorun(function() {
			var users = LeaderSearch.getData({
				transform: function(matchText, regExp) {
					return matchText;
				},
				sort: {
					isoScore: -1
				}
			});
			if (users.length > 0) {
				$('.user-list-wrapper').removeClass('hidden');
			} else {
				$('.user-list-wrapper').addClass('hidden');
			}
			userList.users = users;
			if (users.length > 0) {
				ul.updateList();
			}
		});

		userList.clickedUserCallback = function(e, user) {
			UserManagementTemplates.umAddGroupEvents['click .fullname'].call(user, e);
			$('.user-list-wrapper').addClass('hidden');
		};

		// groups list
		Tracker.autorun(function() {
			var groups = SubGroupSearch.getData({
				transform: function(matchText, regExp) {
					return matchText;
				},
				sort: {
					isoScore: -1
				}
			});
			if (groups.length > 0) {
				$('.groups-list-wrapper').removeClass('hidden');
			} else {
				$('.groups-list-wrapper').addClass('hidden');
			}
			groupsList.groups = groups;
			if (groups.length > 0) {
				gl.updateList();
			}
		});

		groupsList.clickedGroupCallback = function(e, group) {
			UserManagementTemplates.umAddGroupEvents['click .parentGroup'].call(group, e);
			$('.groups-list-wrapper').addClass('hidden');
		};
	};
	AutoForm.hooks({
		addGroupForm: {
			onSuccess: function(operation, result, template) {
				var toast = $("[global-toast]")[0];
				toast.text = 'Group was created successfully';
				toast.show();
				Router.go('umShowGroups');
			},
			onError: function(operation, error, template) {
				var toast = $("[global-toast]")[0];
				toast.text = error.message;
				toast.show();
			}
		}
	});
});