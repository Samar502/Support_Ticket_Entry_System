import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Components.css';

const TicketList = () => {
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [statusFilter, setStatusFilter] = useState('');
    const [assignedToFilter, setAssignedToFilter] = useState(''); 
    const [severityFilter, setSeverityFilter] = useState(''); 
    const [typeFilter, setTypeFilter] = useState(''); 
    const [filteredTickets, setFilteredTickets] = useState([]);
  
    useEffect(() => {

      axios
        .get('http://localhost:5000/api/support-tickets') 
        .then((response) => {
          setTickets(response.data);
          setFilteredTickets(tickets);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching tickets:', error);
          setIsLoading(false);
        });
    }, []);

    const applyFilters = () => {
        let filteredList = [...tickets];
        if (statusFilter) {
          filteredList = filteredList.filter((ticket) => ticket.status === statusFilter);
        }
        if (assignedToFilter) {
            filteredList = filteredList.filter((ticket) => {
            if(ticket.agentName){         
                return ticket.agentName.includes(assignedToFilter)
            }
            });
        }
        if (severityFilter) {
          filteredList = filteredList.filter((ticket) => ticket.severity === severityFilter);
        }
        if (typeFilter) {
            filteredList = filteredList.filter((ticket) => ticket.type.includes(typeFilter));
        }
        setFilteredTickets(filteredList);
      };

      useEffect(() => {
        applyFilters();
      }, [tickets, statusFilter, assignedToFilter, severityFilter, typeFilter]);

    const formatDateToIST = (date) => {

        let ndate = date ? new Date(date) : null;
        let indianDate = ndate ? ndate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', timeZoneName: 'short' }) : null;
        return indianDate;
      };

    const handleSortByDate = (field) => {
        const sortedTickets = [...tickets].sort((a, b) => {
          const dateA = new Date(a[field]);
          const dateB = new Date(b[field]);
          const sortOrderFactor = sortOrder === 'asc' ? 1 : -1;
    
          return sortOrderFactor * (dateA - dateB);
        });

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
          <h2 className='heading'>Ticket List</h2>
        <div className="filters-container">
          <div>
            <label>Status:</label>
                <select onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">All</option>
                <option value="New">New</option>
                <option value="Assigned">Assigned</option>
            </select>
          </div>

          <div>
            <label>Assigned To:</label>
            <input
            type="text"
            onChange={(e) => setAssignedToFilter(e.target.value)}
            placeholder="Filter by Assigned Agent"
            />
        </div>

          <div>
            <label>Severity:</label>
                <select onChange={(e) => setSeverityFilter(e.target.value)}>
                <option value="">All</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
          </div>

          <div>
            <label>Type:</label>
            <input
            type="text"
            onChange={(e) => setTypeFilter(e.target.value)}
            placeholder="Filter by Type"
            />
        </div>
        </div>

          <div className="sort-container">
            <button onClick={() => handleSortByDate('dateCreated')} className='submit-button'>
              Sort by Date Created ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
            </button>
            <button onClick={() => handleSortByDate('resolvedOn')} className='submit-button'>
              Sort by Resolved On ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
            </button>
          </div>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="ticket-grid">
              {filteredTickets.map((ticket) => (
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