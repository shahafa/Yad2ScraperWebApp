var mongoose = require('mongoose');

// DB
mongoose.connect('mongodb://shahaf:shahaf@troup.mongohq.com:10053/Yad2Scraper');
var adModel = mongoose.model('Yad2ScraperDev', {
	Date : Date,
	Address : String,
	Price : String,
	DaysInBoard : Number,
	URL : String},
	'Yad2ScraperDev');

exports.ads = function(req, res){
    
    adModel.find(function(err, ads) {

		// if there is an error retrieving, send the error. 
		// nothing after res.send(err) will execute
		if (err)
			res.send(err)

		res.json(ads);
	});
};