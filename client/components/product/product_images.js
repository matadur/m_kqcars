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
				// Upload new Image---------------------------------------------------
						'change .fileinput--side': function(event, template) {
							var productCountId = Products.findOne(this._id).productCountId;

							insertImage(event, 'sideimage', productCountId);
							Session.set('sideImageChangeRequest', null);
						},
				// Request Image Change Event-----------------------------------------
					'click .imagechanger__side': function(event, template) {
						var productCountId = Products.findOne(this._id).productCountId;
						var confirmRemoval = confirm("Delete this image & upload a new one?");

						if (confirmRemoval) {
							Session.set('sideImageChangeRequest', true);
							Meteor.call('removeSideimage', productCountId);
						};
					}
			});
		// FRONTIMAGE-----------------------------------------------------------------
			Template.product_form_edit.helpers({
				// Request Image Change Helper----------------------------------------
					frontImageChangeRequest: function() {
						var imageTypeCount = Images.find({imageType: "frontimage"}).count();
						var frontImageChangeRequest = Session.get('frontImageChangeRequest');

						if (imageTypeCount == 0 || frontImageChangeRequest != null) {
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
							Session.set('frontImageChangeRequest', null);
						},
				// Request Image Change Event-----------------------------------------
					'click .imagechanger__front': function(event, template) {
						var productCountId = Products.findOne(this._id).productCountId;
						var confirmRemoval = confirm("Delete this image & upload a new one?");

						if (confirmRemoval) {
							Session.set('frontImageChangeRequest', true);
							Meteor.call('removeFrontimage', productCountId);
						};
					}
			});
		// INFRONTIMAGE---------------------------------------------------------------
			Template.product_form_edit.helpers({
				// Request Image Change Helper----------------------------------------
					inFrontImageChangeRequest: function() {
						var imageTypeCount = Images.find({imageType: "infrontimage"}).count();
						var inFrontImageChangeRequest = Session.get('inFrontImageChangeRequest');

						if (imageTypeCount == 0 || inFrontImageChangeRequest != null) {
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
							Session.set('inFrontImageChangeRequest', null);
						},
				// Request Image Change Event-----------------------------------------
					'click .imagechanger__infront': function(event, template) {
						var productCountId = Products.findOne(this._id).productCountId;
						var confirmRemoval = confirm("Delete this image & upload a new one?");

						if (confirmRemoval) {
							Session.set('inFrontImageChangeRequest', true);
							Meteor.call('removeInfrontimage', productCountId);
						};
					}
			});
		// INBACKIMAGE----------------------------------------------------------------
			Template.product_form_edit.helpers({
				// Request Image Change Helper----------------------------------------
					inBackImageChangeRequest: function() {
						var imageTypeCount = Images.find({imageType: "inbackimage"}).count();
						var inBackImageChangeRequest = Session.get('inBackImageChangeRequest');

						if (imageTypeCount == 0 || inBackImageChangeRequest != null) {
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
							Session.set('inBackImageChangeRequest', null);
						},
				// Request Image Change Event-----------------------------------------
					'click .imagechanger__inback': function(event, template) {
						var productCountId = Products.findOne(this._id).productCountId;
						var confirmRemoval = confirm("Delete this image & upload a new one?");

						if (confirmRemoval) {
							Session.set('inBackImageChangeRequest', true);
							Meteor.call('removeInbackimage', productCountId);
						};
					}
			});