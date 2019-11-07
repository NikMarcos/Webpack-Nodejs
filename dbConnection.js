const mongoose = require('mongoose');

module.exports = function(){
  console.log(process.env.DB_URL + process.env.DB_NAME);
    mongoose.connect(process.env.DB_URL + process.env.DB_NAME, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      poolSize: 10
    });

    mongoose.connection.on('connected', function(){
        console.log("Mongoose default connection is open to " + process.env.DB_URL + process.env.DB_NAME);
    });

    mongoose.connection.on('error', function(err){
        console.log("Mongoose default connection has occured " + err + " error");
    });

    mongoose.connection.on('disconnected', function(){
        console.log("Mongoose default connection is disconnected");
    });

    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            console.log("Mongoose default connection is disconnected due to application termination");
            process.exit(0)
        });
    });
}
