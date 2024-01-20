import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddTicket.css';

const TicketList = () => {
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
  
    useEffect(() => {
      // Fetch the list of tickets when the component mounts
      axios
        .get('http://localhost:5000/api/support-tickets') // Assuming your frontend and backend are running on the same host
        .then((response) => {
          // Handle the response from the backend
        //   console.log(response);
          setTickets(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching tickets:', error);
          setIsLoading(false);
        });
    }, []);

    const formatDateToIST = (date) => {
       // console.log(date);
        let ndate = new Date(date);
        // let ndate = date;
        let indianDate = ndate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', timeZoneName: 'short' });
        // console.log(indianDate);
        return indianDate;
        // if (date instanceof Date) {
        //   return date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        // }
        // return '';
      };
  
    // return (
    //   <div>
    //     <h2>Ticket List</h2>
    //     {isLoading ? (
    //       <p>Loading...</p>
    //     ) : (
    //         <div>
    //         {tickets.map((ticket) => (
    //           <div key={ticket.id} className="ticket-card">
    //             <h3>Ticket Details</h3>
    //           <ul>
    //             <li>
    //               <strong>Topic:</strong> {ticket.topic}
    //             </li>
    //             <li>
    //               <strong>Description:</strong> {ticket.description}
    //             </li>
    //             <li>
    //               <strong>Severity:</strong> {ticket.severity}
    //             </li>
    //             <li>
    //               <strong>Type:</strong> {ticket.type}
    //             </li>
    //             <li>
    //               <strong>Assigned To:</strong> {ticket.assignedTo}
    //             </li>
    //             <li>
    //               <strong>Status:</strong> {ticket.status}
    //             </li>
    //             <li>
    //               <strong>Resolved On:</strong> {formatDateToIST(ticket.resolvedOn)}
    //             </li>
    //             <li>
    //               <strong>Date Created:</strong> {formatDateToIST(ticket.dateCreated)}
    //             </li>
    //           </ul>
    //           </div>
    //         ))}
    //       </div>
    //     )}
    //   </div>
    // );
    const handleSortByDate = (field) => {
        const sortedTickets = [...tickets].sort((a, b) => {
          const dateA = new Date(a[field]);
          const dateB = new Date(b[field]);
          const sortOrderFactor = sortOrder === 'asc' ? 1 : -1; // Determine the sorting order
    
          return sortOrderFactor * (dateA - dateB);
        });
    
        // Toggle sorting order
        if (sortOrder === 'asc') {
          setSortOrder('desc');
        } else {
          setSortOrder('asc');
        }
    
        setSortBy(field);
        setTickets(sortedTickets);
      };

    return (
        <div>
          <h2>Ticket List</h2>
          <div className="sort-buttons">
            <button onClick={() => handleSortByDate('dateCreated')}>
              Sort by Date Created ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
            </button>
            <button onClick={() => handleSortByDate('resolvedOn')}>
              Sort by Resolved On ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
            </button>
          </div>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="ticket-grid">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="ticket-card">
                  <h3>Ticket Details</h3>
                  <ul>
                    <li>
                      <strong>Topic:</strong> {ticket.topic}
                    </li>
                    <li>
                      <strong>Description:</strong> {ticket.description}
                    </li>
                    <li>
                      <strong>Severity:</strong> {ticket.severity}
                    </li>
                    <li>
                      <strong>Type:</strong> {ticket.type}
                    </li>
                    <li>
                      <strong>Assigned To:</strong> {ticket.agentName}
                    </li>
                    <li>
                      <strong>Status:</strong> {ticket.status}
                    </li>
                    <li>
                      <strong>Resolved On:</strong> {formatDateToIST(ticket.resolvedOn)}
                    </li>
                    <li>
                      <strong>Date Created:</strong> {formatDateToIST(ticket.dateCreated)}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      );
}

export default TicketList