const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  registeredEvents: [{
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    attended: {
      type: Boolean,
      default: false
    },
    certificateReceived: {
      type: Boolean,
      default: false
    }
  }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;