const mongoose = require('mongoose');
const config = require('config');

const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB
} = process.env;

const options = {
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500, 
    connectTimeoutMS: 10000,
    useCreateIndex: true,
    useFindAndModify: false
};

const MONGO_DB_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

//async function connect to MongoDB database
const connectDB = async () => {
    try {
        await mongoose.connect(
            MONGO_DB_URL, 
            options
        );
        //remember to whitelist IPs
        console.log("MongoDB connected...");
    }
    catch(err) {
        console.error('The error is: ' + err.message);
        //exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;