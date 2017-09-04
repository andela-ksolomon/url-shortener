const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({ urlKey: String, url: String });
const urlModel = mongoose.model('url', urlSchema);

module.exports = urlModel;