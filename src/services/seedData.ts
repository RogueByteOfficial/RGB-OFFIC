import { AboutInfo, Application, Banner, GeneralSettings, Project, Service, SocialLinks } from '../types';

export const initialSettings: GeneralSettings = {
  siteName: {
    en: 'NS GROUP Technologies',
    ar: 'مجموعة إن إس للتقنية'
  },
  companyName: {
    en: 'NS GROUP Technologies Inc.',
    ar: 'شركة إن إس جروب للتقنيات'
  },
  logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
  faviconUrl: '',
  email: 'contact@nsgrouptech.com',
  phone: '+966 50 123 4567',
  whatsapp: '+966501234567',
  address: {
    en: 'King Fahd Road, Digital Business District, Riyadh, Saudi Arabia',
    ar: 'طريق الملك فهد، حي الأعمال الرقمي، الرياض، المملكة العربية السعودية'
  },
  defaultLanguage: 'en',
  theme: 'system',
  seo: {
    metaTitle: {
      en: 'NS GROUP Technologies | Enterprise Digital Solutions & Apps',
      ar: 'مجموعة إن إس للتقنية | حلول رقمية وتطبيقات متقدمة'
    },
    metaDescription: {
      en: 'We build the future with top-tier mobile applications, web engineering, cloud infrastructure, and intelligent business systems.',
      ar: 'نحن نصنع التقنية من أجل المستقبل. شركة متخصصة في تطوير التطبيقات والحلول الرقمية المبتكرة للشركات والأفراد.'
    },
    keywords: 'technology, mobile apps, web development, cloud solutions, ERP, Saudi Arabia, tech enterprise',
    ogImageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&auto=format&fit=crop&q=80'
  },
  social: {
    facebook: 'https://facebook.com/nsgrouptech',
    twitter: 'https://x.com/nsgrouptech',
    instagram: 'https://instagram.com/nsgrouptech',
    linkedin: 'https://linkedin.com/company/nsgrouptech',
    github: 'https://github.com/nsgrouptech',
    youtube: 'https://youtube.com/@nsgrouptech',
    whatsapp: 'https://wa.me/966501234567',
    telegram: 'https://t.me/nsgrouptech'
  }
};

