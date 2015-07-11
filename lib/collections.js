Products = new Mongo.Collection('products');

// IMAGE UPLOADS
var createThumb = function(fileObj, readStream, writeStream) {
	// Transform into 400x225px (16:9) thumb
	gm(readStream, fileObj.name()).resize('400', '225').stream().pipe(writeStream);
};

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