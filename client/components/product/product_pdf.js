//------------------------------------------------------------------------------------
// PRODUCT PDF
//------------------------------------------------------------------------------------

	Template.products_pdf_instructions.events({
		'click .button--pdf': function() {
			var clickedProductId = Session.get('clickedProductId');
			var clickedProductObject = Products.findOne(clickedProductId);
			var clickedProductCountId = Products.findOne(clickedProductId).productCountId;

			var model 		= clickedProductObject.model.toString();
			var cartype 	= clickedProductObject.cartype.toString();
			var geartype 	= clickedProductObject.geartype.toString();
			var fueltype 	= clickedProductObject.fueltype.toString();
			var built 		= clickedProductObject.built.toString();
			var kilometers 	= clickedProductObject.kilometers.toString();
			var wof 		= clickedProductObject.wof.toString();
			var reg 		= clickedProductObject.reg.toString();
			var price 		= clickedProductObject.price.toString();
			var description = clickedProductObject.description.toString();
			var email 		= clickedProductObject.email.toString();
			var number 		= clickedProductObject.number.toString();
			
			// IMAGES - Get Product Image Urls
			var logoimage		= "http://localhost:3000/logo.png";
			var backgroundimage = "http://localhost:3000/pdf-bg.png";
			var sideimage 		= Images.findOne({$and: [{productCountId: clickedProductCountId}, {imageType: "sideimage"}]}).url();
			var frontimage 		= Images.findOne({$and: [{productCountId: clickedProductCountId}, {imageType: "frontimage"}]}).url();
			var infrontimage	= Images.findOne({$and: [{productCountId: clickedProductCountId}, {imageType: "infrontimage"}]}).url();
			var inbackimage 	= Images.findOne({$and: [{productCountId: clickedProductCountId}, {imageType: "inbackimage"}]}).url();

			console.log(logoimage);
			console.log(backgroundimage);

			// IMAGES - Convert Image url to Data Uri
			getDataUri = function (url, callback) {
				var image = new Image();
				image.onload = function () {
					var canvas = document.createElement('canvas');
					canvas.width = this.naturalWidth;
					canvas.height = this.naturalHeight;
					canvas.getContext('2d').drawImage(this, 0, 0);
					callback(canvas.toDataURL());
				};
				image.src = url;
			};

			// DATA URI WRAPPER (doc definition has to be in the callback so that image is loaded completely $ converted to datauri)
			getDataUri(logoimage, function(logoimageDataUri) {
			getDataUri(backgroundimage, function(backgroundimageDataUri) {
			getDataUri(sideimage, function(sideimageDataUri) {
			getDataUri(frontimage, function(frontimageDataUri) {
			getDataUri(infrontimage, function(infrontimageDataUri) {
			getDataUri(inbackimage, function(inbackimageDataUri) {
				// PDF DOCUMENT DEFINITION
				var docDefinition = { 
					pageSize: 'A4',
					pageMargins: [ 35, 125, 35, 140 ],
					background: [{image: backgroundimageDataUri, width: 595}],
					
					// header: [
					// 	{image: logoimageDataUri, fit: [125,125], margin: [35, 0, 35, 0]}
					// ],
					footer: [
						// IMAGES
						{ text: 'Images:', style: 'section', margin: [35, 0, 35, 10] },
						// IMAGES - IMAGES
						{
							columns: [
								{ width: '25%', image: sideimageDataUri, fit: [125,125] },
								{ width: '25%', image: frontimageDataUri, fit: [125,125] },
								{ width: '25%', image: infrontimageDataUri, fit: [125,125] },
								{ width: '25%', image: inbackimageDataUri, fit: [125,125] }
							],
							margin: [35, 0, 35, 0]
						}
					],

					content: [
						// MODEL
						{ text: model, style: 'headline' },
						// MODEL - CARTYPE & DATE BUILT
						{
							columns: [
								// Cartype
								{ width: '15%', text: 'Cartype:', style: ['listItem', 'listLabel'] },
								{ width: '35%', text: cartype, style: ['listItem', 'listText'] },
								// Date built
								{ width: '15%', text: 'Date built:', style: ['listItem', 'listLabel'] },
								{ width: '35%', text: built, style: ['listItem', 'listText'] },
							]
						},
						// MODEL - GEARTYPE & KILOMETERS
						{
							columns: [
								// Geartype
								{ width: '15%', text: 'Geartype:', style: ['listItem', 'listLabel'] },
								{ width: '35%', text: geartype, style: ['listItem', 'listText'] },
								// Fueltype
								{ width: '15%', text: 'Fueltype:', style: ['listItem', 'listLabel'] },
								{ width: '35%', text: fueltype, style: ['listItem', 'listText'] }
							]
						},
						// MODEL - KILOMETERS
						{
							columns: [
								// Kilometers
								{ width: '15%', text: 'Kilometers:', style: ['listItem', 'listLabel'] },
								{ width: '35%', text: kilometers, style: ['listItem', 'listText'] },
							]
						},
						// ABOUT
						{ text: 'About the Car:', style: 'section' },
						// ABOUT - DESCRIPTION
						{ text: description, style: 'mainText' },
						// ABOUT - PRICE
						{
							columns: [
								// Askingprice
								{ width: '15%', text: 'Askingprice:', style: ['listItem', 'listLabel'] },
								{ width: '35%', text: '$' + price + ' NZD', style: ['listItem', 'listText'] }
							]
						},
						// CONTACT
						{ text: 'Contact:', style: 'section' },
						// CONTACT - EMAIL & NUMBER
						{
							columns: [
								// Email
								{ width: '15%', text: 'Emailadress:', style: ['listItem', 'listLabel'] },
								{ width: '35%', text: email, style: ['listItem', 'listText'] },
								// Number
								{ width: '15%', text: 'Number:', style: ['listItem', 'listLabel'] },
								{ width: '35%', text: number, style: ['listItem', 'listText'] }
							]
						}
					],

					styles: {
						headline: 	{ fontSize: 25, bold: true, margin: [0, 0, 0, 25] },
						section: 	{ fontSize: 16, bold: true, margin: [0, 25, 0, 10] },
						listItem:	{ fontSize: 10, margin: [0, 0, 0, 10] },
						listLabel: 	{ bold: true },
						listText: 	{ italic: true },
						mainText: 	{ fontSize: 10, lineHeight: 1.5, margin: [0, 0, 0, 10] },
						footerText:	{ fontSize: 10, lineHeight: 1.5, margin: [35, 0, 35, 0] }
					}
				};
				// PDF GENERATION PROCESS
				pdfMake.createPdf(docDefinition).open();
			});
			});
			});
			});
			});
			});
		}
	});
