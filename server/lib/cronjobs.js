SyncedCron.add({
	name: 'Remove old Products & Images (60 Days)',
	schedule: function(parser) {
    	return parser.text('every 8 hours');
	},
	job: function() {
		var today = new Date();
		var targetDate = new Date();

		// targetDate.setDate(today.getDate() + 1); 	//Older than: Tomorrow
		// targetDate.setDate(today.getDate() - 1); 	//Older than: Yesterday
		// targetDate.setDate(today.getDate() - 0); 		//Older than: Today
		targetDate.setDate(today.getDate() - 60); 	//Older than: 60 Days
		targetDate.setHours(0);
		targetDate.setMinutes(0);
		targetDate.setSeconds(0);

		// Remove matchng Documents
		Products.remove({createdAt: {$lt: targetDate}});
		Images.remove({createdAt: {$lt: targetDate}});

		//Logging
		// var matchedProducts = Products.find({createdAt: {$lt: targetDate}}).count();
		// console.log('---matchedProducts:', matchedProducts, '---targetDate:', targetDate);
	}
});

// Start Cronjobs
SyncedCron.start();