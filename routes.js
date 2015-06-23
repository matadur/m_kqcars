// HOME
Router.route('/', function () {
	this.render('page_home');
	this.layout('layout_base');
});

// PREISE
Router.route('pricing', function () {
	this.render('page_pricing');
	this.layout('layout_base');
});

// KARTE
Router.route('map', function () {
	this.render('page_map');
	this.layout('layout_base');
});

// VERKAUFEN
Router.route('sell', function () {
	this.render('page_sell');
	this.layout('layout_base');
});
