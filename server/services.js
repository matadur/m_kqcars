// Facebook
ServiceConfiguration.configurations.remove({
	service: 'facebook'
});
ServiceConfiguration.configurations.insert({
	service: 'facebook',
	loginStyle: 'popup',
	appId: '859458887512881',
	secret: '8bb3a31063f67f36145e162dc5107eb2'
});

// Google
ServiceConfiguration.configurations.remove({
	service: 'google'
});
ServiceConfiguration.configurations.insert({
	service: 'google',
	loginStyle: 'popup',
	clientId: '231690667578-a07pu6769en2sc2v4usbf6s263b1pnnb.apps.googleusercontent.com',
	secret: 'EQq4EvYf6uoqEfUb20JCaKXZ'
});