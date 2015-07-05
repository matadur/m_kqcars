if (Meteor.isClient) {

	// SUBSCRIPTIONS
	Meteor.subscribe('products');
	Meteor.subscribe('images');

	

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
