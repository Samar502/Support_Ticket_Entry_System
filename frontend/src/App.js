import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Agent from './components/Agent';
import AddTicket from './components/AddTicket';
import TicketList from './components/TicketList';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route exact path='/api/support-agents' element={<Agent/>}/>
        <Route exact path='/api/support-tickets' element={<AddTicket />}/>
        <Route exact path='/api/get-tickets' element={<TicketList />}/> 
      </Routes>
    </Router>
  );
}

export default App;
