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
		});

	// IMAGES - EDIT------------------------------------------------------------------
		// SIDEIMAGE--------------------------------------------------------------
			Template.product_form_edit.helpers({
				// Request Image Change Helper--------------------------------------------
					sideImageChangeRequest: function() {
						var sideImageChangeRequest = Session.get('sideImageChangeRequest');

						if (sideImageChangeRequest != null) {
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
						var imageTypeCount = Images.find({imageType: "sideimage"}).count();

						// Note: remove previous image before re-upload
						if (imageTypeCount != 0) {
							var confirmRemoval = confirm("Delete this image & upload a new one?");
							if (confirmRemoval) {
								Session.set('sideImageChangeRequest', true);
								Meteor.call('removeSideimage', productCountId);
							};
						};
					},
				// Upload new Image---------------------------------------------------
						'change .fileinput--side': function(event, template) {
							var sideImageChangeRequest = Session.get('sideImageChangeRequest');

							if (sideImageChangeRequest != null) {
								var currentProduct = Products.findOne(this._id);
								var productCountId = currentProduct.productCountId;

								Session.set('sideImageChangeRequest', null);

								FS.Utility.eachFile(event, function(file) {
									var tmpdoc 				= new FS.File(file);
									tmpdoc.productCountId 	= productCountId;
									tmpdoc.imageType 		= "sideimage";
									tmpdoc.createdAt		= new Date();
									
									Images.insert(tmpdoc, function (err) {});
								});
							};
						}
			});
