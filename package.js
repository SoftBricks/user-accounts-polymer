Package.describe({
  name: 'softbricks:user-management-polymer',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');

  api.use(['templating'], 'client');
  api.use(['underscore', 'reactive-var'], ['client', 'server']);

  api.use('softbricks:user-management', ['client', 'server']);
  api.imply('softbricks:user-management@0.0.1', ['client', 'server']);
  
  api.use(['useraccounts:polymer']);
  api.imply(['useraccounts:polymer']);

  api.use('conielo:autoform-polymer-paper@0.1.2', 'client');


  api.addFiles('lib/templates/umLayout.html', 'client');
  api.addFiles('lib/templates/umGlobalFab.html', 'client');
  api.addFiles('lib/templates/umGlobalFab.js', 'client');
  api.addFiles('lib/umUi.js', 'client');

  api.addFiles('lib/stylesheets/colors.css', 'client');
  api.addFiles('lib/stylesheets/general.css', 'client');
  api.addFiles('lib/coreExtension.js', ['client', 'server']);
  api.addFiles(['lib/templates/usermanagement/showUsers.html', 'lib/templates/usermanagement/showUsers.js', 'lib/stylesheets/showUsers.css'], 'client');
  api.addFiles(['lib/templates/usermanagement/showUser.html', 'lib/templates/usermanagement/showUser.js', 'lib/stylesheets/showUser.css'],  'client');
  api.addFiles(['lib/templates/usermanagement/editUser.html', 'lib/templates/usermanagement/editUser.js', 'lib/stylesheets/editUser.css'], 'client');
  api.addFiles(['lib/templates/usermanagement/addUser.html', 'lib/templates/usermanagement/addUser.js'], 'client');

  // groups
  api.addFiles(['lib/templates/groupsmanagement/showGroups.html', 'lib/templates/groupsmanagement/showGroups.js'], ['client']);
  api.addFiles(['lib/templates/groupsmanagement/showGroup.html', 'lib/templates/groupsmanagement/showGroup.js'], ['client']);
  api.addFiles(['lib/templates/groupsmanagement/addGroup.html', 'lib/templates/groupsmanagement/addGroup.js', 'lib/stylesheets/addGroup.css'], ['client']);
  api.addFiles(['lib/templates/groupsmanagement/editGroup.html', 'lib/templates/groupsmanagement/editGroup.js'], ['client']);
  api.addFiles(['lib/templates/groupsmanagement/groupMembers.html', 'lib/templates/groupsmanagement/groupMembers.js'], ['client']);

  // roles
  api.addFiles(['lib/templates/roles/manageRoles.html', 'lib/templates/roles/manageRoles.js'], ['client']);
  api.addFiles(['lib/templates/roles/addRole.html', 'lib/templates/roles/addRole.js'], ['client']);
  api.addFiles(['lib/templates/roles/deleteRole.html', 'lib/templates/roles/deleteRole.js'], ['client']);

  api.export(['UserManagementPolymer', 'UmUi'], ['client', 'server']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('softbricks:user-management-polymer');
  api.addFiles('softbricks:user-management-polymer-tests.js');
});