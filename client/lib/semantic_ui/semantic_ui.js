//------------------------------------------------------------------------------------
// DROPDOWNS
//------------------------------------------------------------------------------------
	
	Template.product_controls.onRendered(function () {
		$('.ui.dropdown').dropdown();
	});

	Template.product_formfield_input_wof.onRendered(function () {
		$('.has-tooltip').popup({
			hoverable: true,
			position : 'bottom left',
			delay: {
				show: 190,
				hide: 0
			}
		});
	});
	