require('dotenv').config();
const mongoose = require('mongoose');
const Job = require('./models/jobModel'); 

const jobs = [
    {
        "title": "Full-Stack Developer",
        "type": "Full-Time",
        "description": "We are seeking a Full-Stack Developer to join our dynamic team in London. You will be working on cutting-edge web applications.",
        "location": "London, UK",
        "salary": "£50K - £60K",
        "company": {
          "name": "Tech Innovators Ltd.",
          "description": "A leading tech company in the heart of London, specializing in web development and cloud solutions.",
          "contactEmail": "hr@techinnovators.co.uk",
          "contactPhone": "+44 20 1234 5678"
        }
      },
      {
        "title": "Data Scientist",
        "type": "Full-Time",
        "description": "Join our analytics team as a Data Scientist. You'll work with big data to generate actionable insights.",
        "location": "Manchester, UK",
        "salary": "£45K - £55K",
        "company": {
          "name": "Data Insights Ltd.",
          "description": "A fast-growing company focusing on data-driven solutions for businesses.",
          "contactEmail": "careers@datainsights.co.uk",
          "contactPhone": "+44 161 234 5678"
        }
      },
      {
        "title": "Product Manager",
        "type": "Full-Time",
        "description": "We are looking for an experienced Product Manager to lead the development of our flagship software product.",
        "location": "Birmingham, UK",
        "salary": "£60K - £70K",
        "company": {
          "name": "Innovate Solutions Ltd.",
          "description": "A leading provider of innovative software solutions, with a strong focus on user experience.",
          "contactEmail": "jobs@innovatesolutions.co.uk",
          "contactPhone": "+44 121 345 6789"
        }
      },
      {
        "title": "UX/UI Designer",
        "type": "Full-Time",
        "description": "We are seeking a creative UX/UI Designer to craft user-friendly interfaces for our web and mobile applications.",
        "location": "Leeds, UK",
        "salary": "£40K - £50K",
        "company": {
          "name": "Creative Designs Co.",
          "description": "A design-focused company known for creating visually appealing and intuitive user interfaces.",
          "contactEmail": "design@creativedesigns.co.uk",
          "contactPhone": "+44 113 456 7890"
        }
      },
      {
        "title": "DevOps Engineer",
        "type": "Full-Time",
        "description": "Join our team as a DevOps Engineer and help us streamline our development processes and infrastructure.",
        "location": "Bristol, UK",
        "salary": "£55K - £65K",
        "company": {
          "name": "Cloud Ops Ltd.",
          "description": "A company specializing in cloud infrastructure and DevOps solutions.",
          "contactEmail": "ops@cloudops.co.uk",
          "contactPhone": "+44 117 987 6543"
        }
      },
      {
        "title": "Cybersecurity Analyst",
        "type": "Full-Time",
        "description": "We are looking for a Cybersecurity Analyst to protect our systems from cyber threats.",
        "location": "Edinburgh, UK",
        "salary": "£50K - £60K",
        "company": {
          "name": "Secure Networks Ltd.",
          "description": "A top cybersecurity firm dedicated to providing robust security solutions to businesses.",
          "contactEmail": "security@securenetworks.co.uk",
          "contactPhone": "+44 131 234 5678"
        }
      },
      {
        "title": "Marketing Specialist",
        "type": "Full-Time",
        "description": "We're hiring a Marketing Specialist to lead our online and offline marketing campaigns.",
        "location": "Liverpool, UK",
        "salary": "£35K - £45K",
        "company": {
          "name": "Market Reach Ltd.",
          "description": "A marketing agency that helps brands reach their full potential through targeted campaigns.",
          "contactEmail": "jobs@marketreach.co.uk",
          "contactPhone": "+44 151 345 6789"
        }
      },
      {
        "title": "Software Engineer",
        "type": "Full-Time",
        "description": "We are looking for a Software Engineer to join our team in Sheffield. Work on exciting projects with a talented team.",
        "location": "Sheffield, UK",
        "salary": "£45K - £55K",
        "company": {
          "name": "Sheffield Software Ltd.",
          "description": "A software development company specializing in bespoke software solutions for various industries.",
          "contactEmail": "careers@sheffieldsoftware.co.uk",
          "contactPhone": "+44 114 345 6789"
        }
      }
 
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing jobs if you want to start fresh
    await Job.deleteMany({});
    console.log('Existing jobs removed');

    // Insert seed jobs
    await Job.insertMany(jobs);
    console.log('Jobs seeded successfully');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding data:', error);
    mongoose.connection.close();
  }
};

seedDatabase();