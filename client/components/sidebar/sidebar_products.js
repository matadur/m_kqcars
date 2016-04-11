//------------------------------------------------------------------------------------
// SIDEBAR PRODUCTS
//------------------------------------------------------------------------------------

	Template.sidebar_products.helpers({
		products_count: function(){
			return Products.find().count();
		},
		products_user_count: function(){
			var owner = Meteor.userId();

			return Products.find({owner: owner}).count();
		},
		products_favorite_count: function() {
			var currentUser 			= Meteor.user();
			var currentFavorites 		= currentUser.profile.favorites;

			if (currentFavorites === null || typeof currentFavorites === 'undefined') {
				return '0';
			} else {
				return currentFavorites.length;
			};
		} 
	});