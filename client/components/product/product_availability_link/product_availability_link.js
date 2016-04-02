//------------------------------------------------------------------------------------
// PRODUCT AVAILABILITY LINK
//------------------------------------------------------------------------------------

	// PPRODUCT AVAILABILITY LINK - MARK AS SOLD-----------------------------------------------
		Template.product_availability_link.events({
			'click .mark_as_sold': function() {
				var currentProduct 		= Products.findOne(this._id);
				
				// Update Product
				Products.update(this._id, {$set: {isSold: !this.isSold}});
				
				// User Notification
				if (currentProduct.isSold) {
					sAlert.success(currentProduct.model + ' marked as "For Sale"');
				} else {
					sAlert.success(currentProduct.model + ' marked as "Sold"');
				};
			}
		});
