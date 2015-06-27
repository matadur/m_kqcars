// DROPDOWN
Template.mnav.events({
	'click .mnav__dropdown': function() {
		$('.mnav__dropdown').toggleClass('mnav__dropdown--active');
	}
});