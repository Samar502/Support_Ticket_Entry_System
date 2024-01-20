const express = require('express');
const { addTicket, getTickets } = require('../controllers/ticketController');
const router = express.Router();

router.post('/', addTicket);
router.get('/',getTickets);

module.exports = router;