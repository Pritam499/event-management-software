// import React, { useState } from 'react';
// import api from '../services/api';

// export default function FeedbackForm({ eventId, onSubmitted }) {
//   const [text, setText] = useState('');
//   const [again, setAgain] = useState(true);

//   const submit = async () => {
//     await api.post(`/feedback/${eventId}`, { feedbackText: text, shouldAttendFuture: again });
//     alert('Feedback submitted');
//     setText('');
//     onSubmitted();
//   };

//   return (
//     <div className="feedback-form">
//       <h4>Event #{eventId}</h4>
//       <textarea value={text} onChange={e=> setText(e.target.value)} placeholder="Your feedback" />
//       <label>
//         <input type="checkbox" checked={again} onChange={e=>setAgain(e.target.checked)} />
//         Would attend again?
//       </label>
//       <button onClick={submit}>Submit Feedback</button>
//     </div>
//   );
// }

import React, { useState } from 'react';
import api from '../services/api';
import '../App.css';

export default function FeedbackForm({ eventId, onSubmitted }) {
  const [text, setText] = useState('');
  const [again, setAgain] = useState(true);

  const submit = async () => {
    await api.post(`/feedback/${eventId}`, {
      feedbackText: text,
      shouldAttendFuture: again
    });
    alert('Feedback submitted');
    setText('');
    onSubmitted();
  };

  return (
    <div className="feedback-form">
      <h4>Event #{eventId}</h4>
      <textarea
        value={text}
        onChange={e=>setText(e.target.value)}
        placeholder="Your feedback"
      />
      <label>
        <input
          type="checkbox"
          checked={again}
          onChange={e=>setAgain(e.target.checked)}
        /> Would attend again?
      </label>
      <button onClick={submit}>Submit Feedback</button>
    </div>
  );
}
