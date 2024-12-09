const express = require("express");
const router = express.Router();
const Course = require("../models/course");
const Application = require("../models/application");

// Student Dashboard: View Courses and Applications
router.get("/dashboard", async (req, res) => {
  try {
    // Fetch all courses
    const courses = await Course.find();

    // Fetch applications made by the logged-in student
    const applications = await Application.find({
      student: req.cookies.userId,
    }).populate("course");

    // Update application statuses for display
    const processedApplications = applications.map((app) => ({
      course: app.course,
      status:
        app.status === "instructor_approved"
          ? "Approved"
          : app.status === "committee_approved"
          ? "Pending Instructor Approval"
          : app.status === "denied"
          ? "Denied"
          : "Pending Committee Approval",
    }));

    // Render the dashboard with courses and processed applications
    res.render("dashboard", {
      courses,
      applications: processedApplications,
      role: "student",
    });
  } catch (error) {
    console.error("Error loading student dashboard:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Apply for a Course
// Apply for a Course
router.post("/apply", async (req, res) => {
  try {
    const { courseId, skills, resumeLink, phoneNumber } = req.body;

    // Validate input
    if (!courseId || !skills || !resumeLink || !phoneNumber) {
      return res.status(400).send("All fields are required.");
    }

    // Check if the student has already applied for this course
    const existingApplication = await Application.findOne({
      student: req.cookies.userId,
      course: courseId,
    });

    if (existingApplication) {
      return res.status(400).send("You have already applied for this course.");
    }

    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).send("Course not found.");
    }

    // Create a new application with additional details
    await Application.create({
      student: req.cookies.userId,
      course: courseId,
      skills,
      resumeLink,
      phoneNumber,
    });

    res.redirect("/student/dashboard");
  } catch (error) {
    console.error("Error applying for course:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
