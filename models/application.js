const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  skills: {
    type: String,
    required: true,
  },
  resumeLink: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "committee_approved", "instructor_approved", "denied"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Application", applicationSchema);
