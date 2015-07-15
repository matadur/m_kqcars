//------------------------------------------------------------------------------------
// ACCOUNT - LOGIN
//------------------------------------------------------------------------------------
Template.account_form_login.events({
	// LOGIN - FACEBOOK---------------------------------------------------------------
	'click .account_login_facebook':function(event){
		Meteor.loginWithFacebook(function(err){
			if(!err) {
				Router.go('/');
			}
		});
		event.preventDefault();
	},
	
	// LOGIN - GOOGLE-----------------------------------------------------------------
	'click .account_login_google':function(event){
		Meteor.loginWithGoogle(function(err){
			if(!err) {
				Router.go('/');
			}
		});
		event.preventDefault();
	},
	
	// LOGIN - EMAIL------------------------------------------------------------------
	'submit .form--account_login': function (event) {
		var email 		= event.target.email.value;
		var password 	= event.target.password.value;
		
		Meteor.loginWithPassword(email,password,function(err){
			if(!err) {
				Router.go('/');
			}
		});
		event.preventDefault();
	}
});