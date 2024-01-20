const Agent = require('../models/Agent');
const Ticket = require('../models/Ticket');

exports.addTicket = async(req,res) => {
    console.log('Here');
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
            console.log('ok');
            await Agent.findByIdAndUpdate(assignedAgent._id, {active: true});
            
            res.status(201).json(ticket);
            console.log('Done');
        }
        else{
            const ticket = new Ticket(req.body);
            console.log('gadbad');
            console.log(ticket);
            await ticket.save();
            res.status(201).json(ticket);
        }
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

exports.getTickets = async(req,res) => {
    // console.log('Here');
    try{
        const tickets = await Ticket.find().lean();
        // console.log(typeof(tickets));
        for (const ticket of tickets) {
            const agent = await Agent.findById(ticket.assignedTo);
            if (agent) {
              ticket.agentName = agent.name;
            }
        }
        res.json(tickets);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}