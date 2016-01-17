//------------------------------------------------------------------------------------
// PRODUCT OUTPUTFIELDS
//------------------------------------------------------------------------------------
	
	// PRODUCT OUTPUTFIELDS - WOF (more friendly date)--------------------------------
		Template.product_outputfield_wof.helpers({
			wof: function() {
				var fullDate = Products.findOne(this._id);
				var modifiedDate = fullDate && moment(fullDate.wof).format('LL');

				return modifiedDate;
			}
		});

	// PRODUCT OUTPUTFIELDS - REG (more friendly date)--------------------------------
		Template.product_outputfield_reg.helpers({
			reg: function() {
				var fullDate = Products.findOne(this._id);
				var modifiedDate = fullDate && moment(fullDate.reg).format('LL');

				return modifiedDate;
			}
		});
