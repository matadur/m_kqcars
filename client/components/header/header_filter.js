//------------------------------------------------------------------------------------
// HEADER - FILTER
//------------------------------------------------------------------------------------
	
	// FILTER - PRICE-----------------------------------------------------------------
		Template.header_filter.events({
			'click .filter--price': function(event) {
				var filter = event.target.getAttribute('data-filter');
				var filterNum = parseInt(filter);

				Session.set('filter', {price: {$lte: filterNum}});
			}
		});

