//------------------------------------------------------------------------------------
// PRODUCT CONTROLS
//------------------------------------------------------------------------------------

	// PPRODUCT CONTROLS - VISIBILITY-------------------------------------------------
		Template.product_controls.helpers({
			currentUsersProduct: function(){
				var currentUser = Meteor.userId();
				var currentProductOwner = this.owner;

				if (currentUser == currentProductOwner) {
					return true;
				} else {
					return false;
				};
			}
		});

	// PPRODUCT CONTROLS - MARK AS SOLD-----------------------------------------------
		var markedAsSoldHelper = {
			markedAsSold: function() {
				var markedAsSold = this.markedAsSold;

				if (markedAsSold == true) {
					return true;
				} else {
					return false;
				};
			}
		};
		Template.product_controls.helpers(markedAsSoldHelper);

		Template.product_controls.events({
			'click .mark_as_sold': function() {
				Products.update(this._id, {$set: {markedAsSold: !this.markedAsSold}})
			}
		});

	// PPRODUCT CONTROLS - DROPDOWN----------------------------------------------------
		Template.product_controls.helpers({
			toggleClass: function() {
				var dropdownCurrentProduct = this._id;
				var dropdownCurrentProductSession = Session.get('dropdownCurrentProductSession');

				if (dropdownCurrentProduct == dropdownCurrentProductSession) {
					return 'dropdown__content--active';
				};
			}
		});
		
		Template.product_controls.events({
			'click .dropdown': function() {
				var dropdownCurrentProduct = this._id;
				var dropdownCurrentProductSession = Session.get('dropdownCurrentProductSession');

				if (dropdownCurrentProductSession == null) {
					Session.set('dropdownCurrentProductSession', dropdownCurrentProduct);
				} else{
					Session.set('dropdownCurrentProductSession', null);
				};
			}
		});
