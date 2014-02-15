var mongoose = require('mongoose');

var adModel = mongoose.model('Yad2Scraper', {
	Date : Date,
    LastSeen : Date,
	Address : String,
	Price : String,
	DaysInBoard : Number,
	URL : String,
    IsRelevant : Boolean,
    PriceChanged : Boolean},
	'Yad2Scraper');

var initiateDatabaseConnection = function()
{
    mongoose.connect('mongodb://shahaf:shahaf@troup.mongohq.com:10053/Yad2Scraper');
}

exports.ads = function(req, res){

    if (mongoose.connection.readyState == 0) {
        initiateDatabaseConnection();
    }

    adModel.find(function(err, ads) {
		if (err)
			res.send(err)

		res.json(ads);
	});
};

exports.isRelevant = function(req, res){
    var id = req.params.id;

    if (mongoose.connection.readyState == 0) {
        initiateDatabaseConnection();
    }

    adModel.findById(id, function(err, ad) {
        if (err)
            res.send(err)

        ad.IsRelevant = true;
        ad.save();

    });

    adModel.find(function(err, ads) {
        if (err)
            res.send(err)

        res.json(ads);
    });
};

exports.isNotRelevant = function(req, res){
    var id = req.params.id;

    if (mongoose.connection.readyState == 0) {
        initiateDatabaseConnection();
    }

    adModel.findById(id, function(err, ad) {
        if (err)
            res.send(err)

        ad.IsRelevant = false;
        ad.save();

    });

    adModel.find(function(err, ads) {
        if (err)
            res.send(err)

        res.json(ads);
    });
};