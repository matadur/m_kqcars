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

Template.product_controls.helpers({
	toggleClass: function() {
		var dropdownCurrentProduct = this._id;
		var dropdownCurrentProductSession = Session.get('dropdownCurrentProductSession');

		if (dropdownCurrentProduct == dropdownCurrentProductSession) {
			return 'dropdown__content--active';
		};
	}
});