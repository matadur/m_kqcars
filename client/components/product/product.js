//------------------------------------------------------------------------------------
// PRODUCTS
//------------------------------------------------------------------------------------
  
	// PRODUCTS - DISPLAY-------------------------------------------------------------
		Template.page_products.helpers({
			products: function(){
				var filter = Session.get('filter');

				return Products.find(filter, {sort: {createdAt: -1}});
			}
		});
	
	// PRODUCTS - DISPLAY - MY PRODUCTS-----------------------------------------------
		Template.page_products_user.helpers({
			products_user: function(){
				var owner = Meteor.userId();

				return Products.find({owner: owner}, {sort: {createdAt: -1}});
			}
		});

	// PRODUCTS - ADD-----------------------------------------------------------------
		var addProductHooks = {
			before: {
				insert: function(doc) {
					doc.productCountId 	= Session.get('productCountId');
					doc.owner 			= Meteor.userId();
					doc.isSold 			= false;
					doc.isHighlight 	= false;
					doc.createdAt 		= new Date();
					return doc;
				}
			},
			onSuccess: function() {
				FlowRouter.go('/products_add_success');
				sAlert.success('Awesome! Your product is now for sale!');
			}
		}
		AutoForm.addHooks('product_form_add', addProductHooks);

	// PRODUCTS - EDIT----------------------------------------------------------------
		var editProductHooks = {
			onSuccess: function() {
				FlowRouter.go('/products_edit_success');
				sAlert.success('Great! All changes saved!');
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
					FlowRouter.go('/');
					sAlert.success('Done! Your product was removed!');
				}
			}
		});

	// PRODUCTS - PDF-----------------------------------------------------------------
		Template.product_controls.events({
			'click .instructions--pdf': function() {
				var clickedProduct = Products.findOne(this._id);
				var clickedProductId = clickedProduct._id;

				Session.set('clickedProductId', clickedProductId);
			}
		});
		Template.page_products_pdf.events({
			'click .button--clear-clicked-product': function() {
				Session.set('clickedProductId', null);
			}
		});

	// PRODUCTS - HIGHLIGHT-----------------------------------------------------------
		Template.product_controls.events({
			'click .instructions--highlight': function() {
				var clickedProduct = Products.findOne(this._id);
				var clickedProductId = clickedProduct._id;

				Session.set('clickedProductId', clickedProductId);
			}
		});
		Template.page_products_highlight.events({
			'click .button--clear-clicked-product': function() {
				Session.set('clickedProductId', null);
			}
		});