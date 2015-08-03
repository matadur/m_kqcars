//------------------------------------------------------------------------------------
// PRODUCT - IMAGES
//------------------------------------------------------------------------------------

	// IMAGES - DISPLAY - LISTIMAGE---------------------------------------------------
		Template.product_outputfield_image_list.helpers({
			sideimages: function () {
				var product 		= Products.findOne(this._id);
				var productCountId 	= product.productCountId;

				return Images.find({productCountId: productCountId, imageType: "sideimage"});
			}
		});

	// IMAGES - DISPLAY - SIDEIMAGE---------------------------------------------------
		Template.product_outputfield_image_side.helpers({
			sideimages: function () {
				var product 		= Products.findOne(this._id);
				var productCountId 	= product.productCountId;

				return Images.find({productCountId: productCountId, imageType: "sideimage"});
			}
		});
	
	// IMAGES - DISPLAY - FRONTIMAGE--------------------------------------------------
		Template.product_outputfield_image_front.helpers({
			frontimages: function () {
				var product 		= Products.findOne(this._id);
				var productCountId 	= product.productCountId;

				return Images.find({productCountId: productCountId, imageType: "frontimage"});
			}
		});
	
	// IMAGES - DISPLAY - INFRONTIMAGE------------------------------------------------
		Template.product_outputfield_image_infront.helpers({
			infrontimages: function () {
				var product 		= Products.findOne(this._id);
				var productCountId 	= product.productCountId;

				return Images.find({productCountId: productCountId, imageType: "infrontimage"});
			}
		});
	
	// IMAGES - DISPLAY - INBACKIMAGE-------------------------------------------------
		Template.product_outputfield_image_inback.helpers({
			inbackimages: function () {
				var product 		= Products.findOne(this._id);
				var productCountId 	= product.productCountId;

				return Images.find({productCountId: productCountId, imageType: "inbackimage"});
			}
		});

	// IMAGES - UPLOAD----------------------------------------------------------------
		Template.product_form_add.events({
			// SIDEIMAGE--------------------------------------------------------------
				'change .fileinput--side': function(event, template) {
					var productCountId = Session.get('productCountId');
					var imageTypeCount = Images.find({imageType: "sideimage"}).count();

					// Note: remove previous image before re-upload
					if (imageTypeCount != 0) {
						Meteor.call('removeSideimage', productCountId);
					};

					FS.Utility.eachFile(event, function(file) {
						var tmpdoc 				= new FS.File(file);
						tmpdoc.productCountId 	= productCountId;
						tmpdoc.imageType 		= "sideimage";
						tmpdoc.createdAt		= new Date();
						
						Images.insert(tmpdoc, function (err) {});
					});
				},
			// FRONTIMAGE-------------------------------------------------------------
				'change .fileinput--front': function(event, template) {
					var productCountId = Session.get('productCountId');
					var imageTypeCount = Images.find({imageType: "frontimage"}).count();

					// Note: remove previous image before re-upload
					if (imageTypeCount != 0) {
						Meteor.call('removeFrontimage', productCountId);
					};

					FS.Utility.eachFile(event, function(file) {
						var tmpdoc 				= new FS.File(file);
						tmpdoc.productCountId 	= productCountId;
						tmpdoc.imageType 		= "frontimage";
						tmpdoc.createdAt		= new Date();
						
						Images.insert(tmpdoc, function (err) {});
					});
				},
			// INFRONTIMAGE-----------------------------------------------------------
				'change .fileinput--infront': function(event, template) {
					var productCountId = Session.get('productCountId');
					var imageTypeCount = Images.find({imageType: "infrontimage"}).count();

					// Note: remove previous image before re-upload
					if (imageTypeCount != 0) {
						Meteor.call('removeInfrontimage', productCountId);
					};

					FS.Utility.eachFile(event, function(file) {
						var tmpdoc 				= new FS.File(file);
						tmpdoc.productCountId 	= productCountId;
						tmpdoc.imageType 		= "infrontimage";
						tmpdoc.createdAt		= new Date();
						
						Images.insert(tmpdoc, function (err) {});
					});
				},
			// INBACKIMAGE------------------------------------------------------------
				'change .fileinput--inback': function(event, template) {
					var productCountId = Session.get('productCountId');
					var imageTypeCount = Images.find({imageType: "inbackimage"}).count();

					// Note: remove previous image before re-upload
					if (imageTypeCount != 0) {
						Meteor.call('removeInbackimage', productCountId);
					};

					FS.Utility.eachFile(event, function(file) {
						var tmpdoc 				= new FS.File(file);
						tmpdoc.productCountId 	= productCountId;
						tmpdoc.imageType 		= "inbackimage";
						tmpdoc.createdAt		= new Date();
						
						Images.insert(tmpdoc, function (err) {});
					});
				}
		});

	// IMAGES - EDIT------------------------------------------------------------------
		// IMAGES - EDIT - FUNCTIONS--------------------------------------------------
			insertImage = function(event, imageType, productCountId) {
				FS.Utility.eachFile(event, function(file) {
					var tmpdoc 				= new FS.File(file);
					tmpdoc.productCountId 	= productCountId;
					tmpdoc.imageType 		= imageType;
					tmpdoc.createdAt		= new Date();
					Images.insert(tmpdoc, function (err) {});
				});
			}
		// SIDEIMAGE------------------------------------------------------------------
			Template.product_form_edit.helpers({
				// Request Image Change Helper----------------------------------------
					sideImageUploadRequest: function() {
						var imageTypeCount = Images.find({imageType: "sideimage"}).count();
						var sideImageUploadRequest = Session.get('sideImageUploadRequest');

						if (imageTypeCount == 0 || sideImageUploadRequest != null) {
							return true;
						} else{
							return false;
						};
					}
			});
			Template.product_form_edit.events({
				// Upload new Image---------------------------------------------------
						'change .fileinput--side': function(event, template) {
							var productCountId = Products.findOne(this._id).productCountId;

							insertImage(event, 'sideimage', productCountId);
							Session.set('sideImageUploadRequest', null);
						},
				// Request Image Change Event-----------------------------------------
					'click .removeimage__side': function(event, template) {
						var productCountId = Products.findOne(this._id).productCountId;
						var confirmRemoval = confirm("Delete this image & upload a new one?");

						if (confirmRemoval) {
							Session.set('sideImageUploadRequest', true);
							Meteor.call('removeSideimage', productCountId);
						};
					}
			});
		// FRONTIMAGE-----------------------------------------------------------------
			Template.product_form_edit.helpers({
				// Request Image Change Helper----------------------------------------
					frontImageUploadRequest: function() {
						var imageTypeCount = Images.find({imageType: "frontimage"}).count();
						var frontImageUploadRequest = Session.get('frontImageUploadRequest');

						if (imageTypeCount == 0 || frontImageUploadRequest != null) {
							return true;
						} else{
							return false;
						};
					}
			});
			Template.product_form_edit.events({
				// Upload new Image---------------------------------------------------
						'change .fileinput--front': function(event, template) {
							var productCountId = Products.findOne(this._id).productCountId;

							insertImage(event, 'frontimage', productCountId);
							Session.set('frontImageUploadRequest', null);
						},
				// Request Image Change Event-----------------------------------------
					'click .removeimage__front': function(event, template) {
						var productCountId = Products.findOne(this._id).productCountId;
						var confirmRemoval = confirm("Delete this image & upload a new one?");

						if (confirmRemoval) {
							Session.set('frontImageUploadRequest', true);
							Meteor.call('removeFrontimage', productCountId);
						};
					}
			});
		// INFRONTIMAGE---------------------------------------------------------------
			Template.product_form_edit.helpers({
				// Request Image Change Helper----------------------------------------
					inFrontImageUploadRequest: function() {
						var imageTypeCount = Images.find({imageType: "infrontimage"}).count();
						var inFrontImageUploadRequest = Session.get('inFrontImageUploadRequest');

						if (imageTypeCount == 0 || inFrontImageUploadRequest != null) {
							return true;
						} else{
							return false;
						};
					}
			});
			Template.product_form_edit.events({
				// Upload new Image---------------------------------------------------
						'change .fileinput--infront': function(event, template) {
							var productCountId = Products.findOne(this._id).productCountId;

							insertImage(event, 'infrontimage', productCountId);
							Session.set('inFrontImageUploadRequest', null);
						},
				// Request Image Change Event-----------------------------------------
					'click .removeimage__infront': function(event, template) {
						var productCountId = Products.findOne(this._id).productCountId;
						var confirmRemoval = confirm("Delete this image & upload a new one?");

						if (confirmRemoval) {
							Session.set('inFrontImageUploadRequest', true);
							Meteor.call('removeInfrontimage', productCountId);
						};
					}
			});
		// INBACKIMAGE----------------------------------------------------------------
			Template.product_form_edit.helpers({
				// Request Image Change Helper----------------------------------------
					inBackImageUploadRequest: function() {
						var imageTypeCount = Images.find({imageType: "inbackimage"}).count();
						var inBackImageUploadRequest = Session.get('inBackImageUploadRequest');

						if (imageTypeCount == 0 || inBackImageUploadRequest != null) {
							return true;
						} else{
							return false;
						};
					}
			});
			Template.product_form_edit.events({
				// Upload new Image---------------------------------------------------
						'change .fileinput--inback': function(event, template) {
							var productCountId = Products.findOne(this._id).productCountId;

							insertImage(event, 'inbackimage', productCountId);
							Session.set('inBackImageUploadRequest', null);
						},
				// Request Image Change Event-----------------------------------------
					'click .removeimage__inback': function(event, template) {
						var productCountId = Products.findOne(this._id).productCountId;
						var confirmRemoval = confirm("Delete this image & upload a new one?");

						if (confirmRemoval) {
							Session.set('inBackImageUploadRequest', true);
							Meteor.call('removeInbackimage', productCountId);
						};
					}
			});