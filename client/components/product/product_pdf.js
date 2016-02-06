//------------------------------------------------------------------------------------
// PRODUCT PDF
//------------------------------------------------------------------------------------

	Template.products_pdf_instructions.events({
		'click .button--pdf': function() {
			var clickedProductId = Session.get('clickedProductId');
			var clickedProductObject = Products.findOne(clickedProductId);

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

			// ROTATED TEXT - DEFINE FUNCTION: ROTATE TEXT
			writeRotatedText = function(text, text2) {
				var ctx, canvas = document.createElement('canvas');
				// I am using predefined dimensions so either make this part of the arguments or change at will 
				canvas.width = 36;
				canvas.height = 270;
				ctx = canvas.getContext('2d');
				ctx.font = '45px Arial';
				ctx.save();
				ctx.translate(36,270);
				ctx.rotate(-0.5*Math.PI);
				ctx.fillStyle = '#000';
				ctx.fillText(text , 0, 0);
				ctx.fillText(text2 , 0, 0);
				ctx.restore();
				return canvas.toDataURL();
			};
			// ROTATED TEXT - set the fitted width/height to a fraction for mitigating pixelation on print/zoom
			var rotatedContent = [
				[{image: writeRotatedText(email, number), fit:[7,53], alignment: 'left'}]
			];

			// IMAGES - DEFINE FUNCTION: CONVERT IMAGEURL
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
			// IMAGES - get your url from your database (toUrl() from collectionFS) or from your public folder
			// var imageUrl = "http://localhost:3000/logo.png";
			var imageUrl = "http://localhost:3000/cfs/files/images/HNgtsYa4hAmZuANYn/The%20VRoom%20Front.png";
			
			// The docDefinition has to be in the callback so that the image is loaded completely and converted to a datauri
			getDataUri(imageUrl, function(imageDataUri) {			
				// PDF DOCUMENT DEFINITION
				var docDefinition = { 
					pageSize: 'A4',
					pageMargins: [ 35, 125, 35, 40 ],
					background: [{image: imageDataUri,	width: 595}],
					
					header: [
				    	{image: imageDataUri, fit: [125,125], margin: [0, 0, 0, 0]}
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
						},
						// IMAGES
						{ text: 'Images:', style: 'section' },
						// IMAGES - IMAGES
						{
							columns: [
								// Images
								{ width: '25%', image: imageDataUri, fit: [125,125] },
								{ width: '25%', image: imageDataUri, fit: [125,125] },
								{ width: '25%', image: imageDataUri, fit: [125,125] },
								{ width: '25%', image: imageDataUri, fit: [125,125] }
							]
						},
						// CONTACT - ROTATED CONTACT
						rotatedContent
					],

					styles: {
						headline: 	{ fontSize: 25, bold: true, margin: [0, 0, 0, 25] },
						section: 	{ fontSize: 16, bold: true, margin: [0, 25, 0, 10] },
						listItem:	{ fontSize: 10, margin: [0, 0, 0, 10] },
						listLabel: 	{ bold: true },
						listText: 	{ italic: true },
						mainText: 	{ fontSize: 10, lineHeight: 1.5, margin: [0, 0, 0, 10] }
					}
				};
				// PDF GENERATION PROCESS
				pdfMake.createPdf(docDefinition).open();
			});
		}
	});
