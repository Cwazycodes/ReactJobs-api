const express = require("express");
const {
  addJob,
  getJobs,
  updateJob,
  deleteJob,
  getJobById,
} = require("../controllers/jobController");
const router = express.Router();

router.post("/jobs", addJob);
router.get("/jobs", getJobs);
router.get("/jobs/:id", async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await getJobById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
router.put("/jobs/:id", updateJob);
router.delete("/jobs/:id", deleteJob);

module.exports = router;
