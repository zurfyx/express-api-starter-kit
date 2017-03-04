import mongoose, { Schema } from 'mongoose';

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

const Publication = mongoose.model('Publication', publicationSchema);

export default Publication;
