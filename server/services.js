// Service Config - Facebook
ServiceConfiguration.configurations.remove({
	service: 'facebook'
});
ServiceConfiguration.configurations.insert({
	service: 'facebook',
	loginStyle: 'popup',
	appId: '859458887512881',
	secret: '8bb3a31063f67f36145e162dc5107eb2'
});

// Service Config - Google
ServiceConfiguration.configurations.remove({
	service: 'google'
});
ServiceConfiguration.configurations.insert({
	service: 'google',
	loginStyle: 'popup',
	clientId: '231690667578-a07pu6769en2sc2v4usbf6s263b1pnnb.apps.googleusercontent.com',
	secret: 'EQq4EvYf6uoqEfUb20JCaKXZ'
});

// Attach Data (email + image) to User
Accounts.onCreateUser(function(options,user) {
	const facebook = user.services.facebook ? user.services.facebook : false;
	const google = user.services.google ? user.services.google : false;

	if (options.profile) {
	    //Facebook
		if (facebook) {
			options.profile.email = facebook.email
			options.profile.picture = "http://graph.facebook.com/" + facebook.id + "/picture/?type=large";
		//Google
		} else if (google) {
			options.profile.email = google.email
			options.profile.picture = google.picture
		}
	}
	
	user.profile = options.profile;
	return user;
});