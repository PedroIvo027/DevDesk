const express = require('express');
const { createTicket } = require('../controllers/ticketController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createTicket);

module.exports = router;