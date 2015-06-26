// 3. Angebot erstellen
// 3.1 Angebot erstellen - success
// 3.2 Angebot erstellen - error

// 4. Meine Angebote
// 4.1 Meine Angebote - edit


// PRODUCTS (HOME)
Router.route('/', function () {
	this.render('products');
	this.layout('layout_base');
});

// PRODUCTS - DETAIL
Router.route('products_detail', function () {
	this.render('products_detail');
	this.layout('layout_base');
});


// ACCOUNT - LOGIN
Router.route('account_login', function () {
	this.render('account_login');
	this.layout('layout_base');
});

// ACCOUNT - SIGNUP
Router.route('account_signup', function () {
	this.render('account_signup');
	this.layout('layout_base');
});



// MY PRODUCTS - ADD
Router.route('my_products_add', function () {
	this.render('my_products_add');
	this.layout('layout_base');
});

	// VERKAUFEN - SUCCESS PAGE
	Router.route('my_products_add_success', function () {
		this.render('my_products_add_success');
		this.layout('layout_base');
	});

	// VERKAUFEN - ERROR PAGE
	Router.route('my_products_add_error', function () {
		this.render('my_products_add_error');
		this.layout('layout_base');
	});


// MY PRODUCTS - VIEW & EDIT
Router.route('my_products_view', function () {
	this.render('my_products_view');
	this.layout('layout_base');
});

	// MEINE ANGEBOTE - EDIT
	Router.route('my_products_view_edit', function () {
		this.render('my_products_view_edit');
		this.layout('layout_base');
	});
	
