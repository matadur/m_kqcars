Template.productcontrols.events({
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

Template.productcontrols.helpers({
	toggleClass: function() {
		var dropdownCurrentProduct = this._id;
		var dropdownCurrentProductSession = Session.get('dropdownCurrentProductSession');

		if (dropdownCurrentProduct == dropdownCurrentProductSession) {
			return 'dropdown__content--active';
		};
	}
});