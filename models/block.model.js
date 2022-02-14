
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var blockSchema = new Schema({
  blockTime: { type: Number },
  totalSupply: { type: Number },
  BusID: { type: Number },
  circulatingSupply: { type: Number },
  nonCirculatingSupply: { type: Number },
  epoch: { type: Number },
  transactionCount: { type: Number },
  TransactionsPerSecond: { type: Number },
  fee: { type: Number },
}
);


module.exports = mongoose.model('block', blockSchema);