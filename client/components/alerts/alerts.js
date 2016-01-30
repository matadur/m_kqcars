//------------------------------------------------------------------------------------
// ALERTS
//------------------------------------------------------------------------------------
	
	// ALERTS - CONFIG----------------------------------------------------------------
		Meteor.startup(function () {
			sAlert.config({
				effect: 'genie',
				position: 'bottom-right',
				timeout: 3900,
				html: false,
				onRouteClose: true,
				stack: true,
				offset: 0,
				beep: false,
				onClose: _.noop
			});
		});