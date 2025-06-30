import React, { useState, useEffect } from 'react';
import api from '../services/api';

function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    api.get('/feedback')
       .then(res => setFeedbacks(res.data))
       .catch(err => console.error('Error fetching feedback:', err));
  }, []);

  return (
    <div className="feedback-list">
      <h2>All Feedback</h2>
      {feedbacks.map(f => (
        <div key={f.id} className="feedback-entry">
          <strong>{f.attendee.name}</strong> on <em>{f.event.title}</em>:
          <p>{f.feedbackText}</p>
          <p>Would attend again? <strong>{f.shouldAttendFuture ? 'Yes' : 'No'}</strong></p>
        </div>
      ))}
    </div>
  );
}

export default FeedbackList;