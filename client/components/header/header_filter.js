//------------------------------------------------------------------------------------
// HEADER - FILTER
//------------------------------------------------------------------------------------
	
	// FILTER - PRICE-----------------------------------------------------------------
		Template.header_filter.events({
			'click .header_filter .item': function(event) {
				var filter = event.target.getAttribute('data-filter');

				// Filter: Price
				Session.set('filter', 'price: {$gt: ' + filter + '}');
			}
		});

