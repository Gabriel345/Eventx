const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["", "", ], // Tipos de eventos 
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});
EventSchema.virtual("url").get(function () {
    return `/events/${this._id}`;
  });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;