import React from 'react';
import api from '../services/api';
import '../App.css';

export default function ApprovalQueue({ events, userRole, onAction }) {
  const handleStatus = async (id, newStatus) => {
    try {
      await api.patch(`/events/${id}/status`, { status: newStatus });
      onAction();
    } catch (err) {
      console.error('Status update failed:', err.response?.data || err.message);
      alert('Unable to update status.');
    }
  };

  const userName = userRole === 'employee' ? 'Employee' : userRole === 'cmo' ? 'CMO' : 'CEO';

  return (
    <div className="approval-queue">
      {events.map(evt => (
        <div key={evt.id} className="event-card">
          <h3>{evt.title}</h3>
          <p><em>Status: </em>{evt.status.replace(/_/g, ' ')}</p>
          <p><strong>Organizer:</strong> {userName}</p>
          <p><strong>Date:</strong> {new Date(evt.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {new Date(`1970-01-01T${evt.time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
          <p><strong>Description:</strong> {evt.reason}</p>
          <p><strong>Location:</strong> {evt.place}</p>

          {userRole === 'cmo' && evt.status === 'pending' && (
            <div className="button-row">
              <button onClick={() => handleStatus(evt.id, 'approved_by_cmo')}>Approve</button>
              <button onClick={() => handleStatus(evt.id, 'rejected_by_cmo')}>Reject</button>
            </div>
          )}

          {userRole === 'ceo' && evt.status === 'approved_by_cmo' && (
            <div className="button-row">
              <button onClick={() => handleStatus(evt.id, 'approved_by_ceo')}>Approve</button>
              <button onClick={() => handleStatus(evt.id, 'rejected_by_ceo')}>Reject</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}