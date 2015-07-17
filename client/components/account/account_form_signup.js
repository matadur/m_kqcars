//------------------------------------------------------------------------------------
// ACCOUNT - SIGNUP
//------------------------------------------------------------------------------------
Template.account_form_signup.events({
	// SIGNUP - EMAIL-----------------------------------------------------------------
	'submit .form--account_signup': function (event) {
		var email 		= event.target.email.value;
		var firstname 	= event.target.firstname.value;
		var lastname 	= event.target.lastname.value;
		var password 	= event.target.password.value;
		
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