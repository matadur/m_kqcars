//------------------------------------------------------------------------------------
// SETUP - IMAGE-PRODUCT-RELATION-HOOK
//------------------------------------------------------------------------------------

	// SETUP - GENERATE A SHARED IMAGE-PRODUCT-ID-------------------------------------
	function productCountId() {
		var currentUser 	= Meteor.userId();
		var productCount 	= Products.find({owner: currentUser}).count() + 1;
		var productId 		= Math.floor(Math.random() * 123456789) + 1;
		var productCountId 	= "ProductNo_" + productCount + "_ProductId_" + productId;

		Session.set('productCountId', productCountId);
		this.next(); // For Iron:Router
	}
	// SETUP - GENERATE SHARED IMAGE-PRODUCT-ID ON ROUTE------------------------------
	Router.onRun(productCountId, {only: ['my_products_add']});




//------------------------------------------------------------------------------------
// IMAGES
//------------------------------------------------------------------------------------

	// IMAGES - DISPLAY - SIDEIMAGE---------------------------------------------------
	Template.productfield_image_side.helpers({
		sideimages: function () {
			return Images.find({imageType: "sideimage"});
		}
	});
	// Template.list.helpers({
	// 	cards: function() {
	// 		var baustelle = Baustellen.findOne(this._id);
	// 		var baustellenTitel = baustelle.title;

	// 		return Mitarbeiter.find({baustelle: baustellenTitel});
	// 	}
	// });

	// IMAGES - UPLOAD - SIDEIMAGE----------------------------------------------------
	Template.form_products_add.events({
		'change .fileinput': function(event, template) {
			var productCountId = Session.get('productCountId');
			var imageTypeCount = Images.find({imageType: "sideimage"}).count();

			// Note: remove previous image before re-upload
			if (imageTypeCount != 0) {
				Meteor.call('removeSideimage', productCountId);
			};

			FS.Utility.eachFile(event, function(file) {
				var tmpdoc 				= new FS.File(file);
				tmpdoc.productCountId 	= productCountId;
				tmpdoc.imageType 		= "sideimage";

				Images.insert(tmpdoc, function (err) {

				});
			});
		}
	});




//------------------------------------------------------------------------------------
// PRODUCTS
//------------------------------------------------------------------------------------

	// PRODUCTS - DISPLAY-------------------------------------------------------------
	Template.products.helpers({
		products: function(){
			return Products.find();
		}
	});

	// PRODUCTS - ADD-----------------------------------------------------------------
	Template.form_products_add.events({
		'submit .form--products_add': function(event){
			var productCountId 	= Session.get('productCountId');
			var owner		 	= Meteor.userId();
			var model 			= event.target.model.value;
			var kilometers 		= event.target.kilometers.value;
			var built 			= event.target.built.value;
			var wof 			= event.target.wof.value;
			var reg 			= event.target.reg.value;
			var price 			= event.target.price.value;
			var description 	= event.target.description.value;
			var email 			= event.target.email.value;
			var number 			= event.target.number.value;

			Meteor.call('addProduct', productCountId, owner, model, kilometers, built, wof, reg, price, description, email, number)

			event.preventDefault();

			event.target.model.value 		= "";
			event.target.kilometers.value 	= "";
			event.target.built.value 		= "";
			event.target.wof.value 			= "";
			event.target.reg.value 			= "";
			event.target.price.value 		= "";
			event.target.description.value 	= "";
			event.target.email.value 		= "";
			event.target.number.value 		= "";

			Router.go('/');
		}
	});

	// PRODUCTS - REMOVE--------------------------------------------------------------
	Template.products.events({
		'click .remove': function() {
			var clickedProduct = Products.findOne(this._id);
			var productCountId = clickedProduct.productCountId;

			Meteor.call('removeProduct', productCountId);
		}
	});
	Template.products_detail.events({
		'click .remove': function() {
			var clickedProduct = Products.findOne(this._id);
			var productCountId = clickedProduct.productCountId;

			Meteor.call('removeProduct', productCountId);
			Router.go('/');
		}
	});