//------------------------------------------------------------------------------------
// PRODUCT FAVORITES
//------------------------------------------------------------------------------------

	// PRODUCT FAVORITES - DISPLAY COUNT----------------------------------------------
		Template.sidebar_products.helpers({
			product_favorite_count: function() {
				var currentUser 			= Meteor.user();
				var currentFavorites 		= currentUser.profile.favorites;
				var currentFavoritesCount 	= currentFavorites.length;

				return currentFavoritesCount;
			} 
		});

	// PRODUCT FAVORITES - HEART ICON-------------------------------------------------
		Template.product_favorite.helpers({
			is_favorite: function(){
				var currentUser 		= Meteor.user();
				var currentFavorites 	= currentUser.profile.favorites;
				var currentProduct 		= this._id;

				if (currentFavorites.indexOf(currentProduct) != -1) {
					return true;
				} else {
					return false;
				};
			}
		});

	// PRODUCT FAVORITES - DISPLAY PRODUCTS-------------------------------------------
		Template.favorite_products.helpers({
			favorite_products: function(){
				var currentUser 		= Meteor.user();
				var currentFavorites 	= currentUser.profile.favorites;

				return Products.find({_id: {$in: currentFavorites}}, {sort: {createdAt: -1}});
			}
		});
	
	// PRODUCT FAVORITES - ADD TO USER------------------------------------------------
		Template.product_favorite.events({
			'click .button--favorite': function() {
				var currentUser 		= Meteor.userId();
				var currentProduct 	 	= this._id;
				var currentProductModel 	= Products.findOne(this._id).model;
				var currentFavorites 	= Meteor.users.findOne({_id: currentUser}).profile.favorites;

				// Update User Favorites  - Add
				Meteor.users.update({_id: currentUser}, {$addToSet: {'profile.favorites': currentProduct}});
				// Update User Favorites - Remove
				if (currentFavorites.indexOf(currentProduct) != -1) {
					Meteor.users.update({_id: currentUser}, {$pull: {'profile.favorites': currentProduct}});
				};

				// Alerts
				if (currentFavorites.indexOf(currentProduct) == -1) {
					sAlert.success(currentProductModel + ' added to <a href="/favorite_products">Favorites</a>');
				} else {
					sAlert.success(currentProductModel + ' removed from <a href="/favorite_products">Favorites</a>');
				};
			}
		});
