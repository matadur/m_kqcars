//------------------------------------------------------------------------------------
// PRODUCTS
//------------------------------------------------------------------------------------
	
	import * as functions from '/lib/functions.js';

	// PRODUCTS - HOME---------------------------------------------------------------!-
		FlowRouter.route('/', {
			action: function() {
				BlazeLayout.render('layout_products', {
					sidebar: 'sidebar_products',
					page: 'page_products',
				});
			}
		});

	// PRODUCTS - DETAIL--------------------------------------------------------------
		FlowRouter.route('/products_detail/:_id', {
			action: function(params) {
				BlazeLayout.render('layout_products', {
					sidebar: 'sidebar_products',
					page: 'page_products_detail',
				});
			}
		});

	// PRODUCTS - EDIT----------------------------------------------------------------
		FlowRouter.route('/products_detail/:_id/edit', {
			action: function(params) {
				BlazeLayout.render('layout_products', {
					sidebar: 'sidebar_products',
					page: 'page_products_edit',
				});
			}
		});

		// PRODUCTS - EDIT - SUCCESS--------------------------------------------------!-
			FlowRouter.route('/products_edit_success', {
				action: function() {
					BlazeLayout.render('layout_products', {
						sidebar: 'sidebar_products',
						page: 'page_products_edit_success',
					});
				}
			});

	// PRODUCTS - ADD----------------------------------------------------------------!-
		FlowRouter.route('/products_add', {
			triggersEnter: function() {
				functions.generateProductCountIdSession();
			},
			action: function() {
				BlazeLayout.render('layout_products', {
					sidebar: 'sidebar_products',
					page: 'page_products_add',
				});
			},
			triggersExit: function() {
				functions.removeProductCountIdSession();
			}
		});

		// PRODUCTS - ADD - RULES----------------------------------------------------!-
			FlowRouter.route('/products_add_rules', {
				action: function() {
					BlazeLayout.render('layout_products', {
						sidebar: 'sidebar_products',
						page: 'page_products_add_rules',
					});
				}
			});

		// PRODUCTS - ADD - SUCCESS--------------------------------------------------!-
			FlowRouter.route('/products_add_success', {
				action: function() {
					BlazeLayout.render('layout_products', {
						sidebar: 'sidebar_products',
						page: 'page_products_add_success',
					});
				}
			});

		// PRODUCTS - ADD - ERROR----------------------------------------------------!-
			FlowRouter.route('/products_add_error', {
				action: function() {
					BlazeLayout.render('products_add_error', {
						sidebar: 'sidebar_products',
						page: 'page_products_add_error',
					});
				}
			});

	// PRODUCTS - HIGHLIGHT----------------------------------------------------------!-
		FlowRouter.route('/products_highlight', {
			action: function() {
				BlazeLayout.render('layout_products', {
					sidebar: 'sidebar_products',
					page: 'page_products_highlight',
				});
			}
		});

	// PRODUCTS - PDF----------------------------------------------------------------!-
		FlowRouter.route('/products_pdf', {
			action: function() {
				BlazeLayout.render('layout_products', {
					sidebar: 'sidebar_products',
					page: 'page_products_pdf',
				});
			}
		});

//------------------------------------------------------------------------------------
// MY PRODUCTS
//------------------------------------------------------------------------------------

	// MY PRODUCTS - VIEW------------------------------------------------------------!-
		FlowRouter.route('/products_user', {
			action: function() {
				BlazeLayout.render('layout_products', {
					sidebar: 'sidebar_products',
					page: 'page_products_user',
				});
			}
		});


//------------------------------------------------------------------------------------
// FAVORITE PRODUCTS
//------------------------------------------------------------------------------------

	// FAVORITE PRODUCTS - VIEW------------------------------------------------------!-
		FlowRouter.route('/products_favorites', {
			action: function() {
				BlazeLayout.render('layout_products', {
					sidebar: 'sidebar_products',
					page: 'page_products_favorites',
				});
			}
		});


//------------------------------------------------------------------------------------
// ACCOUNTS
//------------------------------------------------------------------------------------

	// ACCOUNTS - SIGNUP--------------------------------------------------------------!-
		FlowRouter.route('/account_signup', {
			action: function() {
				BlazeLayout.render('layout_account', {
					sidebar: 'sidebar_account',
					page: 'page_account_signup',
				});
			}
		});

	// ACCOUNTS - LOGIN---------------------------------------------------------------!-
		FlowRouter.route('/account_login', {
			action: function() {
				BlazeLayout.render('layout_account', {
					sidebar: 'sidebar_account',
					page: 'page_account_login',
				});
			}
		});

	// ACCOUNTS - LOGOUT--------------------------------------------------------------!-
		FlowRouter.route('/account_logout', {
			action: function() {
				BlazeLayout.render('layout_account', {
					sidebar: 'sidebar_products',
					page: 'page_products',
				});
				Meteor.logout(function(err){
					if (!err) {
						sAlert.success('Logout complete! See ya later!');
					}
				});
			}
		});



