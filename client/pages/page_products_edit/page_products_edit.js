Template.page_products_edit.onCreated(function() {
	this.autorun(() => {
		this.subscribe('currentProduct', FlowRouter.getParam('_id'));
	});
});

Template.page_products_edit.helpers({
	currentProductData: function() {
		return Products.findOne({_id: FlowRouter.getParam('_id')});
	}
});