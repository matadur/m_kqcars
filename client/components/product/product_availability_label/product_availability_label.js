//------------------------------------------------------------------------------------
// PPRODUCT AVAILABILITY LABEL
//------------------------------------------------------------------------------------

// PPRODUCT AVAILABILITY LABEL - POPUP---------------------------------------------------
	Template.product_availability_label.onRendered(function () {
		$('.label--sold').popup({
			hoverable: true,
			position : 'left center',
			delay: {
				show: 190,
				hide: 0
			}
		});
	});