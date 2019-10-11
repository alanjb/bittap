const mongoose = require('mongoose');
const config = require('config');
const db_url = config.get('mongoURI');

// console.log(process.env.DB_CONN);
// console.log(db);

//async function connect to MongoDB database
const connectDB = async () => {
    try {
        await mongoose.connect(db_url, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        //remember to whitelist IPs
        console.log("MongoDB Connected...");
    }
    catch(err) {
        console.error('The error is: ' + err.message);
        //exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;