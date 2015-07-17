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
		var addProductHooks = {
			before: {
				insert: function(doc) {
					doc.productCountId 	= Session.get('productCountId');
					doc.owner 			= Meteor.userId();
					doc.markedAsSold 	= false;
					doc.createdAt 		= new Date();
					return doc;
				}
			},
			onSuccess: function() {
				Router.go('/products_add_success');
			}
		}
		AutoForm.addHooks('product_form_add', addProductHooks);

	// PRODUCTS - EDIT-----------------------------------------------------------------
		var editProductHooks = {
			onSuccess: function() {
				Router.go('/my_products');
			}
		}
		AutoForm.addHooks('product_form_edit', editProductHooks);

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