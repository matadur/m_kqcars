//------------------------------------------------------------------------------------
// ALERTS
//------------------------------------------------------------------------------------
	
	// ALERTS - CONFIG----------------------------------------------------------------
		Meteor.startup(function () {
			sAlert.config({
				effect: 'genie',
				position: 'bottom-left',
				timeout: 4200,
				html: true,
				onRouteClose: false,
				stack: true,
				offset: 0,
				beep: false,
				onClose: _.noop
			});
		});

		// Alert on Login
		Accounts.onLogin(function() {
			var currentUser = Meteor.user();
			var currentUserName = currentUser.profile.name;

			sAlert.success('Hi ' + currentUserName + '! Nice to see you!');
		});