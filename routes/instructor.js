const express = require("express");
const router = express.Router();
const Application = require("../models/application");
const Course = require("../models/course");

// Instructor Dashboard
router.get("/dashboard", async (req, res) => {
  try {
    // Fetch applications that have been approved by the committee
    const applications = await Application.find({
      status: "committee_approved",
    }).populate("student course");

    res.render("instructor-dashboard", {
      applications, // Pass applications to the dashboard
      role: req.cookies.role || null,
    });
  } catch (error) {
    console.error("Error loading instructor dashboard:", error);
    res.status(500).render("error", {
      message: "Failed to load dashboard. Please try again later.",
    });
  }
});

// Approve or Deny Applications
router.post("/update-status", async (req, res) => {
  try {
    const { applicationId, status } = req.body;

    // Validate status value
    if (!["instructor_approved", "denied"].includes(status)) {
      return res.status(400).render("error", {
        message: "Invalid status value. Please select a valid status.",
      });
    }

    // Update the application's status in the database
    const updatedApplication = await Application.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true } // Return the updated document
    );

    if (!updatedApplication) {
      return res.status(404).render("error", {
        message: "Application not found. Unable to update status.",
      });
    }

    console.log(`Application ${applicationId} updated to status: ${status}`);
    res.redirect("/instructor/dashboard");
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).render("error", {
      message: "Failed to update application status. Please try again later.",
    });
  }
});

module.exports = router;
