if (Meteor.isClient) {

	// SUBSCRIPTIONS
	Meteor.subscribe('products');
	Meteor.subscribe('images');

	// IMAGES - UPLOAD
	Template.form_products_add.events({
		'change .fileinput': function(event, template) {
			// Grab Project ID here with variables
			FS.Utility.eachFile(event, function(file) {
				// Construct FS.File document
				var tmpdoc = new FS.File(file);
				tmpdoc.productId = "1234";
				tmpdoc.otherInfo = "sideview";
				// Insert constructed document
				Images.insert(tmpdoc, function (err) {
					
				});
			});
		}
	});

	// IMAGES - DISPLAY
	Template.productfield_image_side.helpers({
		images: function () {
			return Images.find({otherInfo: "sideview"});
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
	Meteor.publish('images', function() {
		return Images.find();     
	});
}
