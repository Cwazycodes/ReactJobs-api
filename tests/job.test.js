require('dotenv').config()

const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Job = require('../models/jobModel');

beforeAll(async () => {

  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Jobs API', () => {
  it('should add a new job', async () => {
    const newJob = {
      title: 'React Developer',
      type: 'Full-Time',
      description: 'Develop front-end applications.',
      location: 'London, UK',
      salary: '£60K - £70K',
      company: {
        name: 'Tech Corp',
        description: 'A tech company.',
        contactEmail: 'contact@techcorp.com',
        contactPhone: '555-555-5555'
      }
    };

    const res = await request(app).post('/api/jobs').send(newJob);
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('React Developer');
  });

  it('should get all jobs', async () => {
    const res = await request(app).get('/api/jobs');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should update a job', async () => {
    const job = await Job.create({
      title: 'Test Job',
      type: 'Full-Time',
      description: 'This is a test job.',
      location: 'London, UK',
      salary: '£50K - £60K',
      company: {
        name: 'Test Corp',
        description: 'A test company.',
        contactEmail: 'test@testcorp.com',
        contactPhone: '555-555-5555'
      }
    });

    const updatedJob = { ...job._doc, title: 'Updated Test Job' };
    const res = await request(app).put(`/api/jobs/${job._id}`).send(updatedJob);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated Test Job');
  });

  it('should delete a job', async () => {
    const job = await Job.create({
      title: 'Test Job to Delete',
      type: 'Full-Time',
      description: 'This job will be deleted.',
      location: 'London, UK',
      salary: '£50K - £60K',
      company: {
        name: 'Test Corp',
        description: 'A test company.',
        contactEmail: 'test@testcorp.com',
        contactPhone: '555-555-5555'
      }
    });

    const res = await request(app).delete(`/api/jobs/${job._id}`);
    expect(res.statusCode).toBe(200);
  });
});