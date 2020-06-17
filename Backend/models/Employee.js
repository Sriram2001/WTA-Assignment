const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  email: { type: String, default: "" },
  salary: { type: Number, required: true },
  appraised: { type: Boolean, default: false },
  productivity: { type: Number, default: 0 },
  attendance: { type: Number, default: 0 },
  qualityOfWork: { type: Number, default: 0 },
  targetAchievement: { type: Number, default: 0 },
  review: { type: String, default: "" },
});

module.exports = mongoose.model("Employees", EmployeeSchema);
