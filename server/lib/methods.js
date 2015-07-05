//------------------------------------------------------------------------------------
// METHODS - IMAGES
//------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------
// METHODS - PRODUCTS
//------------------------------------------------------------------------------------

	// PRODUCTS - ADD-----------------------------------------------------------------
	Meteor.methods({
		addProduct: function(productCountId, owner, model, kilometers, built, wof, reg, price, description, email, number) {
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
		}
	});

	// PRODUCTS - REMOVE--------------------------------------------------------------
	Meteor.methods({
		removeProduct: function(productCountId){
			Products.remove({productCountId: productCountId});
			Images.remove({productCountId: productCountId});
		}
	});

