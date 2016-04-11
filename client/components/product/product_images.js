//------------------------------------------------------------------------------------
// PRODUCT - IMAGES
//------------------------------------------------------------------------------------
	import * as functions from '/lib/functions.js';


	// LISTIMAGE----------------------------------------------------------------------
		
		// LISTIMAGE - Outputfield
		Template.product_formfield_output_image_list.helpers({
			sideimages: function () {
				return Images.find({productCountId: functions.findProductCountId(this._id), imageType: 'sideimage'});
			}
		});

	// SIDEIMAGE----------------------------------------------------------------------
		
		// SIDEIMAGE - Outputfield
		Template.product_formfield_output_image_side.helpers({
			sideimages: function () {
				return Images.find({productCountId: functions.findProductCountId(this._id), imageType: 'sideimage'});
			}
		});

		// SIDEIMAGE - Formfield - Upload Event
		Template.product_formfield_input_image_side.events({
			'change .fileinput--side': function(event, template) {
				functions.uploadImage(event, 'sideimage', functions.findProductCountId(this._id));
				Session.set('sideImageUploadRequest', null);
			}
		});

		// SIDEIMAGE - Formfield - Display: Image OR Fileinput
		Template.product_formfield_input_image_side.helpers({
			sideImageUploadRequest: function() {
				var sideImageUploadRequest 	= Session.get('sideImageUploadRequest');
				var imageTypeCount 			= Images.find({productCountId: functions.findProductCountId(this._id), imageType: 'sideimage'}).count();

				if (imageTypeCount == 0 || sideImageUploadRequest == true) {
					return true;
				} else {
					return false;
				};
			}
		});

		// SIDEIMAGE - Formfield - Request new Upload
		Template.product_formfield_input_image_side.events({
			'click .removeimage--side': function(event, template) {
				if (confirm("Delete this image & upload a new one?")) {
					Session.set('sideImageUploadRequest', true);
					Meteor.call('removeImage', functions.findProductCountId(this._id), 'sideimage');
				};
			}
		});

	// FRONTIMAGE----------------------------------------------------------------------
		
		// FRONTIMAGE - Outputfield
		Template.product_formfield_output_image_front.helpers({
			frontimages: function () {
				return Images.find({productCountId: functions.findProductCountId(this._id), imageType: 'frontimage'});
			}
		});

		// FRONTIMAGE - Formfield - Upload Event
		Template.product_formfield_input_image_front.events({
			'change .fileinput--front': function(event, template) {
				functions.uploadImage(event, 'frontimage', functions.findProductCountId(this._id));
				Session.set('frontImageUploadRequest', null);
			}
		});

		// FRONTIMAGE - Formfield - Display: Image OR Fileinput
		Template.product_formfield_input_image_front.helpers({
			frontImageUploadRequest: function() {
				var frontImageUploadRequest = Session.get('frontImageUploadRequest');
				var imageTypeCount 			= Images.find({productCountId: functions.findProductCountId(this._id), imageType: 'frontimage'}).count();

				if (imageTypeCount == 0 || frontImageUploadRequest == true) {
					return true;
				} else {
					return false;
				};
			}
		});

		// FRONTIMAGE - Formfield - Request new Upload
		Template.product_formfield_input_image_front.events({
			'click .removeimage--front': function(event, template) {
				if (confirm("Delete this image & upload a new one?")) {
					Session.set('frontImageUploadRequest', true);
					Meteor.call('removeImage', functions.findProductCountId(this._id), 'frontimage');
				};
			}
		});

	// INFRONTIMAGE----------------------------------------------------------------------
		
		// INFRONTIMAGE - Outputfield
		Template.product_formfield_output_image_infront.helpers({
			infrontimages: function () {
				return Images.find({productCountId: functions.findProductCountId(this._id), imageType: 'infrontimage'});
			}
		});

		// INFRONTIMAGE - Formfield - Upload Event
		Template.product_formfield_input_image_infront.events({
			'change .fileinput--infront': function(event, template) {
				functions.uploadImage(event, 'infrontimage', functions.findProductCountId(this._id));
				Session.set('inFrontImageUploadRequest', null);
			}
		});

		// INFRONTIMAGE - Formfield - Display: Image OR Fileinput
		Template.product_formfield_input_image_infront.helpers({
			inFrontImageUploadRequest: function() {
				var inFrontImageUploadRequest 	= Session.get('inFrontImageUploadRequest');
				var imageTypeCount 				= Images.find({productCountId: functions.findProductCountId(this._id), imageType: 'infrontimage'}).count();

				if (imageTypeCount == 0 || inFrontImageUploadRequest == true) {
					return true;
				} else {
					return false;
				};
			}
		});

		// INFRONTIMAGE - Formfield - Request new Upload
		Template.product_formfield_input_image_infront.events({
			'click .removeimage--infront': function(event, template) {
				if (confirm("Delete this image & upload a new one?")) {
					Session.set('inFrontImageUploadRequest', true);
					Meteor.call('removeImage', functions.findProductCountId(this._id), 'infrontimage');
				};
			}
		});

	// INBACKIMAGE----------------------------------------------------------------------
		
		// INBACKIMAGE - Outputfield
		Template.product_formfield_output_image_inback.helpers({
			inbackimages: function () {
				return Images.find({productCountId: functions.findProductCountId(this._id), imageType: 'inbackimage'});
			}
		});

		// INBACKIMAGE - Formfield - Upload Event
		Template.product_formfield_input_image_inback.events({
			'change .fileinput--inback': function(event, template) {
				functions.uploadImage(event, 'inbackimage', functions.findProductCountId(this._id));
				Session.set('inBackImageUploadRequest', null);
			}
		});

		// INBACKIMAGE - Formfield - Display: Image OR Fileinput
		Template.product_formfield_input_image_inback.helpers({
			inBackImageUploadRequest: function() {
				var inBackImageUploadRequest 	= Session.get('inBackImageUploadRequest');
				var imageTypeCount 				= Images.find({productCountId: functions.findProductCountId(this._id), imageType: 'inbackimage'}).count();

				if (imageTypeCount == 0 || inBackImageUploadRequest == true) {
					return true;
				} else {
					return false;
				};
			}
		});

		// INBACKIMAGE - Formfield - Request new Upload
		Template.product_formfield_input_image_inback.events({
			'click .removeimage--inback': function(event, template) {
				if (confirm("Delete this image & upload a new one?")) {
					Session.set('inBackImageUploadRequest', true);
					Meteor.call('removeImage', functions.findProductCountId(this._id), 'inbackimage');
				};
			}
		});
