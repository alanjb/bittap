const mongoose = require('mongoose');
const config = require('config');

//environment variables 
const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB
} = process.env;

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    poolSize: 10,
    bufferMaxEntries: 0 // If not connected, return errors immediately rather than waiting for reconnect
};

//mongo db connection - ***need to add authentication
const MONGO_DB_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

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