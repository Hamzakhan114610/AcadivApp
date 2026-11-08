require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Auth Routes
app.use('/api/auth', authRoutes);


// ==========================================
// MONGODB CONNECTION
// ==========================================

const MONGO_URI = process.env.MONGO_URI;


// ==========================================
// INSTITUTION MODEL
// ==========================================

const institutionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  category: { type: String, required: true },
  programs: [String],
});

const Institution = mongoose.model('Institution', institutionSchema);


// ==========================================
// BULLETIN MODEL
// ==========================================

const bulletinSchema = new mongoose.Schema({
  tag: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: String, required: true },
});

const Bulletin = mongoose.model('Bulletin', bulletinSchema);


// ==========================================
// SEED INSTITUTIONS (Updated with New RIASEC Fields)
// ==========================================

const seedInstitutions = async () => {
  try {
    const initialInstitutions = [
      // 1. Software Engineering (RIASEC 'R')
      {
        name: 'Jawan Pakistan',
        city: 'Karachi',
        category: 'IT & Skills',
        programs: [
          'Software Engineering',
          'Mobile App Development',
          'Web Development',
          'Freelancing',
        ],
      },
      {
        name: 'Adamjee Government Science College',
        city: 'Karachi',
        category: 'Pre-Engineering & Science',
        programs: [
          'Software Engineering',
          'Pre-Engineering & Robotics',
          'Commerce & Accounting',
        ],
      },
      {
        name: 'NED University (CIS Department)',
        city: 'Karachi',
        category: 'University',
        programs: [
          'Software Engineering',
          'Artificial Intelligence & Data Science',
          'Mobile App Development',
        ],
      },

      // 2. Mobile App Development (RIASEC 'I')
      {
        name: 'Saylani Mass IT Training (SMIT)',
        city: 'Karachi',
        category: 'IT & Tech',
        programs: [
          'Mobile App Development',
          'Software Engineering',
          'Artificial Intelligence & Data Science',
        ],
      },

      // 3. Artificial Intelligence & Data Science (RIASEC 'A')
      {
        name: 'Habib University',
        city: 'Karachi',
        category: 'University',
        programs: [
          'Artificial Intelligence & Data Science',
          'UI/UX Design',
        ],
      },
      {
        name: 'NED University',
        city: 'Karachi',
        category: 'University',
        programs: [
          'Artificial Intelligence & Data Science',
        ],
      },

      // 4. Psychology & Social Work (RIASEC 'S')
      {
        name: 'University of Karachi (Department of Psychology)',
        city: 'Karachi',
        category: 'University',
        programs: [
          'Psychology & Social Work',
        ],
      },
      {
        name: 'IoBM (CBM)',
        city: 'Karachi',
        category: 'University',
        programs: [
          'Psychology & Social Work',
          'Commerce & Accounting',
        ],
      },

      // 5. UI/UX Design (RIASEC 'E')
      {
        name: 'Indus Valley School of Art and Architecture (IVS)',
        city: 'Karachi',
        category: 'Arts & Design',
        programs: [
          'UI/UX Design',
        ],
      },
      {
        name: 'Habib University',
        city: 'Karachi',
        category: 'University',
        programs: [
          'UI/UX Design',
        ],
      },

      // 6. Commerce & Accounting (RIASEC 'C')
      {
        name: 'Tabani’s School of Accountancy (TSA)',
        city: 'Karachi',
        category: 'Commerce & Accounting',
        programs: [
          'Commerce & Accounting',
          'ACCA',
          'CA',
        ],
      },
      {
        name: 'Government College of Commerce & Economics',
        city: 'Karachi',
        category: 'Commerce',
        programs: [
          'Commerce & Accounting',
        ],
      },
      {
        name: 'Institute of Business Administration (IBA)',
        city: 'Karachi',
        category: 'Business & Commerce',
        programs: [
          'Commerce & Accounting',
        ],
      },
    ];

    // Purana data clear karke naye list ke sath fresh seed kar do
    await Institution.deleteMany({});
    await Institution.insertMany(initialInstitutions);

    console.log('All institutions successfully re-seeded with new RIASEC fields!');
  } catch (error) {
    console.error('Institution seeding error:', error);
  }
};


// ==========================================
// SEED BULLETINS
// ==========================================

// ==========================================
// SEED BULLETINS (Expanded with More Data)
// ==========================================

const seedBulletins = async () => {
  try {
    const initialBulletins = [
      {
        tag: 'ADMISSIONS',
        title: 'Admissions Open for Fall Semester',
        description: 'Top universities and colleges in Karachi have announced admissions for Software Engineering, Mobile App, and AI programs.',
        date: 'Nov 2026',
      },
      {
        tag: 'SCHOLARSHIP',
        title: 'Sindh Board Merit Scholarships Announced',
        description: 'HEC and provincial government have launched fully-funded scholarship programs for high-achieving intermediate students.',
        date: 'Nov 2026',
      },
      {
        tag: 'EVENTS',
        title: 'National Coding & App Hackathon',
        description: 'Register now for the upcoming student hackathon. Build full-stack web or mobile solutions and win cash prizes.',
        date: 'Oct 2026',
      },
      {
        tag: 'TRAINING',
        title: 'UI/UX Design & Creative Arts Bootcamp',
        description: 'Free vocational training workshops are now open at leading skill centers across Karachi for youth career development.',
        date: 'Oct 2026',
      },
      {
        tag: 'SEMINAR',
        title: 'Commerce & CA Career Guidance Seminar',
        description: 'Expert financial consultants and chartered accountants will guide students on modern accounting pathways and ACCA/CA roadmaps.',
        date: 'Sep 2026',
      },
    ];

    // Purane bulletins clear karke naye fresh aur zyada data ke sath seed kar do
    await Bulletin.deleteMany({});
    await Bulletin.insertMany(initialBulletins);
    
    console.log('Expanded bulletins successfully seeded!');
  } catch (error) {
    console.error('Bulletin seeding error:', error);
  }
};


// ==========================================
// GET INSTITUTIONS (With Regex Query Support)
// ==========================================

app.get('/api/institutions', async (req, res) => {
  try {
    const { program } = req.query;
    let query = {};

    if (program) {
      query.programs = { $regex: new RegExp(program.trim(), 'i') };
    }

    const institutions = await Institution.find(query);

    res.json({
      success: true,
      data: institutions,
    });
  } catch (error) {
    console.error('Fetch Institutions Error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to fetch institutions.',
    });
  }
});


// ==========================================
// GET BULLETINS
// ==========================================

app.get('/api/bulletins', async (req, res) => {
  try {
    const bulletins = await Bulletin.find();

    res.json({
      success: true,
      data: bulletins,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Unable to fetch bulletins.',
    });
  }
});


// ==========================================
// TEST ROUTE
// ==========================================

app.get('/', (req, res) => {
  res.send('ACADIV Backend is Running!');
});


// ==========================================
// START SERVER
// ==========================================

const startServer = async () => {
  try {
    if (!MONGO_URI) {
      throw new Error('MONGO_URI is missing from .env file');
    }

    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Successfully Connected!');

    await seedInstitutions();
    await seedBulletins();

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`ACADIV Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error('Server startup error:', error.message);
    process.exit(1);
  }
};

startServer();