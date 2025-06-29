// services/feedbackService.js

import { Feedback, Event, EventAttendee, User } from '../models/index.js';

export const submitFeedback = async (userId, eventId, { feedbackText, shouldAttendFuture }) => {
  const event = await Event.findByPk(eventId);
  if (!event) throw new Error('Event not found');

  const now = new Date();
  const eventDate = new Date(event.date);
  if (now < eventDate) {
    throw new Error('Event not occurred yet');
  }

  const rel = await EventAttendee.findOne({
    where: { eventId, userId, isConfirmed: true }
  });
  if (!rel) {
    throw new Error('Not a confirmed attendee');
  }

  return Feedback.create({
    eventId,
    attendeeId: userId,
    feedbackText,
    shouldAttendFuture
  });
};

export const listAll = () => Feedback.findAll({
  include: [
    {
      model: Event,
      as: 'event',       
      attributes: ['id','title','date','time','place','status']
    },
    {
      model: User,
      as: 'attendee',    
      attributes: ['id','name','email']
    }
  ]
});
