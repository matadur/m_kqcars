// Setup Cronjobs
SyncedCron.add({
	name: 'Remove old Products & Images (60 Days)',
	schedule: function(parser) {
		// return parser.text('every 5 seconds');
		return parser.text('every 24 hours');
	},
	job: function() {
		var today = new Date();
		var targetDate = new Date();

		// targetDate.setDate(today.getDate() + 1); 	//Older than: Tomorrow
		// targetDate.setDate(today.getDate() - 1); 	//Older than: Yesterday
		// targetDate.setDate(today.getDate() - 0); 	//Older than: Today
		targetDate.setDate(today.getDate() - 60); 		//Older than: 60 Days
		targetDate.setHours(0);
		targetDate.setMinutes(0);
		targetDate.setSeconds(0);

		// Remove matching Products & Images
		var matchingProducts = Products.find({createdAt: {$lt: targetDate}}).fetch();
		var productCountIdArray = matchingProducts.map(function(product) {return product.productCountId;});

		// Remove matching Products
		Products.remove({createdAt: {$lt: targetDate}});
		// Remove matching Images
		Images.remove({createdAt: {$lt: targetDate}});
		// Remove matching Products from user Favorites
		Meteor.users.update({}, {$pullAll: {'profile.favorites': productCountIdArray}}, {multi: true});
	}
});

// Start Cronjobs
SyncedCron.start();