export const initialBanners: Banner[] = [
  {
    id: 'banner-1',
    title: {
      en: 'We Build the Future with Precision',
      ar: 'نحن نصنع التقنية من أجل المستقبل'
    },
    subtitle: {
      en: 'NS Group Technologies is an elite tech enterprise specialized in developing innovative apps and digital systems.',
      ar: 'إن إس جروب هي شركة تقنية متخصصة في تطوير التطبيقات والحلول الرقمية المبتكرة للشركات والأفراد.'
    },
    description: {
      en: 'Transforming complex challenges into elegant, high-impact digital experiences across mobile, cloud, and enterprise architecture.',
      ar: 'نحول الأفكار المعقدة إلى حلول برمجية ذكية وتطبيقات رائدة تدفع أعمالكم نحو الريادة العالمية.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80',
    badge: {
      en: 'Next-Gen Engineering',
      ar: 'هندسة المستقبل'
    },
    buttonText: {
      en: 'Explore Our Work',
      ar: 'استكشف أعمالنا'
    },
    buttonLink: '/applications',
    secondaryButtonText: {
      en: 'Contact Us',
      ar: 'تواصل معنا'
    },
    secondaryButtonLink: '/contact',
    order: 1,
    isActive: true
  },
  {
    id: 'banner-2',
    title: {
      en: 'Scalable Cloud & Intelligent Enterprise Systems',
      ar: 'حلول سحابية متقدمة وأنظمة ذكية للأعمال'
    },
    subtitle: {
      en: 'Robust backend architecture, high availability, and real-time enterprise management suites.',
      ar: 'بنية تحتية سحابية مرنة وفائقة الأمان تضمن استمرارية وتوسع أعمالك بلا حدود.'
    },
    description: {
      en: 'Accelerate your digital operations with automated workflows, cloud-native security, and microservices.',
      ar: 'ارتقِ بكفاءة مؤسستك عبر أتمتة العمليات ودمج الذكاء الاصطناعي مع أعلى معايير الحماية.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
    badge: {
      en: 'Enterprise Solutions',
      ar: 'حلول المؤسسات'
    },
    buttonText: {
      en: 'Our Services',
      ar: 'خدماتنا'
    },
    buttonLink: '/services',
    secondaryButtonText: {
      en: 'Book Consultation',
      ar: 'احجز استشارة'
    },
    secondaryButtonLink: '/contact',
    order: 2,
    isActive: true
  },
  {
    id: 'banner-3',
    title: {
      en: 'Crafting Award-Winning Mobile Experiences',
      ar: 'تطوير تطبيقات جوال استثنائية وعالمية'
    },
    subtitle: {
      en: 'Native iOS & Android apps designed for speed, intuitive interaction, and millions of users.',
      ar: 'تطبيقات iOS و Android فائقة السرعة بتجربة مستخدم لا تضاهى وأحدث التقنيات.'
    },
    description: {
      en: 'From concept to App Store deployment, we engineer mobile software that users love and trust.',
      ar: 'من الفكرة حتى النشر، نصنع تطبيقات حازت على ثقة مئات الآلاف من المستخدمين.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&auto=format&fit=crop&q=80',
    badge: {
      en: 'Mobile Ecosystem',
      ar: 'منظومة التطبيقات'
    },
    buttonText: {
      en: 'Discover Apps',
      ar: 'اكتشف التطبيقات'
    },
    buttonLink: '/applications',
    secondaryButtonText: {
      en: 'Portfolio',
      ar: 'المشاريع'
    },
    secondaryButtonLink: '/projects',
    order: 3,
    isActive: true
  }
];

export const initialAbout: AboutInfo = {
  companyName: {
    en: 'NS GROUP Technologies',
    ar: 'مجموعة إن إس للتقنية'
  },
  tagline: {
    en: 'Engineering the digital future for ambitious organizations',
    ar: 'نهندس المستقبل الرقمي للمؤسسات الرائدة'
  },
  bio: {
    en: 'NS GROUP Technologies is a leading software engineering and technology consulting company. We specialize in designing and delivering high-impact mobile applications, enterprise web platforms, secure cloud architectures, and digital transformation solutions.',
    ar: 'إن إس جروب هي شركة رائدة في هندسة البرمجيات والحلول الرقمية المتقدمة. نتخصص في ابتكار وبناء تطبيقات الجوال المتميزة، والمنصات السحابية المتكاملة، وأنظمة إدارة الأعمال التي تدعم التحول الرقمي الشامل.'
  },
  story: {
    en: 'Founded by senior software architects with a vision to build globally competitive digital products, NS GROUP has grown into an engineering powerhouse trusted by leading enterprises and forward-thinking startups.',
    ar: 'تأسست الشركة على أيدي نخبة من مهندسي البرمجيات بهدف بناء منتجات رقمية بمواصفات عالمية، وتطورت لتصبح شريكاً تقنياً موثوقاً لأبرز المؤسسات والشركات الناشئة.'
  },
  vision: {
    en: 'To be the premier digital innovation partner recognized globally for building mission-critical software and intuitive applications that enrich people lives.',
    ar: 'أن نكون الشريك التقني الأول في الابتكار الرقمي على المستوى الإقليمي والعالمي عبر تقديم برمجيات عالية الجودة وموثوقة.'
  },
  mission: {
    en: 'Empowering businesses and individuals through cutting-edge technology, human-centric design, and relentless dedication to software engineering excellence.',
    ar: 'تمكين الشركات والأفراد من خلال تقنيات مبتكرة، وتصميم يركز على تجربة المستخدم، والتزام تام بأعلى معايير الجودة البرمجية.'
  },
  values: [
    {
      title: { en: 'Engineering Excellence', ar: 'التميز الهندسي' },
      desc: { en: 'We adhere to the highest code quality, performance benchmarks, and security standards.', ar: 'نلتزم بأعلى معايير جودة الكود، الأداء العالي، والحماية الرقمية المتكاملة.' },
      icon: 'ShieldCheck'
    },
    {
      title: { en: 'User-Centric Design', ar: 'التصميم المرتكز على الإنسان' },
      desc: { en: 'Every interface is engineered for seamless intuition, accessibility, and elegance.', ar: 'نصمم واجهات سهلة، سلسة، وعصرية تحقق أعلى مستويات التفاعل والرضا.' },
      icon: 'Sparkles'
    },
    {
      title: { en: 'Continuous Innovation', ar: 'الابتكار المستمر' },
      desc: { en: 'We constantly integrate emerging technologies to keep our clients ahead of the curve.', ar: 'نواكب أحدث التطورات التقنية والذكاء الاصطناعي لضمان تفوق عملائنا.' },
      icon: 'Zap'
    },
    {
      title: { en: 'Integrity & Transparency', ar: 'النزاهة والشفافية' },
      desc: { en: 'Honest collaboration, transparent delivery timelines, and genuine long-term partnerships.', ar: 'شراكات مبنية على الثقة، والالتزام بالمواعيد، والوضوح الكامل في كل مرحلة.' },
      icon: 'HeartHandshake'
    }
  ],
  experienceYears: 8,
  completedProjects: 65,
  satisfiedClients: 120,
  expertTeam: 24,
  heroImageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80'
};

export const initialServices: Service[] = [
  {
    id: 'service-1',
    title: {
      en: 'Mobile App Development',
      ar: 'تطوير تطبيقات الجوال'
    },
    description: {
      en: 'Native iOS & Android and high-performance cross-platform mobile apps engineered with modern tech stacks.',
      ar: 'تطوير تطبيقات iOS و Android بأحدث التقنيات وبأعلى معايير السرعة والاستقرار.'
    },
    icon: 'Smartphone',
    order: 1,
    isActive: true,
    features: [
      { en: 'iOS & Android Native Performance', ar: 'أداء فائق على نظامي iOS و Android' },
      { en: 'Modern UI/UX Micro-interactions', ar: 'تصميم تجربة مستخدم عصرية وسلسة' },
      { en: 'Offline Synchronization & Push Notifications', ar: 'مزامنة بدون إنترنت وإشعارات ذكية' }
    ]
  },
  {
    id: 'service-2',
    title: {
      en: 'Web Application Engineering',
      ar: 'تطوير المواقع والمنصات'
    },
    description: {
      en: 'Responsive, fast, and secure web applications built using React, Next.js, and cloud-native backends.',
      ar: 'تصميم وتطوير مواقع سريعة ومتجاوبة مع جميع الأجهزة بأحدث أطر العمل الحديثة.'
    },
    icon: 'Globe',
    order: 2,
    isActive: true,
    features: [
      { en: 'Single Page & Server-Rendered Apps', ar: 'تطبيقات ويب فائقة السرعة ومتجاوبة' },
      { en: 'SEO Optimized & Accessible', ar: 'مهيأة لمحركات البحث ومتوافقة كلياً' },
      { en: 'PWA Support for Mobile Installation', ar: 'دعم تطبيقات الويب التقدمية (PWA)' }
    ]
  },
  {
    id: 'service-3',
    title: {
      en: 'Business Management Systems',
      ar: 'أنظمة إدارة الأعمال'
    },
    description: {
      en: 'Custom ERP, CRM, and bespoke workflow management systems to streamline your operations.',
      ar: 'حلول برمجية متكاملة لإدارة أعمالك وموظفيك ومبيعاتك بكفاءة وسهولة تامة.'
    },
    icon: 'Monitor',
    order: 3,
    isActive: true,
    features: [
      { en: 'Custom CRM & Resource Planning', ar: 'إدارة علاقات العملاء والموارد' },
      { en: 'Automated Invoicing & Reporting', ar: 'فواتير وتقارير مالية مؤتمتة' },
      { en: 'Role-Based Access & Audit Logs', ar: 'صلاحيات مخصصة وسجلات تدقيق' }
    ]
  },
  {
    id: 'service-4',
    title: {
      en: 'Cloud & DevOps Solutions',
      ar: 'الحلول السحابية'
    },
    description: {
      en: 'Secure, scalable cloud infrastructures, automated CI/CD pipelines, and microservices architecture.',
      ar: 'نقدم حلول سحابية آمنة ومرنة لتطوير واستضافة أعمالك وتوسيعها بدون توقف.'
    },
    icon: 'Cloud',
    order: 4,
    isActive: true,
    features: [
      { en: 'GCP, AWS & Firebase Architecture', ar: 'بنى تحتية سحابية متقدمة وآمنة' },
      { en: 'Automated CI/CD Deployments', ar: 'نشر برمجي مؤتمت وفوري' },
      { en: 'High Availability & 99.99% Uptime', ar: 'جاهزية عالية وحماية ضد التوقف' }
    ]
  },
  {
    id: 'service-5',
    title: {
      en: 'Data Analytics & AI Solutions',
      ar: 'تحليل البيانات والذكاء الاصطناعي'
    },
    description: {
      en: 'Transform raw data into actionable visual insights and integrate AI models into your workflows.',
      ar: 'تحويل بياناتك إلى رؤى ذكية ومؤشرات تفاعلية لمساعدتك في اتخاذ قرارات دقيقة.'
    },
    icon: 'TrendingUp',
    order: 5,
    isActive: true,
    features: [
      { en: 'Real-Time Interactive Dashboards', ar: 'لوحات تحكم تفاعلية لحظية' },
      { en: 'Predictive Analytics & KPI Tracking', ar: 'تحليلات تنبؤية وتتبع مؤشرات الأداء' },
      { en: 'LLM & AI Workflow Integrations', ar: 'دمج نماذج الذكاء الاصطناعي والتعلم الآلي' }
    ]
  },
  {
    id: 'service-6',
    title: {
      en: 'Technical Support & Maintenance',
      ar: 'الدعم الفني والصيانة'
    },
    description: {
      en: '24/7 technical monitoring, security patches, regular updates, and continuous platform maintenance.',
      ar: 'دعم فني مستمر وصيانة دورية وتحديثات أمنية لضمان استمرارية عملك بكفاءة.'
    },
    icon: 'Headphones',
    order: 6,
    isActive: true,
    features: [
      { en: '24/7 Emergency Incident Response', ar: 'استجابة فورية لحالات الطوارئ التقنية' },
      { en: 'Regular Security & Vulnerability Audits', ar: 'تدقيق أمني دوري وتحديثات وقائية' },
      { en: 'Continuous Performance Optimization', ar: 'تحسين مستمر لسرعة واستجابة الأنظمة' }
    ]
  }
];

export const initialApplications: Application[] = [
  {
    id: 'app-ns-cars',
    name: {
      en: 'NS Cars',
      ar: 'NS Cars'
    },
    logoUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=200&auto=format&fit=crop&q=80',
    coverImageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1000&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&auto=format&fit=crop&q=80'
    ],
    shortDesc: {
      en: 'Leading car rental & fleet booking application with seamless vehicle selection and instant payments.',
      ar: 'تطبيق تأجير السيارات الأول في المنطقة. تجربة سهلة وسريعة لحجز وإدارة أسطول السيارات.'
    },
    fullDesc: {
      en: 'NS Cars provides a comprehensive car rental and fleet management experience. Users can browse thousands of verified luxury, family, and economy vehicles with instant geolocation tracking, digital contract signing, and integrated multi-currency digital payment gateways.',
      ar: 'يقدم تطبيق NS Cars حلاً متكاملاً لحجز واستئجار وإدارة أساطيل السيارات. يتيح للمستخدمين البحث وحجز السيارات الفاخرة والعائلية والاقتصادية مع تتبع حي بالموقع وتوقيع العقود إلكترونياً والدفع الفوري الآمن.'
    },
    features: [
      { en: 'Instant Vehicle Booking & Keyless Access', ar: 'حجز فوري للسيارات وفتح بدون مفتاح' },
      { en: 'Real-time GPS Tracking & Telematics', ar: 'تتبع جغرافي لحظي وحالة السيارة' },
      { en: 'Digital Contract & ID Verification', ar: 'توثيق الهوية والعقود الرقمية' },
      { en: 'Apple Pay & Credit Card Integration', ar: 'دعم Apple Pay والبطاقات الائتمانية' }
    ],
    technologies: ['Flutter', 'Node.js', 'Firebase', 'Google Maps API', 'Stripe'],
    version: '2.4.1',
    releaseDate: '2025-11-10',
    status: 'live',
    googlePlayUrl: 'https://play.google.com/store',
    appStoreUrl: 'https://apple.com/app-store',
    websiteUrl: 'https://example.com/nscars',
    order: 1,
    isFeatured: true,
    isActive: true
  },
  {
    id: 'app-ns-player',
    name: {
      en: 'NS Player',
      ar: 'NS Player'
    },
    logoUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=200&auto=format&fit=crop&q=80',
    coverImageUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1000&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80'
    ],
    shortDesc: {
      en: 'Ultra-fast media and 4K video player with wide format decoding, subtitles engine, and casting.',
      ar: 'مشغل فيديو متطور يدعم جميع الصيغ وتجربة مشاهدة فائقة الجودة والسرعة.'
    },
    fullDesc: {
      en: 'NS Player is an advanced hardware-accelerated media player supporting 4K/8K playback, multi-track audio, auto subtitle downloads, streaming network protocols, and background picture-in-picture mode.',
      ar: 'مشغل وسائط فائق التطور يدعم تشغيل الفيديو بدقة 4K و 8K مع دعم فك التشفير بالعتاد، وتنزيل الترجمات التلقائية، وبث الفيديو عبر الشبكة، وتعدد المسارات الصوتية.'
    },
    features: [
      { en: 'Hardware Accelerated 4K/8K Playback', ar: 'تسريع تشغيل الفيديو بدقة 4K/8K' },
      { en: 'Universal Codec & Subtitle Support', ar: 'دعم جميع صيغ الفيديو والترجمات' },
      { en: 'Chromecast & AirPlay Casting', ar: 'بث الشاشة عبر Chromecast و AirPlay' },
      { en: 'Gesture-based Brightness & Volume Control', ar: 'تحكم ذكي بالإيماءات في الصوت والسطوع' }
    ],
    technologies: ['Swift', 'Kotlin', 'FFmpeg', 'C++', 'WebRTC'],
    version: '3.1.0',
    releaseDate: '2026-01-15',
    status: 'live',
    googlePlayUrl: 'https://play.google.com/store',
    appStoreUrl: 'https://apple.com/app-store',
    websiteUrl: 'https://example.com/nsplayer',
    order: 2,
    isFeatured: true,
    isActive: true
  },
  {
    id: 'app-ns-hr',
    name: {
      en: 'NS HR Enterprise',
      ar: 'NS HR'
    },
    logoUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&auto=format&fit=crop&q=80',
    coverImageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1000&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=800&auto=format&fit=crop&q=80'
    ],
    shortDesc: {
      en: 'Comprehensive Human Resource Management system for tracking attendance, payroll, and performance.',
      ar: 'نظام إدارة الموارد البشرية المتكامل لإدارة الموظفين والرواتب والحضور والإجازات.'
    },
    fullDesc: {
      en: 'NS HR is a modern enterprise workforce management platform featuring geofenced mobile attendance check-in, automated payroll calculations, leave requests workflow, and performance appraisal dashboards.',
      ar: 'منصة إدارة الموارد البشرية المتكاملة، تشمل تسجيل الحضور والانصراف بالبصمة والموقع الجغرافي، وإدارة مسيرات الرواتب، وطلبات الإجازات المؤتمتة، وتقييم أداء الكوادر.'
    },
    features: [
      { en: 'Geofenced Biometric Check-in', ar: 'تسجيل حضور جغرافي وبالبصمة' },
      { en: 'Automated Payroll & Tax Calculation', ar: 'حساب الرواتب والضرائب تلقائياً' },
      { en: 'Leave & Expense Approval Workflows', ar: 'مسارات اعتماد الإجازات والمصروفات' },
      { en: 'Employee Self-Service Mobile Portal', ar: 'بوابة الخدمة الذاتية للموظفين' }
    ],
    technologies: ['React Native', 'React', 'Node.js', 'PostgreSQL', 'Docker'],
    version: '1.8.4',
    releaseDate: '2025-08-20',
    status: 'live',
    googlePlayUrl: 'https://play.google.com/store',
    appStoreUrl: 'https://apple.com/app-store',
    websiteUrl: 'https://example.com/nshr',
    order: 3,
    isFeatured: true,
    isActive: true
  },
  {
    id: 'app-pdf-viewer',
    name: {
      en: 'PDF Viewer & Editor Pro',
      ar: 'PDF Viewer'
    },
    logoUrl: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=200&auto=format&fit=crop&q=80',
    coverImageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1000&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1586282391129-76a6df230234?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80'
    ],
    shortDesc: {
      en: 'Lightweight and fast PDF reader with advanced markup, document scanning, and digital signing.',
      ar: 'قارئ PDF خفيف وسريع مع أدوات متقدمة لإدارة وتوقيع ومسح ملفات PDF.'
    },
    fullDesc: {
      en: 'PDF Viewer Pro offers instant rendering of heavy document files, OCR text extraction in multiple languages, document merger/splitter, and secure cryptographic digital signature verification.',
      ar: 'قارئ ومحرر مستندات PDF فائق السرعة، يوفر استخراج النصوص بالتعرف الضوئي OCR، ودمج وتقسيم الملفات، والتوقيع الرقمي الآمن للمستندات والعقود.'
    },
    features: [
      { en: 'Instant Heavy File Rendering', ar: 'فتح وعرض سريع للمستندات الكبيرة' },
      { en: 'Multi-language OCR Text Extraction', ar: 'استخراج النصوص من الصور والمستندات' },
      { en: 'PDF Merge, Split & Compression', ar: 'دمج وتقسيم وضغط ملفات PDF' },
      { en: 'Cryptographic Electronic Signatures', ar: 'توقيع المستندات إلكترونياً بأمان' }
    ],
    technologies: ['Flutter', 'Rust', 'PDFium', 'WebAssembly'],
    version: '4.0.2',
    releaseDate: '2026-02-01',
    status: 'live',
    googlePlayUrl: 'https://play.google.com/store',
    appStoreUrl: 'https://apple.com/app-store',
    githubUrl: 'https://github.com/nsgrouptech/pdf-viewer',
    order: 4,
    isFeatured: true,
    isActive: true
  }
];

