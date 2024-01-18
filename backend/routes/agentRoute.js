const express = require('express');
const { addAgent } = require('../controllers/agentController');
const router = express.Router();

router.post('/', addAgent);

module.exports = router;