export function findProductCountId(self) {
	var productCountId = Session.get('productCountId');

	if (productCountId == null) {
		productCountId = Products.findOne(self).productCountId;
	};

	return productCountId;
};

export function uploadImage(event, imageType, productCountId) {
	FS.Utility.eachFile(event, function(file) {
		var tmpdoc 				= new FS.File(file);
		tmpdoc.productCountId 	= productCountId;
		tmpdoc.imageType 		= imageType;
		tmpdoc.createdAt		= new Date();
		Images.insert(tmpdoc, function (err) {});
	});
};