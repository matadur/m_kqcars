//------------------------------------------------------------------------------------
// ALERTS
//------------------------------------------------------------------------------------
	
	// ALERTS - CONFIG----------------------------------------------------------------
		Meteor.startup(function () {
			sAlert.config({
				effect: 'genie',
				position: 'bottom-right',
				timeout: 4200,
				html: false,
				onRouteClose: false,
				stack: true,
				offset: 0,
				beep: false,
				onClose: _.noop
			});
		});