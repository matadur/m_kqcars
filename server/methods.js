//------------------------------------------------------------------------------------
// IMAGES
//------------------------------------------------------------------------------------
	
	// IMAGES - REMOVE----------------------------------------------------------------
		Meteor.methods({
			// SIDEIMAGE
			removeSideimage: function(productCountId) {
				Images.remove({
					productCountId: productCountId,
					imageType: "sideimage"
				});
			},
			// FRONTIMAGE
			removeFrontimage: function(productCountId) {
				Images.remove({
					productCountId: productCountId,
					imageType: "frontimage"
				});
			},
			// INFRONTIMAGE
			removeInfrontimage: function(productCountId) {
				Images.remove({
					productCountId: productCountId,
					imageType: "infrontimage"
				});
			},
			// INBACKIMAGE
			removeInbackimage: function(productCountId) {
				Images.remove({
					productCountId: productCountId,
					imageType: "inbackimage"
				});
			}
		});
	
		
//------------------------------------------------------------------------------------
// PRODUCTS
//------------------------------------------------------------------------------------

	// PRODUCTS - REMOVE--------------------------------------------------------------
		Meteor.methods({
			removeProduct: function(productCountId){
				Products.remove({productCountId: productCountId});
				Images.remove({productCountId: productCountId});
			}
		});
