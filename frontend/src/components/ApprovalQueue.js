// src/components/ApprovalQueue.js
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

  return (
    <div className="approval-queue">
      {events.map(evt => (
        <div key={evt.id} className="event-card">
          <h3>{evt.title}</h3>
          <p><em>Status: </em>{evt.status.replace(/_/g, ' ')}</p>

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




// import React from 'react';
// import api from '../services/api';
// import '../App.css';

// export default function ApprovalQueue({ events, userRole, onAction }) {
//   const handle = async (id,status) => {
//     await api.patch(`/events/${id}/status`, { status });
//     onAction();
//   };

//   return (
//     <div className="approval-queue">
//       {events.map(evt => (
//         <div key={evt.id} className="event-card">
//           <h3>{evt.title} ({evt.status})</h3>
//           {userRole==='cmo' && evt.status==='pending' && (
//             <>
//               <button onClick={()=>handle(evt.id,'approved_by_cmo')}>Approve</button>
//               <button onClick={()=>handle(evt.id,'rejected_by_cmo')}>Reject</button>
//             </>
//           )}
//           {userRole==='ceo' && evt.status==='approved_by_cmo' && (
//             <>
//               <button onClick={()=>handle(evt.id,'approved_by_ceo')}>Approve</button>
//               <button onClick={()=>handle(evt.id,'rejected_by_ceo')}>Reject</button>
//             </>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }