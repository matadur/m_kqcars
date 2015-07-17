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
				markedAsSold: {
					type: Boolean
				},
				createdAt: {
					type: Date
				},
			// Form values
				model: {
					type: String,
					label: "Model",
					optional: false
				},
				cartype: {
					type: String,
					label: "Cartype",
					optional: false
				},
				geartype: {
					type: String,
					label: "Gearype",
					optional: false
				},
				fueltype: {
					type: String,
					label: "Fueltype",
					optional: false
				},
				kilometers: {
					type: String,
					label: "Kilometers",
					optional: false
				},
				built: {
					type: String,
					label: "Built",
					optional: false
				},
				wof: {
					type: String,
					label: "WOF",
					optional: false
				},
				reg: {
					type: String,
					label: "REG",
					optional: false
				},
				price: {
					type: String,
					label: "Price",
					optional: false
				},
				description: {
					type: String,
					label: "Description",
					optional: false
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
			// Transform into 400x225px (16:9) thumb
			gm(readStream, fileObj.name()).resize('400', '225').stream().pipe(writeStream);
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