//------------------------------------------------------------------------------------
// PRODUCT HIGHLIGHT
//------------------------------------------------------------------------------------
	
	// PAYMENT FORM - HIGHLIGHT-------------------------------------------------------
		Template.product_form_highlight.onRendered(function() {
			Meteor.call('getClientToken', function(error, clientToken) {
				if (error) {
					console.log(error);
				} else {
					braintree.setup(clientToken, "dropin", {
						container: "payment-form--highlight", // Injecting into <div id="payment-form"></div>
						onPaymentMethodReceived: function (response) {
							// When we submit the payment form,
							// it'll create new customer first...
							var nonceFromClient = response.nonce;
							var clickedProductId = Session.get('clickedProductId');

							Meteor.call('btCreateCustomer', function(error, success) {
								if (error) {
									throw new Meteor.Error('customer-creation-failed');
								} else {
									// ... and when the customer is successfuly created,
									// call method for creating a transaction (finally!)
									Meteor.call('createTransactionHighlight', nonceFromClient, clickedProductId, function(error, success) {
										if (error) {
											throw new Meteor.Error('transaction-creation-failed');
										} else {
											Router.go('/');
											sAlert.success('Great! Your Car is now a Highlight!');
										}
									});
								}
							});
						}
					});
				}
			});
		});

	// PAYMENT FORM HELPER------------------------------------------------------------
		Template.product_form_highlight.helpers({
			isHighlight: function() {
				var clickedProductId = Session.get('clickedProductId');
				var currentProduct 	 = Products.findOne({_id: clickedProductId});

				if (currentProduct.isHighlight == true) {
					return true
				} else {
					return false
				};
			}
		});

	
