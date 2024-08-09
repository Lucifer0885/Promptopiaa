import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true, // Ensure index creation
    required: [true, 'Email is required!'],
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    trim: true,
  },
  image: {
    type: String,
    default: './public/icons/loader.svg', // Providing a default value
  }
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

// Ensure the uniqueness constraint is created at the database level
UserSchema.index({ email: 1 }, { unique: true });

const User = models.User || model("User", UserSchema);

export default User;