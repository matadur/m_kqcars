// PRODUCTS (HOME)
Router.route('/', function () {
	this.render('products');
	this.layout('layout_products');
});

// PRODUCTS - DETAIL
Router.route('products_detail/:_id', function () {
	this.render('products_detail', {
		data: function () {
			return Products.findOne({_id: this.params._id});
		}
	});
	this.layout('layout_products');
});




// MY PRODUCTS - ADD
Router.route('my_products_add', function () {
	this.render('my_products_add');
	this.layout('layout_my_products');
});
	// MY PRODUCTS - ADD - RULES
	Router.route('my_products_add_rules', function () {
		this.render('my_products_add_rules');
		this.layout('layout_my_products');
	});

	// MY PRODUCTS - ADD - SUCCESS
	Router.route('my_products_add_success', function () {
		this.render('my_products_add_success');
		this.layout('layout_my_products');
	});

	// MY PRODUCTS - ADD - ERROR
	Router.route('my_products_add_error', function () {
		this.render('my_products_add_error');
		this.layout('layout_my_products');
	});

// MY PRODUCTS - VIEW
Router.route('my_products_view_all', function () {
	this.render('my_products_view_all');
	this.layout('layout_my_products');
});

	// MY PRODUCTS - VIEW - DETAIL
	Router.route('my_products_view_detail', function () {
		this.render('my_products_view_detail');
		this.layout('layout_my_products');
	});

	// MY PRODUCTS - VIEW - EDIT
	Router.route('my_products_view_edit', function () {
		this.render('my_products_view_edit');
		this.layout('layout_my_products');
	});




// ACCOUNT - LOGIN
Router.route('account_login', function () {
	this.render('account_login');
	this.layout('layout_account');
});

// ACCOUNT - SIGNUP
Router.route('account_signup', function () {
	this.render('account_signup');
	this.layout('layout_account');
});
