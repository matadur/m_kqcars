//------------------------------------------------------------------------------------
// PPRODUCT HIGHLIGHT LABEL
//------------------------------------------------------------------------------------

// PPRODUCT HIGHLIGHT LABEL - POPUP---------------------------------------------------
	Template.product_highlight_label.onRendered(function () {
		$('.label--highlight').popup({
			hoverable: true,
			position : 'right center',
			delay: {
				show: 190,
				hide: 0
			}
		});
	});