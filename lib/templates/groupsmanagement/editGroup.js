Meteor.startup(function() {

    Template.umEditGroup.helpers(UserManagementTemplates.umEditGroupHelpers);

    UserManagementPolymer.submitEditGroupForm = function(event, template) {
        event.preventDefault();
        template.find('button[type=submit]').click();
    };

    Template.umEditGroup.events({
        'click #saveGroup': function(event, template) {
            UserManagementPolymer.submitEditGroupForm(event, template);
        }
    });

    Template.umEditGroup.rendered = function() {
        var userList = this.find('.leader-list');
        var groupsList = this.find('groups-list');
        var ul = document.querySelector('.leader-list');
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
                $('.leader-list-wrapper').removeClass('hidden');
            } else {
                $('.leader-list-wrapper').addClass('hidden');
            }
            userList.users = users;
            if (users.length > 0) {
                ul.updateList();
            }
        });

        userList.clickedUserCallback = function(e, user) {
            UserManagementTemplates.umEditGroupEvents['click .fullname'].call(user, e);
            $('.leader-list-wrapper').addClass('hidden');
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
            UserManagementTemplates.umEditGroupEvents['click .parentGroup'].call(group, e);
            $('.groups-list-wrapper').addClass('hidden');
        };
    };

    AutoForm.hooks({
        editGroupForm: {
            onSuccess: function(operation, result, template) {
                var toast = $("[global-toast]")[0];
                toast.text = TAPi18n.__('editSuccess', TAPi18n.__('group'));
                toast.show();
                Router.go('umShowGroup', {
                    groupId: Router.current().params.groupId
                });
            },
            onError: function(operation, error, template) {
                var toast = $("[global-toast]")[0];
                toast.text = error.message;
                toast.show();
            }
        }
    });

});