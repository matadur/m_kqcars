//------------------------------------------------------------------------------------
// PRODUCT FAVORITES
//------------------------------------------------------------------------------------

	// PRODUCT FAVORITES - HEART ICON-------------------------------------------------
		Template.product_favorite.helpers({
			is_favorite: function(){
				var currentUser 		= Meteor.user();
				var currentFavorites 	= currentUser.profile.favorites;
				var currentProduct 		= Products.findOne(this._id);
				var productCountId		= currentProduct.productCountId;

				if (currentFavorites.indexOf(productCountId) != -1) {
					return true;
				} else {
					return false;
				};
			}
		});

	// PRODUCT FAVORITES - DISPLAY PRODUCTS-------------------------------------------
		Template.page_products_favorites.helpers({
			products_favorites: function(){
				var currentUser 		= Meteor.user();
				var currentFavorites 	= currentUser.profile.favorites;

				return Products.find({productCountId: {$in: currentFavorites}}, {sort: {createdAt: -1}});
			}
		});
	
	// PRODUCT FAVORITES - ADD TO USER------------------------------------------------
		Template.product_favorite.events({
			'click .button--favorite': function() {
				var currentUser 		= Meteor.userId();
				var currentProduct 	 	= Products.findOne(this._id);
				var productCountId		= currentProduct.productCountId;
				var currentProductModel = currentProduct.model;
				var currentFavorites 	= Meteor.users.findOne({_id: currentUser}).profile.favorites;

				// Update User Favorites  - Add
				Meteor.users.update({_id: currentUser}, {$addToSet: {'profile.favorites': productCountId}});
				// Update User Favorites - Remove
				if (currentFavorites.indexOf(productCountId) != -1) {
					Meteor.users.update({_id: currentUser}, {$pull: {'profile.favorites': productCountId}});
				};

				// Alerts
				if (currentFavorites.indexOf(productCountId) == -1) {
					sAlert.success(currentProductModel + ' added to <a href="/products_favorites">Favorites</a>');
				} else {
					sAlert.success(currentProductModel + ' removed from <a href="/products_favorites">Favorites</a>');
				};
			}
		});
