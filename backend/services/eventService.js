import { Event, User, EventAttendee } from "../models/index.js";
import { sendEmail } from "./emailService.js";
import { Op } from "sequelize";

// export const createEvent = async (creatorId, data) => {
//   const { title, date, time, place, agenda, reason, attendeeIds } = data;

//   // Validate time format (accepts both HH:mm and HH:mm:ss)
//   const isValidTime = (t) => /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/.test(t);
  
//   if (time && !isValidTime(time)) {
//     throw new Error("Invalid time format. Expected HH:mm or HH:mm:ss");
//   }

//   // Normalize to HH:mm:ss format
//   const normalizedTime = time 
//     ? (time.length === 5 ? `${time}:00` : time)
//     : null;

//   const event = await Event.create({
//     title,
//     date,
//     time: normalizedTime,
//     place,
//     agenda,
//     reason,
//     createdBy: creatorId,
//   });

//   await event.setAttendees(attendeeIds);

//   const cmo = await User.findOne({ where: { role: "cmo" } });
//   if (cmo) {
//     sendEmail(
//       cmo.email,
//       "New Event Pending",
//       `Event "${title}" needs your approval.`
//     );
//   }

//   return await Event.findByPk(event.id, {
//     include: [
//       { association: "creator", attributes: { exclude: ["password"] } },
//       { association: "attendees", attributes: { exclude: ["password"] } },
//     ],
//   });
// };

export const createEvent = async (creatorId, data) => {
  const { title, date, time, place, agenda, reason, attendeeIds } = data;

  // Validate and normalize time
  let normalizedTime = null;
  if (time) {
    // Remove any seconds if already present
    const baseTime = time.split(':').slice(0, 2).join(':');
    
    // Validate basic format
    if (!/^([01]?\d|2[0-3]):[0-5]\d$/.test(baseTime)) {
      throw new Error("Invalid time format. Expected HH:MM");
    }
    
    // Normalize to HH:MM:SS
    normalizedTime = `${baseTime}:00`;
  }

  const event = await Event.create({
    title,
    date,
    time: normalizedTime,
    place,
    agenda,
    reason,
    createdBy: creatorId,
  });

  await event.setAttendees(attendeeIds);

  const cmo = await User.findOne({ where: { role: "cmo" } });
  if (cmo) {
    sendEmail(cmo.email, "New Event Pending", `Event "${title}" needs your approval.`);
  }

  return await Event.findByPk(event.id, {
    include: [
      { association: "creator", attributes: { exclude: ["password"] } },
      { association: "attendees", attributes: { exclude: ["password"] } },
    ],
  });
};


export const listByRole = async (user) => {
  let where = {};

  if (user.role === "employee") {
    where = { createdBy: user.id };
  } else if (user.role === "cmo") {
    where = {
      status: {
        [Op.in]: [
          "pending",
          "rejected_by_cmo",
          "approved_by_cmo",
          "approved_by_ceo",
        ],
      },
    };
  } else if (user.role === "ceo") {
    where = { status: "approved_by_cmo" };
  }

  console.log("Current user role:", user.role, "Query filter:", where);


  return Event.findAll({
    where,
    include: [
      { association: "creator", attributes: { exclude: ["password"] } },
      { association: "attendees", attributes: { exclude: ["password"] } },
    ],
  });
};

export const updateStatus = async (user, eventId, status) => {
  const event = await Event.findByPk(eventId, {
    include: [
      { association: "creator", attributes: { exclude: ["password"] } },
      { association: "attendees", attributes: { exclude: ["password"] } },
    ],
  });

  if (!event) {
    throw new Error("Event not found");
  }

  const previousStatus = event.status;

if (user.role === 'ceo' && previousStatus !== 'approved_by_cmo') {
throw new Error('CEO can only act after CMO approval.');
}


  event.status = status;
  await event.save();

  if (user.role === "cmo") {
    if (status === "approved_by_cmo") {
      const ceo = await User.findOne({ where: { role: "ceo" } });
      if (ceo) {
        sendEmail(
          ceo.email,
          "Event for CEO Approval",
          `Event "${event.title}" is ready for your decision.`
        );
      }
    } else {
      if (event.creator) {
        sendEmail(
          event.creator.email,
          "Event Rejected by CMO",
          `Event "${event.title}" was rejected.`
        );
      }
    }
  }

  if (user.role === "ceo") {
    if (status === "approved_by_ceo") {
      await EventAttendee.update({ isConfirmed: true }, { where: { eventId } });
      await event.reload({
        include: [
          { association: "creator", attributes: { exclude: ["password"] } },
          { association: "attendees", attributes: { exclude: ["password"] } },
        ],
      });
      event.attendees.forEach((a) => {
        sendEmail(a.email, `You are confirmed for ${event.title}`, "");
      });
    } else {
      if (event.creator) {
        sendEmail(
          event.creator.email,
          "Event Rejected by CEO",
          `Event "${event.title}" was rejected.`
        );
      }
    }
  }

  return event;
};
