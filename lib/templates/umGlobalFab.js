Template.umGlobalFab.rendered = function () {
	this.eventHandler = function(){};
};

Template.umGlobalFab.helpers({
	hidden: function() {
		return !Session.get('globalFabVisible');
	},
	globalFabAttributes: function () {
		return Session.get('globalFabAttributes');
	}
});

Template.umGlobalFab.events({
	'tap .um-global-fab': function (e, template) {
		if(typeof Template.umGlobalFab.eventHandler === 'function'){
			Template.umGlobalFab.eventHandler(e, template);
		}
	}
});