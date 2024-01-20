const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const Agent = require('./models/Agent');
const Ticket = require('./models/Ticket');
const exp = require('constants');
const cors = require('cors');
const agentRoute = require('./routes/agentRoute');
const ticketRoute = require('./routes/ticketRoute');

const app = express();
app.use(express.json());

console.log('Hello!');

const dbURI = 'mongodb+srv://samar:test12345@cluster0.mtrahda.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, { 
    useNewUrlParser : true, 
    useUnifiedTopology : true
    }).then((result) => app.listen(5000))
    .catch((err) => console.log(err));

const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
};

app.use(cors(corsOptions));

app.use('/api/support-agents', agentRoute);

app.use('/api/support-tickets', ticketRoute);

app.use('/api/support-tickets', ticketRoute);

app.get('/', (req,res) => {
    res.send('Hello!');
})