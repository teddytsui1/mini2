const mongoose = require('mongoose');

var restaurantSchema = new mongoose.Schema({ 
	_id: mongoose.Schema.ObjectId,
	restaurant_id: {type: Number},
	name: {type: String, required: true},
	borough: {type: String},
	cuisine: {type: String},
	photo: {type: Buffer},
	photo_mimetype: {type: String},
	address: [{
	street:  {type: String},
	building: {type: String},
	zipcode: {type: Number},
	coord: {type: Number},
	}],
	grades: [{
	user: {type: String},
	score: {type: Number},
	}],
	owner: {type: String, required: true}

});

module.exports = restaurantSchema;
mongoose.model('restaurant', restaurantSchema);