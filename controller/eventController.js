const Event = require('../models/event');


exports.createEvent = async (req, res) => {
  try {
      const { title, type, description, date } = req.body;

      // Verificar se o usuário está autenticado
      if (!req.session.userId) {
          return res.status(401).json({ message: 'Usuário não autenticado' });
      }

      // Verificar se a imagem de capa foi enviada
      if (!req.file) {
          return res.status(400).json({ message: 'Imagem de capa não enviada' });
      }

      const coverImagePath = req.file.path;
    
      const organizer = req.session.userId;

      const newEvent = new Event({
          title,
          type,
          description,
          date,
          organizer,
          coverImage: coverImagePath
      });
      await newEvent.save();

      res.status(201).json(newEvent);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }
    res.status(200).json({ message: 'Evento excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};