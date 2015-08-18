//------------------------------------------------------------------------------------
// HEADER - FILTER
//------------------------------------------------------------------------------------
	
	// CLEAR FILTER ON REFRESH -------------------------------------------------------
		Meteor.startup(function () {
			Session.set('filter', {});
		});

	// FILTER ------------------------------------------------------------------------
		Template.header_filter.events({
			// Everything
			'click .filter--none': function(event) {
				Session.set('filter', {});
			},
			// Price
			'click .filter--price': function(event) {
				var filter = event.target.getAttribute('data-filter');
				var filterNum = parseInt(filter);

				Session.set('filter', {price: {$lte: filterNum}});
			}
		});

