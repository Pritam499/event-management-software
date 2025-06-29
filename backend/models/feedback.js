export default (sequelize, DataTypes) => {
  const Feedback = sequelize.define('Feedback', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    feedbackText: DataTypes.TEXT,
    shouldAttendFuture: DataTypes.BOOLEAN
  }, {
    tableName: 'feedbacks',
    timestamps: true
  });
  return Feedback;
};
