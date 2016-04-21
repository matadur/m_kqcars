// GENERATE PRODUCT-COUNT-ID-------------------------------------
	export function generateProductCountIdSession() {
		var currentUser 	= Meteor.userId();
		var productCount 	= Products.find({owner: currentUser}).count() + 1;
		var productId 		= Math.floor(Math.random() * 123456789) + 1;
		var productCountId 	= "ProductNo_" + productCount + "_ProductId_" + productId;

		Session.set('productCountId', productCountId);
	};

// REMOVE PRODUCT-COUNT-ID---------------------------------------
	export function removeProductCountIdSession() {
		Session.set('productCountId', null);
	};
	
// FIND PRODUCT-COUNT-ID-----------------------------------------
	export function findProductCountId(self) {
		var productCountId = Session.get('productCountId');

		if (productCountId == null) {
			productCountId = Products.findOne(self).productCountId;
		};

		return productCountId;
	};

// UPLOAD-IMAGE--------------------------------------------------
	export function uploadImage(event, imageType, productCountId) {
		FS.Utility.eachFile(event, function(file) {
			var tmpdoc 				= new FS.File(file);
			tmpdoc.productCountId 	= productCountId;
			tmpdoc.imageType 		= imageType;
			tmpdoc.createdAt		= new Date();
			Images.insert(tmpdoc, function (err) {});
		});
	};


