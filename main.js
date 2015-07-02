if (Meteor.isClient) {

	// SUBSCRIPTIONS
	Meteor.subscribe('products');

	// PRODUCTS 
		// PRODUCTS - DISPLAY
		Template.products.helpers({
			products: function(){
				return Products.find();
			}
		});

		// PRODUCTS - ADD
		Template.form_products_add.events({
			'submit .form--products_add': function(event){
				var model 		= event.target.model.value;
				var kilometers 	= event.target.kilometers.value;
				var built 		= event.target.built.value;
				var wof 		= event.target.wof.value;
				var reg 		= event.target.reg.value;
				var price 		= event.target.price.value;
				var description = event.target.description.value;
				var email 		= event.target.email.value;
				var number 		= event.target.number.value;

				Products.insert({
					model: model,
					kilometers: kilometers,
					built: built,
					wof: wof,
					reg: reg,
					price: price,
					description: description,
					email: email,
					number: number
				});

				event.preventDefault();

				event.target.model.value = "";
				event.target.kilometers.value = "";
				event.target.built.value = "";
				event.target.wof.value = "";
				event.target.reg.value = "";
				event.target.price.value = "";
				event.target.description.value = "";
				event.target.email.value = "";
				event.target.number.value = "";

				Router.go('/');
			}
		});

		// PRODUCTS - REMOVE
		Template.products.events({
			'click .product__button--remove': function() {
				Products.remove(this._id);
			}
		});
}

if (Meteor.isServer) {
	// STARTUP
	Meteor.startup(function () {

	});

	// PIBLICATIONS
	Meteor.publish('products', function() {
		return Products.find();     
	});
}
