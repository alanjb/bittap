const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const Server = new Schema({
  name: {
    type: String,
    required: true
  }, 
  id: {
    type: int, 
    required
  },
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  totalUpTime: {
    type: double, 
    required: true
  }, 
  totalPowerUsage: {
    type: double, 
    required: true
  }, 
  isOn: {
    type: Boolean, 
    required: true
  }, 
  { 
    collection: 
    'users' 
  },
);

module.exports = Server = mongoose.model('Server', Server);
