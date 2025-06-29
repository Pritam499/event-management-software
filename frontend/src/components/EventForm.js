// // src/components/EventForm.js
// import React, { useState, useEffect } from 'react';
// import api from '../services/api';
// import '../App.css';

// export default function EventForm({ onCreated }) {
//   const [users, setUsers] = useState([]);
//   const [form, setForm] = useState({
//     title: '',
//     date: '',
//     time: '',
//     place: '',
//     agenda: '',
//     reason: '',
//     attendeeIds: []
//   });

//   useEffect(() => {
//     api.get('/users').then(res => setUsers(res.data));
//   }, []);

//   const toggleAttendee = (id) => {
//     setForm(f => {
//       const set = new Set(f.attendeeIds);
//       if (set.has(id)) set.delete(id);
//       else set.add(id);
//       return { ...f, attendeeIds: Array.from(set) };
//     });
//   };

//   const submit = async (e) => {
//     e.preventDefault();
//     await api.post('/events', form);
//     alert('Event submitted');
//     setForm({
//       title: '',
//       date: '',
//       time: '',
//       place: '',
//       agenda: '',
//       reason: '',
//       attendeeIds: []
//     });
//     onCreated();
//   };

//   return (
//     <div className="card-wrapper event-form">
//       <div className="full">
//         <label>Title</label>
//         <input
//           value={form.title}
//           onChange={e => setForm({...form, title: e.target.value})}
//           required
//         />
//       </div>
//        <div>
//         <label>Date</label>
//        <input
//           type="date"
//           value={form.date}
//           onChange={e=>setForm({...form, date:e.target.value})}
//           required
//         />
//       </div>
//       <div>
//         <label>Time</label>
//         <input
//           type="time"
//           value={form.time}
//           onChange={e=>setForm({...form, time:e.target.value})}
//           required
//         />
//       </div>
//       <div className="full">
//         <label>Place</label>
//         <input
//           value={form.place}
//           onChange={e=>setForm({...form, place:e.target.value})}
//           required
//         />
//       </div>
//       <div className="full">
//         <label>Agenda</label>
//         <textarea
//           value={form.agenda}
//           onChange={e=>setForm({...form, agenda:e.target.value})}
//         />
//       </div>
//       <div className="full">
//         <label>Reason</label>
//         <textarea
//           value={form.reason}
//           onChange={e=>setForm({...form, reason:e.target.value})}
//         />
//       </div>
//       <div className="full">
//         <label>Attendees</label>
//         <div className="checkbox-group">
//           {users.map(u => (
//             <label key={u.id} className="checkbox-item">
//               <input
//                 type="checkbox"
//                 checked={form.attendeeIds.includes(u.id)}
//                 onChange={() => toggleAttendee(u.id)}
//               />
//               {u.name}
//             </label>
//           ))}
//         </div>
//       </div>
//       <button type="submit" onClick={submit}>Submit Event</button>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import api from "../services/api";
import "../App.css";

export default function EventForm({ onCreated }) {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    place: "",
    agenda: "",
    reason: "",
    attendeeIds: [],
  });

  useEffect(() => {
    api.get("/users").then((res) => setUsers(res.data));
  }, []);

  // toggle one attendee
  const toggleAttendee = (id) => {
    setForm((f) => {
      const set = new Set(f.attendeeIds);
      set.has(id) ? set.delete(id) : set.add(id);
      return { ...f, attendeeIds: [...set] };
    });
  };

  // select or deselect all currently filtered
  const toggleAll = () => {
    const filteredIds = filteredUsers.map((u) => u.id);
    setForm((f) => {
      const set = new Set(f.attendeeIds);
      const allSelected = filteredIds.every((id) => set.has(id));
      filteredIds.forEach((id) => (allSelected ? set.delete(id) : set.add(id)));
      return { ...f, attendeeIds: [...set] };
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/events", form);
    alert("🎉 Event submitted!");
    setForm({
      title: "",
      date: "",
      time: "",
      place: "",
      agenda: "",
      reason: "",
      attendeeIds: [],
    });
    onCreated();
  };

  // apply search filter
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(filter.toLowerCase())
  );

  // is everything filtered selected?
  const allSelected = filteredUsers.every((u) =>
    form.attendeeIds.includes(u.id)
  );

  return (
    // <form className="card-wrapper event-form" onSubmit={submit}>
    <form className="card-wrapper event-form" onSubmit={submit}>
      <div className="full">
        <label>Title</label>
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Date</label>
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Time</label>
        <input
          type="time"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
          required
        />
      </div>
      <div className="full">
        <label>Place</label>
        <input
          value={form.place}
          onChange={(e) => setForm({ ...form, place: e.target.value })}
          required
        />
      </div>
      <div className="full">
        <label>Agenda</label>
        <textarea
          value={form.agenda}
          onChange={(e) => setForm({ ...form, agenda: e.target.value })}
        />
      </div>
      <div className="full">
        <label>Reason</label>
        <textarea
          value={form.reason}
          onChange={(e) => setForm({ ...form, reason: e.target.value })}
        />
      </div>

      <div className="form-group full">
        <label>Attendees</label>
        <input
          type="text"
          placeholder="Search attendees…"
          className="filter-input"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <div className="select-all">
          <label htmlFor="selectAll">
            {allSelected ? "Unselect All" : "Select All"}
          </label>
          <input
            type="checkbox"
            id="selectAll"
            checked={allSelected}
            onChange={toggleAll}
          />
        </div>
        <div className="attendee-list">
          {filteredUsers.map((u) => (
            <label key={u.id} className="attendee-item">
              <input
                type="checkbox"
                checked={form.attendeeIds.includes(u.id)}
                onChange={() => toggleAttendee(u.id)}
              />
              <span>{u.name}</span>
            </label>
          ))}
          {filteredUsers.length === 0 && (
            <p className="no-results">No attendees found</p>
          )}
        </div>
      </div>

      <button type="submit" className="btn-submit">
        Submit Event
      </button>
    </form>
  );
}
