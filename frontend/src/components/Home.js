import React from 'react';
import {Link} from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1 className='heading'>Support Ticket System</h1>
      <div className="homepage">
        <Link to="/api/support-agents" className="submit-button">
          Add Agent  
        </Link>
        <span>      </span>
        <Link to="/api/support-tickets" className="submit-button">
          Add Ticket  
        </Link>
        <span>      </span>
        <Link to="/api/get-tickets" className="submit-button">
          View All Tickets  
        </Link>
      </div>
    </div>
  )
}

export default Home