//------------------------------------------------------------------------------------
// DROPDOWN - FILTER
//------------------------------------------------------------------------------------
	
	// SETUP - INITIALIZE DROPDOWN----------------------------------------------------
		Template.dropdown_filter.onRendered(function () {
			$('.ui.dropdown').dropdown();
		});

	// SETUP - CLEAR FILTER ON REFRESH -----------------------------------------------
		Meteor.startup(function () {
			Session.set('filter', {});
		});

	// FILTER ------------------------------------------------------------------------
		Template.dropdown_filter.events({
			// Everything
			'click .filter--everything': function(event) {
				Session.set('filter', {});
			},
			// Highlights
			'click .filter--highlights': function(event) {
				Session.set('filter', {isHighlight: {$not: false}}); //beacause $eq: not supported by minimongo
			},
			// Price
			'click .filter--price': function(event) {
				var filter = event.target.getAttribute('data-filter');
				var filterNum = parseInt(filter);

				Session.set('filter', {price: {$lte: filterNum}});
			}
		});

