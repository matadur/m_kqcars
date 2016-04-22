//------------------------------------------------------------------------------------
// PRODUCT FORMFIELDS OUTPUT
//------------------------------------------------------------------------------------
	import * as functions from '/lib/functions.js';

	// PRODUCT FORMFIELDS OUTPUT - WOF (more friendly date)---------------------------
		Template.product_formfield_output_wof.helpers({
			wof: function() {
				var currentProduct = Products.findOne(this._id);
				var modifiedDate = currentProduct && moment(currentProduct.wof).format('LL');

				return modifiedDate;
			}
		});

	// PRODUCT FORMFIELDS OUTPUT - REG (more friendly date)---------------------------
		Template.product_formfield_output_reg.helpers({
			reg: function() {
				var currentProduct = Products.findOne(this._id);
				var modifiedDate = currentProduct && moment(currentProduct.reg).format('LL');

				return modifiedDate;
			}
		});

	// PRODUCT FORMFIELDS OUTPUT - WOF & REG INDICATOR LABEL--------------------------
		Template.product_formfield_output_wof_reg_indicator_label.helpers({
			wofOrRegValid: function() {
				var currentDate = new Date();
				var currentProduct = Products.findOne(this._id);
				var currentProductWof = currentProduct.wof;
				var currentProductReg = currentProduct.reg;

				if (currentDate <= currentProductWof || currentDate <= currentProductReg) {
					return true;
				};
			},
			wofValid: function() {
				var currentDate = new Date();
				var currentProduct = Products.findOne(this._id);
				var currentProductWof = currentProduct.wof;

				if (currentDate <= currentProductWof) {
					return true;
				};
			},
			regValid: function() {
				var currentDate = new Date();
				var currentProduct = Products.findOne(this._id);
				var currentProductReg = currentProduct.reg;

				if (currentDate <= currentProductReg) {
					return true;
				};
			}
		});

	// PRODUCT FORMFIELDS OUTPUT - DESCRIPTION PARAGRAPH FIX--------------------------
		Template.product_formfield_output_description.helpers({
			description: function() {
				var currentProduct = Products.findOne(this._id);
				var currentProductDescription = currentProduct.description;

				currentProductDescription = currentProductDescription.replace(/(?:\r\n|\r|\n)/g, '<br />');

				return currentProductDescription;
			}
		});

	// PRODUCT FORMFIELDS OUTPUT - LISTIMAGE------------------------------------------
		Template.product_formfield_output_image_list.helpers({
			sideimages: function () {
				return Images.find({productCountId: functions.findProductCountId(this._id), imageType: 'sideimage'});
			}
		});

	// PRODUCT FORMFIELDS OUTPUT - SIDEIMAGE------------------------------------------
		Template.product_formfield_output_image_side.helpers({
			sideimages: function () {
				return Images.find({productCountId: functions.findProductCountId(this._id), imageType: 'sideimage'});
			}
		});

	// PRODUCT FORMFIELDS OUTPUT - FRONTIMAGE-----------------------------------------
		Template.product_formfield_output_image_front.helpers({
			frontimages: function () {
				return Images.find({productCountId: functions.findProductCountId(this._id), imageType: 'frontimage'});
			}
		});

	// PRODUCT FORMFIELDS OUTPUT - INFRONTIMAGE---------------------------------------
		Template.product_formfield_output_image_infront.helpers({
			infrontimages: function () {
				return Images.find({productCountId: functions.findProductCountId(this._id), imageType: 'infrontimage'});
			}
		});

	// PRODUCT FORMFIELDS OUTPUT - INBACKIMAGE----------------------------------------
		Template.product_formfield_output_image_inback.helpers({
			inbackimages: function () {
				return Images.find({productCountId: functions.findProductCountId(this._id), imageType: 'inbackimage'});
			}
		});

