//------------------------------------------------------------------------------------
// PRODUCT - SETUP
//------------------------------------------------------------------------------------

	// SETUP - GENERATE A SHARED IMAGE-PRODUCT-ID-------------------------------------
		function productCountId() {
			var currentUser 	= Meteor.userId();
			var productCount 	= Products.find({owner: currentUser}).count() + 1;
			var productId 		= Math.floor(Math.random() * 123456789) + 1;
			var productCountId 	= "ProductNo_" + productCount + "_ProductId_" + productId;

			Session.set('productCountId', productCountId);
			this.next(); // For Iron:Router
		}
	
	// SETUP - EXECUTE ON ROUTE-------------------------------------------------------
		Router.onRun(productCountId, {only: ['products_add']});
