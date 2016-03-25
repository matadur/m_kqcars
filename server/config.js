// Facebook
ServiceConfiguration.configurations.remove({
	service: 'facebook'
});
ServiceConfiguration.configurations.insert({
	service: 'facebook',
	loginStyle: 'popup',
	appId: '465403390289619',
	secret: 'ab06e970506723cf471e0f0e27f6d428'
});

// Google
ServiceConfiguration.configurations.remove({
	service: 'google'
});
ServiceConfiguration.configurations.insert({
	service: 'google',
	loginStyle: 'popup',
	clientId: '355899122439-33goe0m8es59u0fnvu15v3k3vmo5oird.apps.googleusercontent.com',
	secret: 'HpUtrKjN7K1TCpWmXhT6w4iE'
});