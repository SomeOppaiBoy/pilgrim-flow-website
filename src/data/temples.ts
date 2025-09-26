export interface Temple {
  id: string;
  name: string;
  location: string;
  icon: string;
  crowdStatus: 'Low' | 'Moderate' | 'High';
  waitTime: string;
  openTime: string;
  closeTime: string;
  description: string;
  specialTimings: {
    name: string;
    time: string;
  }[];
  alerts: string[];
  lastUpdated: string;
}

export const temples: Temple[] = [
  {
    id: 'tirupati-balaji',
    name: 'Tirumala Venkateswara Temple',
    location: 'Tirupati, Andhra Pradesh',
    icon: '🕉️',
    crowdStatus: 'High',
    waitTime: '4-6 hours',
    openTime: '2:30 AM',
    closeTime: '1:00 AM (Next Day)',
    description: 'One of the most sacred temples dedicated to Lord Venkateswara, attracting millions of devotees annually.',
    specialTimings: [
      { name: 'Suprabhatam', time: '3:00 AM - 3:30 AM' },
      { name: 'Thomala Seva', time: '4:45 AM - 5:30 AM' },
      { name: 'Sahasra Deepalankara Seva', time: '7:00 PM - 7:30 PM' },
      { name: 'Ekanta Seva', time: '12:30 AM - 1:00 AM' }
    ],
    alerts: ['Heavy crowd expected during weekend', 'Online booking recommended'],
    lastUpdated: '2 mins ago'
  },
  {
    id: 'golden-temple',
    name: 'Harmandir Sahib (Golden Temple)',
    location: 'Amritsar, Punjab',
    icon: '🏛️',
    crowdStatus: 'Moderate',
    waitTime: '30-45 minutes',
    openTime: '3:00 AM',
    closeTime: '12:00 AM',
    description: 'The holiest Gurdwara of Sikhism, known for its golden dome and spiritual serenity.',
    specialTimings: [
      { name: 'Morning Prayer', time: '3:00 AM - 6:00 AM' },
      { name: 'Rehras Sahib', time: '6:00 PM - 7:00 PM' },
      { name: 'Kirtan Darbar', time: '9:00 PM - 10:00 PM' }
    ],
    alerts: ['Free langar available 24/7', 'Head covering mandatory'],
    lastUpdated: '5 mins ago'
  },
  {
    id: 'jagannath-puri',
    name: 'Jagannath Temple',
    location: 'Puri, Odisha',
    icon: '🛕',
    crowdStatus: 'Low',
    waitTime: '15-30 minutes',
    openTime: '5:00 AM',
    closeTime: '12:00 AM',
    description: 'Ancient temple dedicated to Lord Jagannath, famous for the annual Rath Yatra festival.',
    specialTimings: [
      { name: 'Mangal Arti', time: '5:00 AM - 6:00 AM' },
      { name: 'Bhog Mandap', time: '12:30 PM - 1:00 PM' },
      { name: 'Sandhya Arti', time: '7:00 PM - 8:00 PM' }
    ],
    alerts: ['Photography not allowed inside', 'Traditional attire preferred'],
    lastUpdated: '1 min ago'
  },
  {
    id: 'kedarnath',
    name: 'Kedarnath Temple',
    location: 'Kedarnath, Uttarakhand',
    icon: '⛰️',
    crowdStatus: 'Moderate',
    waitTime: '1-2 hours',
    openTime: '4:00 AM',
    closeTime: '7:00 PM',
    description: 'One of the twelve Jyotirlingas, situated at an altitude of 3,583m in the Himalayas.',
    specialTimings: [
      { name: 'Morning Arti', time: '4:00 AM - 5:00 AM' },
      { name: 'Abhishek', time: '6:00 AM - 7:00 AM' },
      { name: 'Evening Arti', time: '6:00 PM - 7:00 PM' }
    ],
    alerts: ['Temple closed during winter months', 'Weather dependent timings'],
    lastUpdated: '10 mins ago'
  },
  {
    id: 'vaishno-devi',
    name: 'Vaishno Devi Temple',
    location: 'Katra, Jammu & Kashmir',
    icon: '🏔️',
    crowdStatus: 'High',
    waitTime: '3-4 hours',
    openTime: '5:00 AM',
    closeTime: '12:00 AM',
    description: 'Sacred cave temple dedicated to Mata Vaishno Devi, requiring a 12km trek to reach.',
    specialTimings: [
      { name: 'Morning Arti', time: '5:30 AM - 6:30 AM' },
      { name: 'Noon Arti', time: '12:00 PM - 1:00 PM' },
      { name: 'Evening Arti', time: '7:00 PM - 8:00 PM' }
    ],
    alerts: ['Helicopter services available', 'Online registration mandatory'],
    lastUpdated: '3 mins ago'
  },
  {
    id: 'somnath',
    name: 'Somnath Temple',
    location: 'Somnath, Gujarat',
    icon: '🌊',
    crowdStatus: 'Low',
    waitTime: '20-30 minutes',
    openTime: '6:00 AM',
    closeTime: '9:00 PM',
    description: 'First of the twelve Jyotirlinga shrines, located on the shore of the Arabian Sea.',
    specialTimings: [
      { name: 'Morning Arti', time: '7:00 AM - 8:00 AM' },
      { name: 'Madhyan Arti', time: '12:00 PM - 12:30 PM' },
      { name: 'Sandhya Arti', time: '7:00 PM - 7:30 PM' }
    ],
    alerts: ['Sound and light show at 8 PM', 'Beach view available'],
    lastUpdated: '7 mins ago'
  },
  {
    id: 'meenakshi-temple',
    name: 'Meenakshi Amman Temple',
    location: 'Madurai, Tamil Nadu',
    icon: '🌺',
    crowdStatus: 'Moderate',
    waitTime: '45 minutes - 1 hour',
    openTime: '5:00 AM',
    closeTime: '12:30 AM',
    description: 'Historic Tamil temple dedicated to Meenakshi Devi and Lord Sundareswarar.',
    specialTimings: [
      { name: 'Kalasandhi', time: '6:30 AM - 7:15 AM' },
      { name: 'Uchikalam', time: '10:00 AM - 10:45 AM' },
      { name: 'Sayarakshai', time: '5:00 PM - 5:45 PM' }
    ],
    alerts: ['Colorful Gopuram architecture', 'Traditional South Indian customs'],
    lastUpdated: '4 mins ago'
  },
  {
    id: 'siddhivinayak',
    name: 'Siddhivinayak Temple',
    location: 'Mumbai, Maharashtra',
    icon: '🐘',
    crowdStatus: 'High',
    waitTime: '2-3 hours',
    openTime: '5:30 AM',
    closeTime: '10:00 PM',
    description: 'Renowned Ganesha temple in Mumbai, attracting devotees from across the world.',
    specialTimings: [
      { name: 'Morning Arti', time: '6:00 AM - 6:30 AM' },
      { name: 'Madhyan Arti', time: '12:00 PM - 12:30 PM' },
      { name: 'Sandhya Arti', time: '6:30 PM - 7:00 PM' }
    ],
    alerts: ['Tuesday rush expected', 'Online darshan available'],
    lastUpdated: '1 min ago'
  }
];