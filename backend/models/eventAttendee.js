export default (sequelize, DataTypes) => {
  const EventAttendee = sequelize.define('EventAttendee', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    isConfirmed: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    tableName: 'event_attendees',
    timestamps: false
  });
  return EventAttendee;
};
