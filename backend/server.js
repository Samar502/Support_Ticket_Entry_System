const http = require('http');
const express = require('express');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');
const mongoose = require('mongoose');
const Agent = require('./models/Agent');
const Ticket = require('./models/Ticket');
const exp = require('constants');
const cors = require('cors');
const agentRoute = require('./routes/agentRoute');
const ticketRoute = require('./routes/ticketRoute');

const app = express();
app.use(express.json());
// dotenv.config();
// connectDB();

console.log('Hello!');

const dbURI = 'mongodb+srv://samar:test12345@cluster0.mtrahda.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, { 
    useNewUrlParser : true, 
    useUnifiedTopology : true
    }).then((result) => app.listen(5000))
    .catch((err) => console.log(err));

// app.post('/api/support-agents', async (req,res) => {
//     // console.log(req.body);
//     try{
//         const unassignedTickets = await Ticket.find({assignedTo: null});

//         if(unassignedTickets.length > 0){
//             const unassignedTicket = unassignedTickets[0];

//             const agent = new Agent({
//                 ...req.body,
//                 active: true
//             });

//             await agent.save();
//             await Ticket.findByIdAndUpdate(unassignedTicket._id, {
//                 assignedTo: agent._id,
//                 status: 'Assigned',
//                 resolvedOn: new Date()
//             });
//             res.status(201).json({
//                 status: 'Success',
//                 data: {
//                     agent
//                 }
//             }) 
//         }
//         else{
//             const agent = new Agent(req.body);
//             await agent.save();
//             res.status(201).json({
//                 status: 'Success',
//                 data: {
//                     agent
//                 }
//             })   
//         }
//         // console.log('done');
//     }catch(err){
//         res.status(500).json({
//             status: 'Failed',
//             message: err
//         })
//     }
// })
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from the frontend server
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable credentials (if needed)
};

app.use(cors(corsOptions));

app.use('/api/support-agents', agentRoute);

app.use('/api/support-tickets', ticketRoute);

app.use('/api/support-tickets', ticketRoute);

// app.post('/api/support-tickets', async(req,res) => {
//     try{
//         const inactiveAgents = await Agent.find({active: false});
//         // console.log(inactiveAgents);

//         if(inactiveAgents.length > 0){
//             const assignedAgent = inactiveAgents[0];
//             console.log(assignedAgent);

//             const ticket = new Ticket({
//                 ...req.body,
//                 assignedTo: assignedAgent._id,
//                 status: 'Assigned',
//                 resolvedOn: new Date()
//             });

//             console.log(ticket);

//             await ticket.save();

//             await Agent.findByIdAndUpdate(assignedAgent._id, {active: true});
//             res.status(201).json(ticket);
//         }
//         else{
//             const ticket = new Ticket(req.body);
//             // console.log(ticket);
//             await ticket.save();
//             res.status(400).json(ticket);
//         }
//     }
//     catch(err){
//         res.status(500).json({message: err.message});
//     }
// })

app.get('/', (req,res) => {
    res.send('Hello!');
})

// app.listen(3000, ()=> {
//     console.log('Listening to port 3000');
// })