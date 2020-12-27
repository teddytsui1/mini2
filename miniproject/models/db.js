const mongoose = require('mongoose');

mongoose.connect('mongodb://teddytsui:test123@cluster0-shard-00-00.pmckb.mongodb.net:27017,cluster0-shard-00-01.pmckb.mongodb.net:27017,cluster0-shard-00-02.pmckb.mongodb.net:27017/test?ssl=true&replicaSet=atlas-c9r8kd-shard-0&authSource=admin&retryWrites=true&w=majority',
{useMongoClient: true,}
);

require('./restaurant.model');