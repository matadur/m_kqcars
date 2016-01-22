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
