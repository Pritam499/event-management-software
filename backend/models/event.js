export default (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: DataTypes.STRING,
      date: DataTypes.DATEONLY,
      // time: DataTypes.TIME,
      // time: {
      //   type: DataTypes.TIME,
      //   get() {
      //     const rawValue = this.getDataValue("time");
      //     return rawValue ? rawValue.substring(0, 5) : null; // Return HH:mm format
      //   },
      //   set(value) {
      //     if (value && !value.includes(":")) {
      //       throw new Error("Invalid time format");
      //     }
      //     // Store as HH:mm:ss
      //     this.setDataValue("time", value ? `${value}:00` : null);
      //   },
      // },
      // In your Event model
time: {
  type: DataTypes.TIME,
  get() {
    const rawValue = this.getDataValue('time');
    // Return as HH:MM when accessing
    return rawValue ? rawValue.substring(0, 5) : null;
  },
  set(value) {
    if (!value) {
      this.setDataValue('time', null);
      return;
    }
    
    // Ensure value is in HH:MM or HH:MM:SS format
    const timeRegex = /^([01]?\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?$/;
    if (!timeRegex.test(value)) {
      throw new Error('Invalid time format. Use HH:MM or HH:MM:SS');
    }
    
    // Always store as HH:MM:SS
    const parts = value.split(':');
    const normalized = parts.length === 2 
      ? `${value}:00` 
      : value;
    
    this.setDataValue('time', normalized);
  }
},
      place: DataTypes.STRING,
      agenda: DataTypes.TEXT,
      reason: DataTypes.TEXT,
      status: {
        type: DataTypes.ENUM(
          "pending",
          "approved_by_cmo",
          "rejected_by_cmo",
          "approved_by_ceo",
          "rejected_by_ceo"
        ),
        defaultValue: "pending",
      },
      feedbackSent: { type: DataTypes.BOOLEAN, defaultValue: false },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "events",
      timestamps: true,
    }
  );

  return Event;
};
