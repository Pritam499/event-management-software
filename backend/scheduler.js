import cron from 'node-cron';
import { Op } from 'sequelize';
import { Event, EventAttendee, User } from './models/index.js';
import { sendEmail } from './services/emailService.js';

cron.schedule('0 0 * * *', async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const events = await Event.findAll({
    where: {
      date: { [Op.lt]: today },
      feedbackSent: false
    },
    include: ['attendees']
  });

  for (const e of events) {
    e.attendees.forEach(a => {
      sendEmail(a.email, 'Feedback Request', `Provide feedback for ${e.title}`);
    });
    e.feedbackSent = true;
    await e.save();
  }
});
