const express = require('express');
const { createTicket, getTickets, getTicketById, updateTicket} = require('../controllers/ticketController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createTicket);
router.get('/', authMiddleware, getTickets);
router.get('/:id', authMiddleware, getTicketById);
router.put('/:id', authMiddleware, updateTicket);

module.exports = router;