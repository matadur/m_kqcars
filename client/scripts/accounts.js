// DROPDOWN
Template.component_mnav.events({
	'click .dropdown': function() {
		$('.dropdown').toggleClass('dropdown--active');
	}
});

// SIGNUP
Template.account_signup.events({
	'submit .account_signup': function (event) {
		var email = event.target.email.value;
		var firstname = event.target.firstname.value;
		var lastname = event.target.lastname.value;
		var password = event.target.password.value;
		
		var user = {
			'email': email, 
			password: password, 
			profile: {name:firstname +" "+lastname}
		};
		
		Accounts.createUser(user,function(err){
			if(!err) {
				Router.go('/');
			}
		});

		event.preventDefault();
	}
});

// LOGIN
Template.account_login.events({
	// EMAIL
	'submit .account_login': function (event) {
		var email = event.target.email.value;
		var password = event.target.password.value;
		
		Meteor.loginWithPassword(email,password,function(err){
			if(!err) {
				Router.go('/');
			}
		});
		
		event.preventDefault();
	},
	// FACEBOOK
	'click .account_login_facebook':function(event){
		Meteor.loginWithFacebook(function(err){
			if(!err) {
				Router.go('/');
			}
		});

		event.preventDefault();
	}
});

// LOGOUT
Template.component_mnav.events({
	'click .logout': function () {
		Meteor.logout(function(err){
			if(!err) {
				Router.go('/');
			}
		});
	}
});