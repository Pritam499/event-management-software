import React, { useEffect, useState } from 'react';
import api from '../services/api';
import EventForm from './EventForm';
import ApprovalQueue from './ApprovalQueue';
import FeedbackForm from './FeedbackForm';
import FeedbackList from './FeedbackList';
import { logout } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function Dashboard({ user, onLogout }) {
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('create');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const userRole = user?.role;
  const userId   = user?.id;
  const userName = user?.name;

  const fetchEvents = () => {
    api.get('/events')
      .then(res => setEvents(res.data))
      .catch(err => console.error('Fetching events error:', err));
  };

  useEffect(fetchEvents, []);

  const handleLogout = () => {
    logout();
    onLogout();
    navigate('/login');
  };

  // events that are approved by CEO *and* the current user is confirmed
  const feedbackEvents = events.filter(e =>
    e.status === 'approved_by_ceo'
    && userId
    && e.attendees.some(a => a.id === userId && a.EventAttendee.isConfirmed)
  );

  return (
    <div className="dashboard">
      <header className="dashboard-header" style={{backgroundColor: 'azure', padding: '1rem', borderBottom: '1px dashed darkgray', marginBottom: '0.5rem'}}>
        <h1 style={{ color: '', margin: "auto" }}>Event Manager App - {userName} ({userRole?.toUpperCase()})</h1>
        <div className="header-settings">
          <button
            className="settings-button"
            onClick={() => setDropdownOpen(o => !o)}
          >⚙️</button>
          {dropdownOpen && (
            <div className="settings-dropdown">
              <button onClick={() => { setDropdownOpen(false); handleLogout(); }}>
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <nav className="dashboard-nav">
{userRole !== 'ceo' && (
  <button
    className={activeTab === 'create' ? 'active' : ''}
    onClick={() => setActiveTab('create')}
  >
    Create Event
  </button>
)}

        <button
          className={activeTab === 'events' ? 'active' : ''}
          onClick={() => setActiveTab('events')}
        >Your Events</button>

        <button
          className={activeTab === 'feedback' ? 'active' : ''}
          onClick={() => setActiveTab('feedback')}
        >Feedback</button>
      </nav>

      <main className="dashboard-content">
          {userRole !== 'ceo' && activeTab === 'create' && (
  <section>
    <EventForm onCreated={fetchEvents} />
  </section>
)}


        {activeTab === 'events' && (
          <section>
            <ApprovalQueue
              events={events}
              userRole={userRole}
              onAction={fetchEvents}
            />
          </section>
        )}

        {activeTab === 'feedback' && (
          <>
            {(userRole === 'employee' || userRole === 'cmo' || userRole === 'ceo') && (
              <section>
                <h2>Submit Feedback</h2>
                {feedbackEvents.length
                  ? feedbackEvents.map(e => (
                      <FeedbackForm
                        key={e.id}
                        eventId={e.id}
                        onSubmitted={fetchEvents}
                      />
                    ))
                  : <p>No past confirmed events to review.</p>}
              </section>
            )}

            {(userRole === 'cmo' || userRole === 'ceo') && (
              <section>
                <FeedbackList />
              </section>
            )}
          </>
        )}

      </main>
    </div>
  );
}

// import React, { useEffect, useState } from 'react';
// import api from '../services/api';
// import EventForm from './EventForm';
// import ApprovalQueue from './ApprovalQueue';
// import FeedbackForm from './FeedbackForm';
// import FeedbackList from './FeedbackList';
// import { logout } from '../services/auth';
// import { useNavigate } from 'react-router-dom';
// import '../App.css';

// export default function Dashboard({ user, onLogout }) {
//   const [events, setEvents] = useState([]);
//   const [activeTab, setActiveTab] = useState('create');
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const navigate = useNavigate();

//   const userRole = user?.role;
//   console.log('User role:', userRole);

//   const fetchEvents = () => {
//     api.get('/events')
//       .then(res => setEvents(res.data))
//       .catch(err => console.error('Fetching events error:', err));
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//     const handleLogout = () => {
//     logout();
//     onLogout();
//     navigate('/login');
//   };

//     const confirmedEvents = events.filter(e =>
//     e.attendees.some(a => a.id === user.id && a.EventAttendee.isConfirmed)
//   );


//   return (
//     <div className="dashboard">
//       <header className="dashboard-header" style={{backgroundColor: 'azure', padding: '1rem', borderBottom: '1px dashed darkgray', marginBottom: '0.5rem'}}>
//         <h1 style={{ color: '', margin: "auto" }}>Welcome, {user?.role?.toUpperCase()} - Event Management</h1>

//         <div className="header-settings">
//           <button
//             className="settings-button"
//             onClick={() => setDropdownOpen(!dropdownOpen)}
//             title="Settings"
//           >
//             ⚙️
//           </button>
//           {dropdownOpen && (
//             <div className="settings-dropdown">
//               <button onClick={() => { setDropdownOpen(false); handleLogout(); }}>
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </header>

//       <nav className="dashboard-nav">
//         <button
//           className={activeTab === 'create' ? 'active' : ''}
//           onClick={() => setActiveTab('create')}
//         >
//           Create Event
//         </button>
//         <button
//           className={activeTab === 'events' ? 'active' : ''}
//           onClick={() => setActiveTab('events')}
//         >
//           Your Events
//         </button>
//         <button
//           className={activeTab === 'feedback' ? 'active' : ''}
//           onClick={() => setActiveTab('feedback')}
//         >
//           Submit Feedback
//         </button>
//       </nav>

//       <main className="dashboard-content">
//         {activeTab === 'create' && (
//           <section>
//             <EventForm onCreated={fetchEvents} />
//           </section>
//         )}

//         {activeTab === 'events' && (
//           <section>
//             <ApprovalQueue events={events} userRole={user?.role} onAction={fetchEvents} />
//           </section>
//         )}

//         {/* {activeTab === 'feedback' && (
//           <section>
//             {events
//               .filter(e => e.status === 'approved_by_ceo')
//               .map(e => (
//                 <FeedbackForm key={e.id} eventId={e.id} onSubmitted={fetchEvents} />
//               ))}
//           </section>
//         )} */}
//         {activeTab === 'feedback' && (
//           <>
//             {userRole === 'employee' && (
//               confirmedEvents.length > 0
//                 ? confirmedEvents.map(e => (
//                     <FeedbackForm
//                       key={e.id}
//                       eventId={e.id}
//                       onSubmitted={fetchEvents}
//                     />
//                   ))
//                 : <p>You have no confirmed events to leave feedback for.</p>
//             )}

//             {(userRole === 'cmo' || userRole === 'ceo') && (
//               <FeedbackList />
//             )}
//           </>
//         )}
//       </main>
//     </div>
//   );
// }