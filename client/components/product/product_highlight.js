//------------------------------------------------------------------------------------
// PRODUCT HIGHLIGHT
//------------------------------------------------------------------------------------
	
	// PAYMENT FORM - CONNECT TO BRAINTREE METHOD-------------------------------------
		Template.products_highlight_instructions.onRendered(function() {
			Meteor.call('getClientToken', function(error, clientToken) {
				if (error) {
					console.log(error);
				} else {
					braintree.setup(clientToken, "dropin", {
						container: "payment-form--highlight", // Injecting into <div id="payment-form"></div>
						onPaymentMethodReceived: function (response) {
							// When we submit the payment form,
							// it'll create new customer first...
							var nonce = response.nonce;

							Meteor.call('btCreateCustomer', function(error, success) {
								if (error) {
									throw new Meteor.Error('customer-creation-failed');
								} else {
									// ... and when the customer is successfuly created,
									// call method for creating a transaction (finally!)
									Meteor.call('createTransaction', nonce, function(error, success) {
										if (error) {
											throw new Meteor.Error('transaction-creation-failed');
										} else {
											alert('Thank you for your payment! Reload page to access our premium items!');
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
		Template.products_highlight_instructions.helpers({
			paidHighlight: function() {
				var userId = Meteor.userId();
				var paidHighlight = Roles.userIsInRole(userId, 'paidHighlight');

				if (paidHighlight == true) {
					return true
				} else {
					return false
				};
			}
		});

	// HIGHLIGHT BUTTON--------------------------------------------------------------- (Needed?)
		Template.products_highlight_instructions.events({
			'click .button--highlight': function() {
				console.log("In progress");
			}
		});

	
