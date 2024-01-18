const express = require('express');
const { addTicket } = require('../controllers/ticketController');
const router = express.Router();

router.post('/', addTicket);

module.exports = router;