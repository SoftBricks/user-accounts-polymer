UMP = {
	initialized: false,
	configure: function() {
		if (this.initialized === false) {
			this._headerPanelId = 'headerPanel';
		}
	},
	_init: function() {
		this.initialized = true;
		this.configure();
	}
};
UMP.setHeaderPanelId = function(id) {
	this._headerPanelId = id;
};
UserManagementPolymer = UMP;

// Initialization
Meteor.startup(function() {
	UserManagementPolymer._init();
	if(Meteor.isClient){
		AutoForm.setDefaultTemplate('paper');
	}
});