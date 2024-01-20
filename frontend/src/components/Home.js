import React from 'react';
import {Link} from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Support Ticket System</h1>
      <div className="homepage-buttons">
        <Link to="/api/support-agents" className="button">
          Add Agent  
        </Link>
        <span>      </span>
        <Link to="/api/support-tickets" className="button">
          Add Ticket  
        </Link>
        <span>      </span>
        <Link to="/api/get-tickets" className="button">
          View All Tickets  
        </Link>
      </div>
    </div>
  )
}

export default Home