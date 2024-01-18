const Agent = require('../models/Agent');
const Ticket = require('../models/Ticket');

// Add an agent
exports.addAgent = async (req, res) => {
    try{
        const unassignedTickets = await Ticket.find({assignedTo: null});

        if(unassignedTickets.length > 0){
            const unassignedTicket = unassignedTickets[0];

            const agent = new Agent({
                ...req.body,
                active: true
            });

            await agent.save();
            await Ticket.findByIdAndUpdate(unassignedTicket._id, {
                assignedTo: agent._id,
                status: 'Assigned',
                resolvedOn: new Date()
            });
            res.status(201).json({
                status: 'Success',
                data: {
                    agent
                }
            }) 
        }
        else{
            const agent = new Agent(req.body);
            await agent.save();
            res.status(201).json({
                status: 'Success',
                data: {
                    agent
                }
            })   
        }
        // console.log('done');
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message: err
        })
    }
};