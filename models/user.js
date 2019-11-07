const mongoose = require('mongoose');
const { images } = require('../models/images.js');
let Schema = mongoose.Schema;
let userSchema = new Schema({
  login: { type: String, index: true, unique: true, lowercase: true, trim: true },
  name: String,
  email: String,
  password: String,
  images: [{ type: Schema.Types.ObjectId, ref: 'images' }],
  friends: []
});


let User = mongoose.model(process.env.DB_COLLECTION_USERS, userSchema);

module.exports = { User };
