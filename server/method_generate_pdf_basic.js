import webshot from 'webshot';
import fs from 'fs';
import Future from 'fibers/future';

Meteor.methods({
	'method_generate_pdf_basic': function(err, res) {
		var fut = new Future();
		var fileName = "pdf_basic.pdf";

		// Generate HTML String
		var css = Assets.getText('pdf_basic.css');

		SSR.compileTemplate('layout_pdf_basic', Assets.getText('layout_pdf_basic.html'));

		Template.layout_pdf_basic.helpers({
			getDocType: function() {
				return "<!DOCTYPE html>";
			}
		});

		SSR.compileTemplate('page_pdf_basic', Assets.getText('page_pdf_basic.html'));

		// Get Data
		var products = Products.findOne({_id: 'fhAZ65XeEyrbaqbLP'});
		var data = {
			products: products
		}

		var html_string = SSR.render('layout_pdf_basic', {
			css: css,
			template: "page_pdf_basic",
			data: data
		});

		// Setup Webshot Options
		var options = {
			"paperSize": {
				"format": "Letter",
				"orientation": "portrait",
				"margin": "0cm"
			},
			siteType: 'html'
		};

		// Commence Webshot
		console.log("Commencing webshot...");
		webshot(html_string, fileName, options, function(err) {
			fs.readFile(fileName, function (err, data) {
				if (err) {return console.log(err);}
				fs.unlinkSync(fileName);
				fut.return(data);
			});
		});
		
		// Return PDF String
		let pdfData = fut.wait();
		let base64String = new Buffer(pdfData).toString('base64');
		return base64String;
	}
});