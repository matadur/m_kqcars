//------------------------------------------------------------------------------------
// PRODUCT PDF
//------------------------------------------------------------------------------------

	Template.product_form_pdf.events({
		'click .button--pdf': function(e, tmpl) {
			e.preventDefault();
			var clickedProductId = Session.get('clickedProductId');
			console.log(clickedProductId);

			Meteor.call('method_generate_pdf_basic', function() {
				if (err) {
					console.error(err);
				} else if (res) {
					window.open("data:application/pdf;base64, " + res);
					// OPTIONAL: Open in same window
					// window.location.assign("data:application/pdf;base64, " + res);
				}
			});
		}
	});
