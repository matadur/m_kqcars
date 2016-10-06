//------------------------------------------------------------------------------------
// PRODUCT FORMFIELDS INPUT
//------------------------------------------------------------------------------------
	import * as functions from '/lib/functions.js';

	// PRODUCT FORMFIELDS INPUT - LISTIMAGE-------------------------------------------
		
		// No input neccessary because SIDEIMAGE is used 

	// PRODUCT FORMFIELDS INPUT - SIDEIMAGE-------------------------------------------

		// SIDEIMAGE - Upload Event
		Template.product_formfield_input_image_side.events({
			'change .fileinput--side': function(event, template) {
				functions.uploadImage(event, 'sideimage', functions.findProductCountId(this._id));
				Session.set('sideImageUploadRequest', null);
			}
		});

		// SIDEIMAGE - Display: Image OR Fileinput
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

		// SIDEIMAGE - Request new Upload
		Template.product_formfield_input_image_side.events({
			'click .removeimage--side': function(event, template) {
				if (confirm("Delete this image & upload a new one?")) {
					Session.set('sideImageUploadRequest', true);
					Meteor.call('removeImage', functions.findProductCountId(this._id), 'sideimage');
				};
			}
		});

	// PRODUCT FORMFIELDS INPUT - FRONTIMAGE------------------------------------------

		// FRONTIMAGE - Upload Event
		Template.product_formfield_input_image_front.events({
			'change .fileinput--front': function(event, template) {
				functions.uploadImage(event, 'frontimage', functions.findProductCountId(this._id));
				Session.set('frontImageUploadRequest', null);
			}
		});

		// FRONTIMAGE - Display: Image OR Fileinput
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

		// FRONTIMAGE - Request new Upload
		Template.product_formfield_input_image_front.events({
			'click .removeimage--front': function(event, template) {
				if (confirm("Delete this image & upload a new one?")) {
					Session.set('frontImageUploadRequest', true);
					Meteor.call('removeImage', functions.findProductCountId(this._id), 'frontimage');
				};
			}
		});

	// PRODUCT FORMFIELDS INPUT - INFRONTIMAGE----------------------------------------

		// INFRONTIMAGE - Upload Event
		Template.product_formfield_input_image_infront.events({
			'change .fileinput--infront': function(event, template) {
				functions.uploadImage(event, 'infrontimage', functions.findProductCountId(this._id));
				Session.set('inFrontImageUploadRequest', null);
			}
		});

		// INFRONTIMAGE - Display: Image OR Fileinput
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

		// INFRONTIMAGE - Request new Upload
		Template.product_formfield_input_image_infront.events({
			'click .removeimage--infront': function(event, template) {
				if (confirm("Delete this image & upload a new one?")) {
					Session.set('inFrontImageUploadRequest', true);
					Meteor.call('removeImage', functions.findProductCountId(this._id), 'infrontimage');
				};
			}
		});

	// PRODUCT FORMFIELDS INPUT - INBACKIMAGE-----------------------------------------

		// INBACKIMAGE - Upload Event
		Template.product_formfield_input_image_inback.events({
			'change .fileinput--inback': function(event, template) {
				functions.uploadImage(event, 'inbackimage', functions.findProductCountId(this._id));
				Session.set('inBackImageUploadRequest', null);
			}
		});

		// INBACKIMAGE - Display: Image OR Fileinput
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

		// INBACKIMAGE - Request new Upload
		Template.product_formfield_input_image_inback.events({
			'click .removeimage--inback': function(event, template) {
				if (confirm("Delete this image & upload a new one?")) {
					Session.set('inBackImageUploadRequest', true);
					Meteor.call('removeImage', functions.findProductCountId(this._id), 'inbackimage');
				};
			}
		});

	// PRODUCT FORMFIELDS SUBMIT - IMAGE VALIDATUION----------------------------------
		
		// FORM: ADD
		Template.product_form_add.helpers({
			imagesNotUploaded: function() {
				let a = Session.get('sideImageUploadRequest');
				let b = Session.get('frontImageUploadRequest');
				let c = Session.get('inFrontImageUploadRequest');
				let d = Session.get('inBackImageUploadRequest');

				if (a !== null || b !== null ||	c !== null || d !== null) {
					return true;
				};
			}
		});
		// FORM: EDIT
		Template.product_form_edit.helpers({
			imagesNotUploaded: function() {
				let a = Session.get('sideImageUploadRequest');
				let b = Session.get('frontImageUploadRequest');
				let c = Session.get('inFrontImageUploadRequest');
				let d = Session.get('inBackImageUploadRequest');

				if (a !== null || b !== null ||	c !== null || d !== null) {
					return true;
				};
			}
		});

//------------------------------------------------------------------------------------
// PRODUCT FORMFIELDS INPUT - POPUPS
//------------------------------------------------------------------------------------
	Template.product_formfield_input_model.onRendered(function () {
		$('.has-tooltip').popup({
			hoverable: true,
			position : 'bottom left',
			delay: {
				show: 190,
				hide: 0
			}
		});
	});