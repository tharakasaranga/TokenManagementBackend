const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema(
  {
    mobileNumber: {
      type: String,
      required: [true, 'Please add a mobile number'],
    },
    status: {
      type: String,
      enum: ['PENDING', 'SERVED', 'CANCELLED'], 
      default: 'PENDING',
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model('Token', tokenSchema);