export const initialProjects: Project[] = [
  {
    id: 'project-1',
    title: {
      en: 'Smart Logistics & Fleet Telematics Hub',
      ar: 'منصة تتبع وإدارة أساطيل الشحن اللوجستي'
    },
    coverImageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&auto=format&fit=crop&q=80'
    ],
    description: {
      en: 'An enterprise real-time dispatch and routing system optimizing fuel consumption, driver safety, and shipment tracking across 5,000+ trucks in the MENA region.',
      ar: 'نظام متكامل لتتبع وإدارة شاحنات النقل والتوزيع اللوجستي عبر خرائط حية، مع تحسين استهلاك الوقود وجدولة الرحلات لأكثر من 5000 شاحنة.'
    },
    technologies: ['React', 'Node.js', 'Go', 'Redis', 'Kafka', 'Mapbox'],
    clientName: 'Gulf Express Logistics',
    category: { en: 'Enterprise Platform', ar: 'منصة مؤسسية' },
    projectUrl: 'https://example.com/logistics',
    date: '2025-10',
    status: 'completed',
    isFeatured: true
  },
  {
    id: 'project-2',
    title: {
      en: 'Telehealth & Digital Clinic Suite',
      ar: 'منظومة العيادات الرقمية والاستشارات الطبية'
    },
    coverImageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1000&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80'
    ],
    description: {
      en: 'A HIPAA-compliant telemedicine platform with HD encrypted video consultations, electronic health records (EHR), and automated prescription fulfillment.',
      ar: 'منصة استشارات طبية متوافقة مع معايير الأمان العالمية تتيح للمرضى حجز المواعيد، والتواصل المرئي المباشر مع الأطباء، وإصدار الوصفات الدوائية.'
    },
    technologies: ['Next.js', 'TypeScript', 'WebRTC', 'FastAPI', 'PostgreSQL'],
    clientName: 'CarePlus Health Network',
    category: { en: 'Healthcare & SaaS', ar: 'حلول الرعاية الصحية' },
    projectUrl: 'https://example.com/careplus',
    date: '2025-12',
    status: 'completed',
    isFeatured: true
  },
  {
    id: 'project-3',
    title: {
      en: 'FinTech Multi-Asset Investment Portal',
      ar: 'بوابة الاستثمار والحلول المالية الرقمية'
    },
    coverImageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1000&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80'
    ],
    description: {
      en: 'Real-time financial analytics, algorithmic trade monitoring, and automated portfolio rebalancing for institutional and retail investors.',
      ar: 'منصة تداول وتحليلات مالية تقدم تتبعاً حياً للأسواق والمحافظ الاستثمارية مع خوارزميات ذكية لإدارة المخاطر وتنبيهات فورية.'
    },
    technologies: ['React', 'Python', 'WebSockets', 'TailwindCSS', 'TimescaleDB'],
    clientName: 'AlphaCapital Investments',
    category: { en: 'FinTech', ar: 'التقنية المالية' },
    projectUrl: 'https://example.com/alphacapital',
    date: '2026-01',
    status: 'completed',
    isFeatured: true
  }
];
