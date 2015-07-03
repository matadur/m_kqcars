Products = new Mongo.Collection('products');

// IMAGE UPLOADS
Images = new FS.Collection('images', {
	stores: [new FS.Store.GridFS('images', {path: '~/uploads'})]
});