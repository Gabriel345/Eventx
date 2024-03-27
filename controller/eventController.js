const Event = require('../models/event');

// Função para criar um novo evento
exports.createEvent = async (req, res) => {
    try {
        // Extraia os dados do corpo da solicitação
        const { title, type, description, date, organizer } = req.body;

        // Verifique se a imagem de capa foi enviada
        if (!req.file) {
            return res.status(400).json({ message: 'Imagem de capa não enviada' });
        }

        // Crie um novo evento com os dados fornecidos
        const newEvent = new Event({
            title,
            type,
            description,
            date,
            organizer,
            coverImage: {
                data: req.file.buffer, // Dados binários da imagem
                contentType: req.file.mimetype // Tipo de conteúdo da imagem
            }
        });

        // Salve o novo evento no banco de dados
        await newEvent.save();

        // Retorne uma resposta de sucesso
        res.status(201).json(newEvent);
    } catch (error) {
        // Se ocorrer um erro, retorne uma resposta de erro
        res.status(500).json({ message: error.message });
    }
};
// Função para buscar todos os eventos
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Função para buscar um evento pelo ID
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

// Função para atualizar um evento existente
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

// Função para excluir um evento
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