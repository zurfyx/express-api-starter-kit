const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const { isPassword } = require('./validate');
const { hashPassword } = require('./middleware');
const { comparePassword } = require('./methods');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: [{ validator: value => isEmail(value), msg: 'Invalid email.' }],
  },

  password: {
    type: String,
    validate: [{ validator: isPassword, msg: 'Invalid password.' }],
  },
}, { timestamps: true });

/**
 * Middleware
 */
userSchema.pre('save', hashPassword);

/**
 * Methods.
 */
userSchema.methods.comparePassword = comparePassword;

module.exports = mongoose.model('User', userSchema);
