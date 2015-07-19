//------------------------------------------------------------------------------------
// PRODUCT - IMAGES
//------------------------------------------------------------------------------------

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
						Meteor.call('removeInfrontimage', productCountId);
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
		// SIDEIMAGE------------------------------------------------------------------
			Template.product_form_edit.helpers({
				// Request Image Change Helper--------------------------------------------
					sideImageChangeRequest: function() {
						var imageTypeCount = Images.find({imageType: "sideimage"}).count();
						var sideImageChangeRequest = Session.get('sideImageChangeRequest');

						if (imageTypeCount == 0 || sideImageChangeRequest != null) {
							return true;
						} else{
							return false;
						};
					}
			});
			Template.product_form_edit.events({
				// Request Image Change Event-----------------------------------------
					'click .imagechanger__side': function(event, template) {
						var currentProduct = Products.findOne(this._id);
						var productCountId = currentProduct.productCountId;
						var confirmRemoval = confirm("Delete this image & upload a new one?");

						if (confirmRemoval) {
							Session.set('sideImageChangeRequest', true);
							Meteor.call('removeSideimage', productCountId);
						};
					},
				// Upload new Image---------------------------------------------------
						'change .fileinput--side': function(event, template) {
							var currentProduct = Products.findOne(this._id);
							var productCountId = currentProduct.productCountId;

							FS.Utility.eachFile(event, function(file) {
								var tmpdoc 				= new FS.File(file);
								tmpdoc.productCountId 	= productCountId;
								tmpdoc.imageType 		= "sideimage";
								tmpdoc.createdAt		= new Date();
								
								Images.insert(tmpdoc, function (err) {});
							});

							Session.set('sideImageChangeRequest', null);
						}
			});
