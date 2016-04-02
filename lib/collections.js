//------------------------------------------------------------------------------------
// PRODUCTS
//------------------------------------------------------------------------------------
	
	// PRODUCTS - COLLECTION----------------------------------------------------------
		Products = new Mongo.Collection('products');

	// PRODUCTS - SCHEMA--------------------------------------------------------------
		Products.attachSchema(new SimpleSchema({
			// Generated
				owner: {
					type: String
				},
				productCountId: {
					type: String
				},
				isSold: {
					type: Boolean
				},
				isHighlight: {
					type: Boolean
				},
				createdAt: {
					type: Date
				},
			// Form values
				model: {
					type: String,
					label: "Model",
					optional: false,
					max: 30
				},
				cartype: {
					type: String,
					label: "Cartype",
					optional: false,
					allowedValues: ['Van', 'Convertible', 'Other', 'Not sure']
				},
				geartype: {
					type: String,
					label: "Gearype",
					optional: false,
					allowedValues: ['Manual', 'Automatic', 'Not sure']
				},
				fueltype: {
					type: String,
					label: "Fueltype",
					optional: false,
					allowedValues: ['Petrol', 'Diesel', 'Other', 'Not sure']
				},
				kilometers: {
					type: Number,
					label: "Kilometers",
					optional: false
				},
				built: {
					type: Number,
					label: "Built",
					optional: false
				},
				wof: {
					type: Date,
					label: "WOF",
					optional: false
				},
				reg: {
					type: Date,
					label: "REG",
					optional: false
				},
				price: {
					type: Number,
					label: "Price",
					optional: false
				},
				description: {
					type: String,
					label: "Description",
					optional: false,
					max: 1000
				},
				email: {
					type: String,
					label: "Email",
					optional: false
				},
				number: {
					type: String,
					label: "Number",
					optional: false
				}
		}));


//------------------------------------------------------------------------------------
// IMAGES
//------------------------------------------------------------------------------------
	
	// IMAGES - THUMBNAILS------------------------------------------------------------
		var createThumb = function(fileObj, readStream, writeStream) {
			// Transform & Crop Image
			gm(readStream, fileObj.name())
				.autoOrient()
				.resize('400', '225', "^")
				.gravity('Center')
				.extent('400', '225')
			.stream().pipe(writeStream);
		};

	// IMAGES - COLLECTION------------------------------------------------------------
		Images = new FS.Collection("images", {
			stores: [
				new FS.Store.GridFS("thumbs", { transformWrite: createThumb }),
				new FS.Store.GridFS("images"),
			],
			filter: {
				allow: {
					contentTypes: ['image/*']
				}
			}
		});


Meteor.users.allow({
	insert: function() { return true },
	update: function() { return true }
});