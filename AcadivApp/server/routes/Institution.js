const router = require('express').Router();
const Institution = require('../models/Institution');

// Smart Filtering Route (Category aur City ke base par institutions laane ke liye)
router.get('/filter', async (req, res) => {
  try {
    const { category, city } = req.query;
    let query = {};

    if (category) query.category = category;
    if (city) query.city = city;

    // Featured (Jawan Pakistan prioritized) pehle show honge
    const institutions = await Institution.find(query).sort({ isFeatured: -1 });

    res.json({ success: true, institutions });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Seed Initial Data (Jawan Pakistan & Karachi Institutions)
router.post('/seed', async (req, res) => {
  try {
    await Institution.deleteMany({}); // Purana data clear karne ke liye

    const sampleInstitutions = [
      {
        name: 'Jawan Pakistan Program',
        programs: ['Web Development', 'Mobile App Development', 'Graphic Designing', 'Freelancing'],
        city: 'Karachi',
        category: 'IT',
        deepLinkUrl: 'https://jawankistan.com', // Example deep link
        isFeatured: true
      },
      {
        name: 'Saylani Mass IT Training (SMIT)',
        programs: ['Web and Mobile App Development', 'Python & AI', 'CCNA', 'UI/UX Design'],
        city: 'Karachi',
        category: 'IT',
        deepLinkUrl: 'https://www.saylaniitmass.com',
        isFeatured: true
      },
      {
        name: 'NED University (CEP / IT Courses)',
        programs: ['Software Engineering', 'Data Science', 'Cyber Security'],
        city: 'Karachi',
        category: 'IT',
        isFeatured: false
      }
    ];

    await Institution.insertMany(sampleInstitutions);
    res.status(201).json({ success: true, message: 'Institutions data seeded successfully with Jawan Pakistan!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;