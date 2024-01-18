const Agent = require('../models/Agent');

// Add an agent
exports.addAgent = async (req, res) => {
    try {
        const agent = await Agent.create(req.body);
        res.status(201).json(agent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};