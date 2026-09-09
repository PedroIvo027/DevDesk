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

const getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.findAll({
            where: {
                userId: req.user.id
            },
            order: [['createdAt', 'DESC']]
        });

        return res.status(200).json(tickets);

    } catch (error) {
        console.error('Erro ao buscar chamados:', error);

        return res.status(500).json({
            message: 'Erro interno do servidor.'
        });
    }
};

const getTicketById = async (req, res) => {
    try {
        const { id } = req.params;

        const ticket = await Ticket.findOne({
            where: {
                id,
                userId: req.user.id
            }
        });

        if (!ticket) {
            return res.status(404).json({
                message: 'Chamado não encontrado.'
            });
        }

        return res.status(200).json(ticket);

    } catch (error) {
        console.error('Erro ao buscar chamado:', error);

        return res.status(500).json({
            message: 'Erro interno do servidor.'
        });
    }
};

const updateTicket = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            title,
            description,
            status,
            priority,
            category
        } = req.body;

        const ticket = await Ticket.findOne({
            where: {
                id,
                userId: req.user.id
            }
        });

        if (!ticket) {
            return res.status(404).json({
                message: 'Chamado não encontrado.'
            });
        }

        await ticket.update({
            title: title ?? ticket.title,
            description: description ?? ticket.description,
            status: status ?? ticket.status,
            priority: priority ?? ticket.priority,
            category: category ?? ticket.category
        });

        return res.status(200).json({
            message: 'Chamado atualizado com sucesso.',
            ticket
        });

    } catch (error) {
        console.error('Erro ao atualizar chamado:', error);

        return res.status(500).json({
            message: 'Erro interno do servidor.'
        });
    }
};

module.exports = {
    createTicket,
    getTickets,
    getTicketById,
    updateTicket
};
