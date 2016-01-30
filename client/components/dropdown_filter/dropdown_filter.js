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
			// Price
			'click .filter--price': function(event) {
				var filter = event.target.getAttribute('data-filter');
				var filterNum = parseInt(filter);

				Session.set('filter', {price: {$lte: filterNum}});
			}
		});

