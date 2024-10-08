const Job = require("../models/jobModel");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const addJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    if (!ObjectId.isValid(jobId)) {
      return res.status(400).json({ error: "Invalid job ID format" });
    }

    const job = await Job.findByIdAndUpdate(new ObjectId(jobId), req.body, {
      new: true,
    });
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.status(200).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    if (!ObjectId.isValid(jobId)) {
      return res.status(400).json({ error: "Invalid job ID format" });
    }

    const job = await Job.findByIdAndDelete(new ObjectId(jobId));
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.status(200).json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getJobById = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw new Error("Invalid job ID format");
  }

  try {
    const job = await Job.findById(new ObjectId(id));
    return job;
  } catch (error) {
    throw error;
  }
};

module.exports = { addJob, getJobs, updateJob, deleteJob, getJobById };
