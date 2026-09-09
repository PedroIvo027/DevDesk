const Ticket = require('../models/ticket');

const createTicket = async (req, res) => {
    try {
        const { title, description, priority, category } = req.body;

        if (!title || !description || !category) {
            return res.status(400).json({
                message: 'Título, descrição e categoria são obrigatórios.'
            });
        }

        const ticket = await Ticket.create({
            title,
            description,
            priority,
            category,
            userId: req.user.id
        });

        return res.status(201).json({
            message: 'Chamado criado com sucesso.',
            ticket
        });

    } catch (error) {
        console.error('Erro ao criar chamado:', error);

        return res.status(500).json({
            message: 'Erro interno do servidor.'
        });
    }
};

module.exports = {
    createTicket
};