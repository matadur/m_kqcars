//------------------------------------------------------------------------------------
// PRODUCT CONTROLS
//------------------------------------------------------------------------------------

	// PPRODUCT CONTROLS - VISIBILITY-------------------------------------------------
		Template.product_controls.helpers({
			currentUsersProduct: function(){
				var currentUser = Meteor.userId();

				if (currentUser == this.owner) {
					return true;
				};
				return false;
			}
		});

	// PPRODUCT CONTROLS - DROPDOWN---------------------------------------------------
		Template.product_controls.onRendered(function () {
			$('.ui.dropdown').dropdown();
		});
