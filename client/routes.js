//------------------------------------------------------------------------------------
// PRODUCTS
//------------------------------------------------------------------------------------
	// ROUTER CONFIG------------------------------------------------------------------
		Router.configure({
			progressSpinner: false
		});


	// PRODUCTS - HOME----------------------------------------------------------------
		Router.route('/', function () {
			this.render('products');
			this.layout('layout_products');
		});

	// PRODUCTS - DETAIL--------------------------------------------------------------
		Router.route('/products_detail/:_id/:model', {
			loadingTemplate: 'layout_loading',

			waitOn: function() {
				return Meteor.subscribe('images');
			},
			action: function () {
				this.render('products_detail', {
					data: function () {
						return Products.findOne({_id: this.params._id});
					}
				});
				this.layout('layout_products');
			}
		});

	// PRODUCTS - EDIT----------------------------------------------------------------
		Router.route('/products_detail/:_id/:model/edit', {
			loadingTemplate: 'layout_loading',

			waitOn: function() {
				return Meteor.subscribe('images');
			},
			action: function () {
				this.render('products_edit', {
					data: function () {
						return Products.findOne({_id: this.params._id});
					}
				});
				this.layout('layout_products');
			}
		});

		// PRODUCTS - EDIT - SUCCESS---------------------------------------------------
			Router.route('/products_edit_success', function () {
				this.render('products_edit_success');
				this.layout('layout_products');
			});

	// PRODUCTS - ADD-----------------------------------------------------------------
		Router.route('/products_add', function () {
			this.render('products_add');
			this.layout('layout_products');
		});

		// PRODUCTS - ADD - RULES-----------------------------------------------------
			Router.route('/products_add_rules', function () {
				this.render('products_add_rules');
				this.layout('layout_products');
			});

		// PRODUCTS - ADD - SUCCESS---------------------------------------------------
			Router.route('/products_add_success', function () {
				this.render('products_add_success');
				this.layout('layout_products');
			});

		// PRODUCTS - ADD - ERROR-----------------------------------------------------
			Router.route('/products_add_error', function () {
				this.render('products_add_error');
				this.layout('layout_products');
			});

	// PRODUCTS - HIGHLIGHT-----------------------------------------------------------
		Router.route('/products_highlight', function () {
			this.render('products_highlight');
			this.layout('layout_products');
		});

	// PRODUCTS - PDF-----------------------------------------------------------------
		Router.route('/products_pdf', function () {
			this.render('products_pdf');
			this.layout('layout_products');
		});

//------------------------------------------------------------------------------------
// MY PRODUCTS
//------------------------------------------------------------------------------------

	// MY PRODUCTS - VIEW-------------------------------------------------------------
		Router.route('/my_products', function () {
			this.render('my_products');
			this.layout('layout_products');
		});


//------------------------------------------------------------------------------------
// FAVORITE PRODUCTS
//------------------------------------------------------------------------------------

	// FAVORITE PRODUCTS - VIEW-------------------------------------------------------
		Router.route('/favorite_products', function () {
			this.render('favorite_products');
			this.layout('layout_products');
		});


//------------------------------------------------------------------------------------
// ACCOUNTS
//------------------------------------------------------------------------------------

	// ACCOUNTS - SIGNUP---------------------------------------------------------------
		Router.route('/account_signup', function () {
			this.render('account_signup');
			this.layout('layout_account');
		});

	// ACCOUNTS - LOGIN----------------------------------------------------------------
		Router.route('/account_login', function () {
			this.render('account_login');
			this.layout('layout_account');
		});

	// ACCOUNTS - LOGOUT---------------------------------------------------------------
		Router.route('/account_logout', function () {
			this.render('products');
			this.layout('layout_products');

			Meteor.logout(function(err){
				if (!err) {
					sAlert.success('Logout complete! See ya later!');
				}
			});
		});



