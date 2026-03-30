import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Activity, Upload, Settings, LogOut, CheckCircle, XCircle, FileText } from 'lucide-react';
import './ModuleOrganiserDashboard.css';
import qmulLogo from '../assets/qmul-logo.jpg'; 

const ModuleOrganiserDashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => navigate('/login');

  const [selectedTicket, setSelectedTicket] = useState(null);

  const dummyTickets = [
    { id: '3046', status: 'Pending', desc: 'Missed lab due to illness', ec: true },
    { id: '3047', status: 'Pending', desc: 'Late submission appeal', ec: true }
  ];

  return (
    <div className="mo-dashboard-container">
      <div className="mo-sidebar">
        <div className="mo-sidebar-brand"><img src={qmulLogo} alt="QMUL Logo" /></div>
        <div className="mo-nav-menu">
          <div className="mo-nav-item active"><Home size={20} /><span>Home</span></div>
        </div>
        <div className="mo-bottom-nav">
          <div className="mo-nav-item" onClick={handleLogout}><LogOut size={20} /><span>Log out</span></div>
        </div>
      </div>
      
      <div className="mo-main-content">
        <h1>Welcome back, Module Organiser!</h1>
        <div className="mo-table-section">
          <h2>Tickets requiring approval</h2>
          <table className="mo-tickets-table">
            <thead>
              <tr>
                <th>Ticket ID</th><th>Status</th><th>Description</th><th>EC</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dummyTickets.map((ticket, index) => (
                <tr key={index}>
                  <td>{ticket.id}</td>
                  <td><span className="mo-badge pending">{ticket.status}</span></td>
                  <td>{ticket.desc}</td>
                  <td className="mo-ec-icon">{ticket.ec ? <CheckCircle color="green" /> : <XCircle color="red" />}</td>
                  <td><button className="mo-review-btn" onClick={() => setSelectedTicket(ticket)}>Review</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedTicket && (
        <div className="mo-modal-overlay">
          <div className="mo-modal-content">
            <h2>Review Ticket #{selectedTicket.id}</h2>
            <div className="mo-modal-details">
              <p><strong>Description:</strong> {selectedTicket.desc}</p>
              <p><strong>Status:</strong> {selectedTicket.status}</p>
              <div className="mo-evidence-box">
                <FileText size={20} /> <span>Evidence_Medical_Note.pdf</span>
              </div>
            </div>
            <div className="mo-modal-actions">
              <button className="mo-btn-approve" onClick={() => setSelectedTicket(null)}>Approve</button>
              <button className="mo-btn-reject" onClick={() => setSelectedTicket(null)}>Reject</button>
              <button className="mo-btn-cancel" onClick={() => setSelectedTicket(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModuleOrganiserDashboard;
