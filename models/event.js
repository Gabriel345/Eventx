const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["online", "presencial"], 
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  participants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    attended: {
      type: Boolean,
      default: false
    },
    certificateSent: {
      type: Boolean,
      default: false
    },
    certificateSentDate: {
      type: Date
    }
  }],
  coverImage: {
    type: String, 
    required: true 
  }
});


eventSchema.virtual("url").get(function () {
  return `/events/${this._id}`;
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;