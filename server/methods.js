//------------------------------------------------------------------------------------
// IMAGES
//------------------------------------------------------------------------------------
	
	// IMAGES - REMOVE----------------------------------------------------------------
		Meteor.methods({
			// SIDEIMAGE
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
				Products.remove({productCountId: productCountId});
				Images.remove({productCountId: productCountId});
			}
		});
