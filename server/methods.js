//------------------------------------------------------------------------------------
// IMAGES
//------------------------------------------------------------------------------------
	
	// IMAGES - REMOVE----------------------------------------------------------------
		Meteor.methods({
			// FOR: SINGLE IMAGE REMOVAL
			removeImage: function(productCountId, imageType) {
				Images.remove({
					productCountId: productCountId,
					imageType: imageType
				});
			}
		});
	
		
//------------------------------------------------------------------------------------
// PRODUCTS
//------------------------------------------------------------------------------------

	// PRODUCTS - REMOVE--------------------------------------------------------------
		Meteor.methods({
			removeProduct: function(productCountId){
				// Remove Product
				Products.remove({productCountId: productCountId});
				// Remove accociated Images
				Images.remove({productCountId: productCountId});
				// Remove Product from every users Favorites
				Meteor.users.update({}, {$pull: {'profile.favorites': productCountId}}, {multi: true});
			}
		});


//------------------------------------------------------------------------------------
// PAYMENTS
//------------------------------------------------------------------------------------
	
	// SETUP ENVIRONMENT--------------------------------------------------------------
		var gateway;

		Meteor.startup(function () {
			var env;
			
			// Pick Braintree environment based on environment defined in Meteor settings.
			if (Meteor.settings.public.env === 'Production') {
				env = Braintree.Environment.Production;
			} else {
				env = Braintree.Environment.Sandbox;
			}
			// Initialize Braintree connection:
			gateway = BrainTreeConnect({
				environment: env,
				publicKey: Meteor.settings.public.BT_PUBLIC_KEY,
				privateKey: Meteor.settings.private.BT_PRIVATE_KEY,
				merchantId: Meteor.settings.public.BT_MERCHANT_ID
			});
		});

	// DEFINE PAYMENT METHODS--------------------------------------------------------
	Meteor.methods({
		// CLIENT TOKEN
		getClientToken: function (clientId) {
			var generateToken = Meteor.wrapAsync(gateway.clientToken.generate, gateway.clientToken);
			var options = {};

			if (clientId) {
				options.clientId = clientId;
			}

			var response = generateToken(options);
			return response.clientToken;
		},
		// CREATE CUSTOMER ON BRAINTREE
		btCreateCustomer: function(){
			var user = Meteor.user();

			var customerData = {
				email: user.emails[0].address
			};

			// Calling the Braintree API to create our customer!
			gateway.customer.create(customerData, function(error, response){
				if (error){
					console.log(error);
				} else {
					// If customer is successfuly created on Braintree servers,
					// we will now add customer ID to our User
					Meteor.users.update(user._id, {
						$set: {
							customerId: response.customer.id
						}
					});
				}
			});
		},
		// CREATE TRANSACTION - HIGHLIGHT
		createTransactionHighlight: function(nonceFromClient, clickedProductId) {
			var user = Meteor.user();

			// Let's create transaction.
			gateway.transaction.sale({
				amount: '5.00',
				paymentMethodNonce: nonceFromClient, // Generated nonce passed from client
				customer: {
					id: user.customerId
				},
				options: {
					submitForSettlement: true, // Payment is submitted for settlement immediatelly
					storeInVaultOnSuccess: true // Store customer in Braintree's Vault
				}
			}, function (err, success) {
				if (err) { 
					console.log(err);
				} else {
					// When payment's successful...
					Products.update({_id: clickedProductId}, {$set: {isHighlight: true}});
				}
			});
		}
	});