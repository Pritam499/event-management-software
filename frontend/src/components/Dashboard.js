import React, { useEffect, useState } from 'react';
import api from '../services/api';
import EventForm from './EventForm';
import ApprovalQueue from './ApprovalQueue';
import FeedbackForm from './FeedbackForm';
import { logout } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function Dashboard({ user, onLogout }) {
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('create');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const userRole = user?.role;
  console.log('User role:', userRole);

  const fetchEvents = () => {
    api.get('/events')
      .then(res => setEvents(res.data))
      .catch(err => console.error('Fetching events error:', err));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

    const handleLogout = () => {
    logout();
    onLogout();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header" style={{backgroundColor: 'azure', padding: '1rem', borderBottom: '1px dashed darkgray', marginBottom: '0.5rem'}}>
        <h1 style={{ color: '', margin: "auto" }}>Welcome, {user?.role?.toUpperCase()} - Event Management</h1>

        <div className="header-settings">
          <button
            className="settings-button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            title="Settings"
          >
            ⚙️
          </button>

          {/* {dropdownOpen && (
            <div className="settings-dropdown">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )} */}
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
        <button
          className={activeTab === 'create' ? 'active' : ''}
          onClick={() => setActiveTab('create')}
        >
          Create Event
        </button>
        <button
          className={activeTab === 'events' ? 'active' : ''}
          onClick={() => setActiveTab('events')}
        >
          Your Events
        </button>
        <button
          className={activeTab === 'feedback' ? 'active' : ''}
          onClick={() => setActiveTab('feedback')}
        >
          Submit Feedback
        </button>
      </nav>

      <main className="dashboard-content">
        {activeTab === 'create' && (
          <section>
            <EventForm onCreated={fetchEvents} />
          </section>
        )}

        {activeTab === 'events' && (
          <section>
            <ApprovalQueue events={events} userRole={user?.role} onAction={fetchEvents} />
          </section>
        )}

        {activeTab === 'feedback' && (
          <section>
            {events
              .filter(e => e.status === 'approved_by_ceo')
              .map(e => (
                <FeedbackForm key={e.id} eventId={e.id} onSubmitted={fetchEvents} />
              ))}
          </section>
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
// import { logout } from '../services/auth';
// import { useNavigate } from 'react-router-dom';
// import '../App.css';

// export default function Dashboard({ user, onLogout }) {
//   const [events, setEvents] = useState([]);
//   const [activeTab, setActiveTab] = useState('create');
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     onLogout();
//     navigate('/login');
//   };

//   useEffect(() => {
//     api.get('/events').then(res => setEvents(res.data));
//   }, []);

//   const refresh = () => api.get('/events').then(res => setEvents(res.data));

//   return (
//     <div className="dashboard">
//       <header className="dashboard-header">
//         <h1>Welcome, {user.role}</h1>
//         <button className="btn-logout" onClick={handleLogout}>Logout</button>
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
//             <EventForm onCreated={refresh} />
//           </section>
//         )}

//         {activeTab === 'events' && (
//           <section>
//             <ApprovalQueue events={events} userRole={user.role} onAction={refresh} />
//           </section>
//         )}

//         {activeTab === 'feedback' && (
//           <section>
//             {events
//               .filter(e => e.status === 'approved_by_ceo')
//               .map(e => (
//                 <FeedbackForm key={e.id} eventId={e.id} onSubmitted={refresh} />
//               ))}
//           </section>
//         )}
//       </main>
//     </div>
//   );
// }