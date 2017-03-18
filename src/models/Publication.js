const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const publicationSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
  },

  content: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Publication', publicationSchema);
