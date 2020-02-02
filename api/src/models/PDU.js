const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Server = require('./Server');

const PDU = new Schema({
    name: {
      type: String,
      required: true
    }, 
    id: {
      type: int, 
      required
    },
    sockets: {
      type: double, 
      required: true
    }, 
    isOn: {
      type: Boolean, 
      required: true
    }
  });
  
  module.exports = PDU = mongoose.model('pdus', PDU);