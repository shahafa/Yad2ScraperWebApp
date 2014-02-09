var mongoose = require('mongoose');

var adModel = mongoose.model('Yad2ScraperDev', {
	Date : Date,
	Address : String,
	Price : String,
	DaysInBoard : Number,
	URL : String},
	'Yad2ScraperDev');

exports.ads = function(req, res){
	mongoose.connect('mongodb://shahaf:shahaf@troup.mongohq.com:10053/Yad2Scraper');
	
    adModel.find(function(err, ads) {
		if (err)
			res.send(err)

		mongoose.disconnect();
		res.json(ads);
	});
};