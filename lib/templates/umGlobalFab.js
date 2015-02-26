Template.umGlobalFab.helpers({
	globalFabAttributes: function () {
		var attsObj = Session.get('globalFabAttributes');
		// var atts = '';
		// _.each(attsObj, function(att, key) {
		// 	atts += ' '+key + '="'+att+'"';
		// });
		return attsObj;
	}
});