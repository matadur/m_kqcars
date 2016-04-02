//------------------------------------------------------------------------------------
// PRODUCT OUTPUTFIELDS
//------------------------------------------------------------------------------------
	
	// PRODUCT OUTPUTFIELDS - WOF (more friendly date)--------------------------------
		Template.product_formfield_output_wof.helpers({
			wof: function() {
				var currentProduct = Products.findOne(this._id);
				var modifiedDate = currentProduct && moment(currentProduct.wof).format('LL');

				return modifiedDate;
			}
		});

	// PRODUCT OUTPUTFIELDS - REG (more friendly date)--------------------------------
		Template.product_formfield_output_reg.helpers({
			reg: function() {
				var currentProduct = Products.findOne(this._id);
				var modifiedDate = currentProduct && moment(currentProduct.reg).format('LL');

				return modifiedDate;
			}
		});

	// PRODUCT OUTPUTFIELDS - WOF & REG INDICATOR LABEL-------------------------------
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

	// PRODUCT OUTPUTFIELDS - DESCRIPTION PARAGRAPH FIX-------------------------------
		Template.product_formfield_output_description.helpers({
			description: function() {
				var currentProduct = Products.findOne(this._id);
				var currentProductDescription = currentProduct.description;

				currentProductDescription = currentProductDescription.replace(/(?:\r\n|\r|\n)/g, '<br />');

				return currentProductDescription;
			}
		});