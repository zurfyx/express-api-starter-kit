import mongoose, { Schema } from 'mongoose';
import isEmail from 'validator/lib/isEmail';

import { isPassword } from './validate';
import { hashPassword } from './middleware';
import { comparePassword } from './methods';

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: [{ validator: isEmail, msg: 'Invalid email.' }],
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

const User = mongoose.model('User', userSchema);

export default User;
