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
  api.use('softbricks:user-management', ['client', 'server']);
  api.imply('softbricks:user-management@0.0.1', ['client', 'server']);

  api.addFiles(['lib/templates/userList.html', 'lib/templates/userList.js'], 'client');
  api.addFiles('lib/templates/userDetailView.html');
  api.addFiles('lib/templates/editUser.html');
  api.addFiles('lib/templates/addUser.html');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('softbricks:user-management-polymer');
  api.addFiles('softbricks:user-management-polymer-tests.js');
});