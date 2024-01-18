const Agent = require('../models/Agent');
const Ticket = require('../models/Ticket');

exports.addTicket = async(req,res) => {
    try{
        const inactiveAgents = await Agent.find({active: false});
        // console.log(inactiveAgents);

        if(inactiveAgents.length > 0){
            const assignedAgent = inactiveAgents[0];
            console.log(assignedAgent);

            const ticket = new Ticket({
                ...req.body,
                assignedTo: assignedAgent._id,
                status: 'Assigned',
                resolvedOn: new Date()
            });

            console.log(ticket);

            await ticket.save();

            await Agent.findByIdAndUpdate(assignedAgent._id, {active: true});
            res.status(201).json(ticket);
        }
        else{
            const ticket = new Ticket(req.body);
            // console.log(ticket);
            await ticket.save();
            res.status(400).json(ticket);
        }
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}