//------------------------------------------------------------------------------------
// PRODUCT CONTROLS
//------------------------------------------------------------------------------------

	// PPRODUCT CONTROLS - VISIBILITY-------------------------------------------------
		Template.product_controls.helpers({
			currentUsersProduct: function(){
				var currentUser = Meteor.userId();
				var currentProductOwner = this.owner;

				if (currentUser == currentProductOwner) {
					return true;
				} else {
					return false;
				};
			}
		});

	// PPRODUCT CONTROLS - MARK AS SOLD-----------------------------------------------
		var markedAsSoldHelper = {
			markedAsSold: function() {
				var markedAsSold = this.markedAsSold;

				if (markedAsSold == true) {
					return true;
				} else {
					return false;
				};
			}
		};
		Template.product_controls.helpers(markedAsSoldHelper);

		Template.product_controls.events({
			'click .mark_as_sold': function() {
				Products.update(this._id, {$set: {markedAsSold: !this.markedAsSold}})
			}
		});

	// PPRODUCT CONTROLS - PDF--------------------------------------------------------
		Template.product_controls.events({
			'click .button--pdf': function() {
				var model 		= this.model;
				var cartype 	= this.cartype;
				var geartype 	= this.geartype;
				var fueltype 	= this.fueltype;
				var built 		= this.built;
				var kilometers 	= this.kilometers;
				var wof 		= this.wof;
				var reg 		= this.reg;
				var price 		= this.price;
				var description = this.description;
				var email 		= this.email;
				var number 		= this.number;
				
				// Define the pdf-document
				var docDefinition = { 
					pageSize: 'A4',
					pageMargins: [ 35, 40, 35, 40 ],
					
					content: [
						{ text: model, style: 'headline' },
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
						{
							columns: [
								// Geartype
								{ width: '15%', text: 'Geartype:', style: ['listItem', 'listLabel'] },
								{ width: '35%', text: geartype, style: ['listItem', 'listText'] },
								// Kilometers
								{ width: '15%', text: 'Kilometers:', style: ['listItem', 'listLabel'] },
								{ width: '35%', text: kilometers, style: ['listItem', 'listText'] },
							]
						},
						{
							columns: [
								// Fueltype
								{ width: '15%', text: 'Fueltype:', style: ['listItem', 'listLabel'] },
								{ width: '35%', text: fueltype, style: ['listItem', 'listText'] }
							]
						},
						{ text: 'About the Car:', style: 'section' },
						{ text: description, style: 'mainText' },
						{
							columns: [
								// Askingprice
								{ width: '15%', text: 'Askingprice:', style: ['listItem', 'listLabel'] },
								{ width: '35%', text: price, style: ['listItem', 'listText'] }
							]
						},
						{ text: 'Contact:', style: 'section' },
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
						listItem:	{ fontSize: 12, margin: [0, 0, 0, 10] },
						listLabel: 	{ bold: true },
						listText: 	{ italic: true },
						mainText: 	{ fontSize: 12, margin: [0, 0, 0, 10] }
					}
				};

				// Start the pdf-generation process
				pdfMake.createPdf(docDefinition).open();
			}
		});
