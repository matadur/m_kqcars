//------------------------------------------------------------------------------------
// PRODUCT FAVORITES
//------------------------------------------------------------------------------------

	// PRODUCT FAVORITES - DISPLAY COUNT----------------------------------------------
		Template.sidebar_products.helpers({
			product_favorite_count: function() {
				var currentUser 	= Meteor.user();
				var favorites 		= Meteor.user().profile.favorites;
				var favoritesCount 	= favorites.length;

				console.log(favorites);
				console.log(favoritesCount);

				return favoritesCount;
			} 
		});
	
	// PRODUCT FAVORITES - ADD TO USER------------------------------------------------
		Template.product_favorite.events({
			'click .button--favorite': function() {
				var currentUser 		= Meteor.userId();
				var currentProduct 	 	= this._id;
				var currentFavorites 	= Meteor.users.findOne({_id: currentUser}).profile.favorites;

				Meteor.users.update({_id: currentUser}, {$addToSet: {'profile.favorites': currentProduct}});
				
				if (currentFavorites.indexOf(currentProduct) != -1) {
					Meteor.users.update({_id: currentUser}, {$pull: {'profile.favorites': currentProduct}});
				};
			}
		});
