//------------------------------------------------------------------------------------
// PUBLICATIONS
//------------------------------------------------------------------------------------
	
	Meteor.publish('products', function() {
		return Products.find(); 
	});
	
	Meteor.publish('images', function() {
		return Images.find();     
	});