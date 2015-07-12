SyncedCron.add({
	name: 'Remove old Products',
	schedule: function(parser) {
    	return parser.text('every 10 seconds');
	},
	job: function() {
		var today = new Date(); 
		var targetDate= new Date();

		targetDate.setDate(today.getDate() - 90);
		targetDate.setHours(0);
		targetDate.setMinutes(0);
		targetDate.setSeconds(0);

		// Products.find
		console.log(today, 'VERSUS', targetDate);
	}
});

// Start Cronjobs
SyncedCron.start();