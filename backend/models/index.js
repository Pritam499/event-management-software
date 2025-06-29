import { DataTypes } from 'sequelize';
import sequelize from '../config/config.js';

import defineUser from './user.js';
import defineEvent from './event.js';
import defineEventAttendee from './eventAttendee.js';
import defineFeedback from './feedback.js';

const User = defineUser(sequelize, DataTypes);
const Event = defineEvent(sequelize, DataTypes);
const EventAttendee = defineEventAttendee(sequelize, DataTypes);
const Feedback = defineFeedback(sequelize, DataTypes);

// Associations
User.hasMany(Event, { foreignKey: 'createdBy', as: 'createdEvents' });
Event.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

Event.belongsToMany(User, {
  through: EventAttendee,
  foreignKey: 'eventId',
  otherKey: 'userId',
  as: 'attendees'
});
User.belongsToMany(Event, {
  through: EventAttendee,
  foreignKey: 'userId',
  otherKey: 'eventId',
  as: 'events'
});

Event.hasMany(Feedback, { foreignKey: 'eventId', as: 'feedbacks' });
Feedback.belongsTo(Event, { foreignKey: 'eventId', as: 'event' });
Feedback.belongsTo(User, { foreignKey: 'attendeeId', as: 'attendee' });

export { sequelize, User, Event, EventAttendee, Feedback };