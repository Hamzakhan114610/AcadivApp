export interface Institute {
  id: string;
  name: string;
  type: string;
  category: 'Government' | 'Private' | 'Courses';
  fee: string;
  admissionDate: string;
  location: string;
  badge: string;
  websiteUrl: string; // 🌐 Added official website URL property
}

export const allInstitutes: Institute[] = [
  // 🌟 COURSES (Jawan Pakistan Top Priority)
  {
    id: 'jp-01',
    name: 'Jawan Pakistan (IT & Tech Initiative)',
    type: 'Web & Mobile App Dev, Python AI, Cloud Computing',
    category: 'Courses',
    fee: 'Free / Subsidized',
    admissionDate: 'Admissions Open',
    location: 'Karachi & Online',
    badge: '⭐ Top Recommended',
    websiteUrl: 'https://jawanpakistan.com',
  },
  {
    id: 'jp-02',
    name: 'Jawan Pakistan Skills Program',
    type: 'Graphic Design, UI/UX & Freelancing',
    category: 'Courses',
    fee: 'Free / Subsidized',
    admissionDate: 'Batch 2026 Open',
    location: 'Karachi & Online',
    badge: 'Popular',
    websiteUrl: 'https://jawanpakistan.com',
  },
  {
    id: 'c-01',
    name: 'Saylani Mass IT Training (SMIT)',
    type: 'Web Development & AI Courses',
    category: 'Courses',
    fee: 'Free (Scholarship)',
    admissionDate: 'Quarterly Intake',
    location: 'Karachi (Multiple Campuses)',
    badge: 'Recommended',
    websiteUrl: 'https://www.saylaniwelfare.com',
  },
  {
    id: 'c-02',
    name: 'Aptech Computer Education',
    type: 'Software Engineering Diploma',
    category: 'Courses',
    fee: 'PKR 8,000 - 15,000 / month',
    admissionDate: 'Rolling Admissions',
    location: 'Multiple Branches, Karachi',
    badge: 'Private Diploma',
    websiteUrl: 'https://aptech-pakistan.com',
  },

  // 🏛️ GOVERNMENT COLLEGES
  {
    id: 'g-01',
    name: 'DJ Sindh Government Science College',
    type: 'Pre-Engineering / ICS / Pre-Medical',
    category: 'Government',
    fee: 'Nominal Board Fee (~PKR 2,000/yr)',
    admissionDate: 'August - September (SECCAP)',
    location: 'Saddar, Karachi',
    badge: 'Merit High',
    websiteUrl: 'https://seccap.dgcs.gos.pk',
  },
  {
    id: 'g-02',
    name: 'Government College of Commerce & Economics',
    type: 'I.Com / Commerce',
    category: 'Government',
    fee: 'Nominal Board Fee (~PKR 2,000/yr)',
    admissionDate: 'August - September (SECCAP)',
    location: 'Near PIDC, Karachi',
    badge: 'Top Commerce',
    websiteUrl: 'https://seccap.dgcs.gos.pk',
  },
  {
    id: 'g-03',
    name: 'Adamjee Government Science College',
    type: 'Pre-Engineering / ICS',
    category: 'Government',
    fee: 'Nominal Board Fee (~PKR 2,000/yr)',
    admissionDate: 'August - September (SECCAP)',
    location: 'Business Recorder Road, Karachi',
    badge: 'Merit Top',
    websiteUrl: 'https://seccap.dgcs.gos.pk',
  },

  // 🏢 PRIVATE INSTITUTES
  {
    id: 'p-01',
    name: 'PECHS Education Foundation College',
    type: 'ICS / Pre-Engineering / Pre-Medical',
    category: 'Private',
    fee: 'PKR 12,000 - 18,000 / month',
    admissionDate: 'June - August',
    location: 'PECHS Block 2, Karachi',
    badge: 'Private Grade A',
    websiteUrl: 'https://pechs.edu.pk',
  },
  {
    id: 'p-02',
    name: 'Commecs College',
    type: 'ICS / Commerce / Pre-Engineering',
    category: 'Private',
    fee: 'PKR 20,000 - 30,000 / month',
    admissionDate: 'May - July',
    location: 'Gulistan-e-Johar, Karachi',
    badge: 'Top Private',
    websiteUrl: 'https://commecscollege.edu.pk',
  },
];