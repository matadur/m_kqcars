//------------------------------------------------------------------------------------
// PRODUCTS
//------------------------------------------------------------------------------------

	// PRODUCTS - DISPLAY-------------------------------------------------------------
		Template.products.helpers({
			products: function(){
				return Products.find({}, {sort: {createdAt: -1}});
			}
		});
	
	// PRODUCTS - DISPLAY - MY PRODUCTS-----------------------------------------------
		Template.my_products.helpers({
			my_products: function(){
				var owner = Meteor.userId();

				return Products.find({owner: owner}, {sort: {createdAt: -1}});
			}
		});

	// PPRODUCTS - CONTROLS VISIBILITY------------------------------------------------
		Template.product_controls.helpers({
			currentUsersProduct: function(){
				var currentUser = Meteor.userId();
				var currentProduct = this;
				var currentProductOwner = currentProduct.owner;

				if (currentUser == currentProductOwner) {
					return true;
				} else{
					return false;
				};
			}
		});

	// PPRODUCTS - MARK AS SOLD-------------------------------------------------------
		var markedAsSoldHelper = {
			markedAsSold: function() {
				var currentProduct = this;
				var markedAsSold = currentProduct.markedAsSold;

				if (markedAsSold == true) {
					return true;
				} else{
					return false;
				};
			}
		};
		Template.products_detail.helpers(markedAsSoldHelper);
		Template.products.helpers(markedAsSoldHelper);
		Template.my_products.helpers(markedAsSoldHelper);
		Template.product_controls.helpers(markedAsSoldHelper);

		Template.product_controls.events({
			'click .mark_as_sold': function() {
				Products.update(this._id, {$set: {markedAsSold: !this.markedAsSold}})
			}
		});

	// PRODUCTS - ADD-----------------------------------------------------------------
		Template.product_form_add.events({
			'submit .form--product_add': function(event){
				var productCountId 	= Session.get('productCountId');
				var owner		 	= Meteor.userId();
				var model 			= event.target.model.value;
				var cartype			= event.target.cartype.value;
				var geartype		= event.target.geartype.value;
				var fueltype		= event.target.fueltype.value;
				var kilometers 		= event.target.kilometers.value;
				var built 			= event.target.built.value;
				var wof 			= event.target.wof.value;
				var reg 			= event.target.reg.value;
				var price 			= event.target.price.value;
				var description 	= event.target.description.value;
				var email 			= event.target.email.value;
				var number 			= event.target.number.value;

				Meteor.call('addProduct', productCountId, owner, model, cartype, geartype, fueltype, kilometers, built, wof, reg, price, description, email, number)

				event.preventDefault();

				event.target.model.value 		= "";
				event.target.cartype.value		= "";
				event.target.geartype.value		= "";
				event.target.fueltype.value		= "";
				event.target.kilometers.value 	= "";
				event.target.built.value 		= "";
				event.target.wof.value 			= "";
				event.target.reg.value 			= "";
				event.target.price.value 		= "";
				event.target.description.value 	= "";
				event.target.email.value 		= "";
				event.target.number.value 		= "";

				Router.go('/products_add_success');
			}
		});

	// PRODUCTS - REMOVE--------------------------------------------------------------
		Template.product_controls.events({
			'click .remove': function() {
				if (confirm("Are you sure that you want to delete this Product?")) {
					var clickedProduct = Products.findOne(this._id);
					var productCountId = clickedProduct.productCountId;

					Meteor.call('removeProduct', productCountId);
					Router.go('/');
				}
			}
		});