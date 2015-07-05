// IMAGE-PRODUCT-RELATION-HOOK
// When routed to add-form:
// Generate "productCountId"
// Add it to images & product to connect them
function productCountId() {
	var currentUser 	= Meteor.userId();
	var productCount 	= Products.find({owner: currentUser}).count() + 1;
	var randomNumber 	= Math.floor(Math.random() * 123456789) + 1;
	var productCountId 	= "ProductNo_" + productCount + "_ProductId_" + randomNumber;

	Session.set('productCountId', productCountId);
	this.next(); // For Iron:Router
}
Router.onRun(productCountId, {only: ['my_products_add']});




// IMAGES - UPLOAD - SIDEIMAGE
Template.form_products_add.events({
	'change .fileinput': function(event, template) {
		var productCountId = Session.get('productCountId');

		FS.Utility.eachFile(event, function(file) {
			var tmpdoc 				= new FS.File(file);
			tmpdoc.productCountId 	= productCountId;
			tmpdoc.imageType 		= "sideimage";

			Images.insert(tmpdoc, function (err) {
				
			});
		});
	}
});

// IMAGES - DISPLAY - SIDE
Template.productfield_image_side.helpers({
	sideimages: function () {
		return Images.find({imageType: "sideimage"});
	}
});




// PRODUCTS - DISPLAY
Template.products.helpers({
	products: function(){
		return Products.find();
	}
});

// PRODUCTS - ADD
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

		Products.insert({
			productCountId: productCountId,
			owner: owner,
			model: model,
			kilometers: kilometers,
			built: built,
			wof: wof,
			reg: reg,
			price: price,
			description: description,
			email: email,
			number: number,
			createdAt: new Date()
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
	'click .remove': function() {
		Products.remove(this._id);
	}
});