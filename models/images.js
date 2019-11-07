const mongoose = require('mongoose');
const { user } = require('../models/user.js');
let Schema = mongoose.Schema;
let imagesSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'userModel' },
  file: String,
  isAvatar: {type: Boolean, default: false}
});

let images = mongoose.model(process.env.DB_COLLECTION_IMAGES, imagesSchema);

module.exports = { images };
