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
  api.use(['underscore'], ['client', 'server']);
  api.use('softbricks:user-management', ['client', 'server']);
  api.imply('softbricks:user-management@0.0.1', ['client', 'server']);



  api.addFiles('lib/stylesheets/colors.css', 'client');
  api.addFiles('lib/stylesheets/general.css', 'client');
  api.addFiles('lib/coreExtension.js', ['client', 'server']);
  api.addFiles(['lib/templates/showUsers.html', 'lib/templates/showUsers.js'], 'client');
  api.addFiles(['lib/templates/showUser.html', 'lib/templates/showUser.js', 'lib/stylesheets/showUser.css'],  'client');
  api.addFiles(['lib/templates/editUser.html', 'lib/templates/editUser.js', 'lib/stylesheets/editUser.css'], 'client');
  api.addFiles('lib/templates/addUser.html');

  api.export('UserManagementPolymer', ['client', 'server']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('softbricks:user-management-polymer');
  api.addFiles('softbricks:user-management-polymer-tests.js');
});