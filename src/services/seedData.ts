import { AboutInfo, Application, Banner, GeneralSettings, Project, Service, SocialLinks } from '../types';

export const initialSettings: GeneralSettings = {
  siteName: {
    en: 'ROGUE BYTE LLC',
    ar: 'روج بايت ذ.م.م'
  },
  companyName: {
    en: 'ROGUE BYTE LLC',
    ar: 'شركة روج بايت ذ.م.م'
  },
  logoUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=200&auto=format&fit=crop&q=80',
  faviconUrl: '',
  email: 'contact@roguebyte.io',
  phone: '+1 (555) 019-2834',
  whatsapp: '+15550192834',
  address: {
    en: 'Silicon Tech Center, Suite 800, Wilmington, DE, USA',
    ar: 'مركز وادي التقنية، جناح 800، ويلمنجتون، ديلاوير، الولايات المتحدة'
  },
  defaultLanguage: 'en',
  theme: 'system',
  seo: {
    metaTitle: {
      en: 'ROGUE BYTE LLC | Technology & Cybersecurity',
      ar: 'روج بايت ذ.م.م | التكنولوجيا والأمن السيبراني'
    },
    metaDescription: {
      en: 'ROGUE BYTE LLC is a technology and cybersecurity company specializing in software engineering, application development, digital solutions, cybersecurity, reverse engineering, and digital forensics.',
      ar: 'شركة روج بايت (ROGUE BYTE LLC) هي شركة متخصصة في التكنولوجيا والأمن السيبراني، وهندسة البرمجيات، وتطوير التطبيقات، والحلول الرقمية، والأمن السيبراني، والهندسة العكسية، والتحقيق الجنائي الرقمي.'
    },
    keywords: 'cybersecurity, reverse engineering, digital forensics, software engineering, application development, intelligent systems, digital solutions, ROGUE BYTE LLC',
    ogImageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80'
  },
  social: {
    facebook: 'https://facebook.com/roguebyte',
    twitter: 'https://x.com/roguebyte',
    instagram: 'https://instagram.com/roguebyte',
    linkedin: 'https://linkedin.com/company/roguebyte',
    github: 'https://github.com/roguebyte',
    youtube: 'https://youtube.com/@roguebyte',
    whatsapp: 'https://wa.me/15550192834',
    telegram: 'https://t.me/roguebyte'
  }
};

export const initialBanners: Banner[] = [
  {
    id: 'banner-1',
    title: {
      en: 'Building, Analyzing & Securing Modern Digital Technologies',
      ar: 'بناء، تحليل، وحماية التقنيات الرقمية الحديثة'
    },
    subtitle: {
      en: 'ROGUE BYTE LLC is a premier technology & cybersecurity company delivering advanced software engineering, reverse engineering, and digital forensics.',
      ar: 'روج بايت (ROGUE BYTE LLC) شركة رائدة في التكنولوجيا والأمن السيبراني، متخصصة في هندسة البرمجيات، والهندسة العكسية، والتحقيق الرقمي.'
    },
    description: {
      en: 'We develop secure, scalable, and innovative mobile applications, web platforms, intelligent systems, and custom software solutions while providing advanced security analysis and digital investigation capabilities.',
      ar: 'نقوم بتطوير تطبيقات جوال ومنصات ويب وأنظمة ذكية وحلول برمجية مخصصة آمنة وقابلة للتطوير ومبتكرة، مع توفير قدرات متقدمة للتحليل الأمني والتحقيق الرقمي.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    badge: {
      en: 'Cybersecurity & Software Engineering',
      ar: 'الأمن السيبراني وهندسة البرمجيات'
    },
    buttonText: {
      en: 'Explore Solutions',
      ar: 'استكشف حلولنا'
    },
    buttonLink: '/services',
    secondaryButtonText: {
      en: 'Discover Applications',
      ar: 'اكتشف التطبيقات'
    },
    secondaryButtonLink: '/applications',
    order: 1,
    isActive: true
  },
  {
    id: 'banner-2',
    title: {
      en: 'Advanced Security Analysis & Digital Forensics',
      ar: 'تحليل أمني متقدم وتحقيقات جنائية رقمية'
    },
    subtitle: {
      en: 'Reverse engineering, vulnerability intelligence, threat modeling, and incident response for mission-critical infrastructure.',
      ar: 'هندسة عكسية، استخبارات الثغرات، نمذجة التهديدات، واستجابة فورية للحوادث الأمنية للبنى التحتية الحساسة.'
    },
    description: {
      en: 'Deep binary inspection, malware disassembly, memory forensics, and rigorous compliance audits protecting your core digital assets.',
      ar: 'فحص عميق للشيفرات البرمجية، تحليل البرمجيات الخبيثة، تحقيقات الذاكرة الرقمية، وتدقيق أمني شامل لحماية أصولك الرقمية.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80',
    badge: {
      en: 'Offensive & Defensive Security',
      ar: 'الأمن الهجومي والدفاعي'
    },
    buttonText: {
      en: 'Cybersecurity Services',
      ar: 'خدمات الأمن السيبراني'
    },
    buttonLink: '/services',
    secondaryButtonText: {
      en: 'Contact Specialists',
      ar: 'تواصل مع خبرائنا'
    },
    secondaryButtonLink: '/contact',
    order: 2,
    isActive: true
  },
  {
    id: 'banner-3',
    title: {
      en: 'Intelligent Platforms & Custom Software Systems',
      ar: 'منصات ذكية وحلول برمجية مخصصة'
    },
    subtitle: {
      en: 'Architecting ultra-secure mobile ecosystems, high-throughput cloud platforms, and resilient enterprise applications.',
      ar: 'تصميم وبناء تطبيقات جوال فائقة الأمان، ومنصات سحابية عالية الأداء، وأنظمة مؤسسية متطورة.'
    },
    description: {
      en: 'Our mission is to build, analyze, and secure modern digital technologies through innovation, technical expertise, and responsible security research.',
      ar: 'مهمتنا هي بناء وتحليل وحماية التقنيات الرقمية الحديثة من خلال الابتكار والخبرة الفنية والأبحاث الأمنية المسؤولة.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&auto=format&fit=crop&q=80',
    badge: {
      en: 'Scalable Systems',
      ar: 'أنظمة متقدمة وقابلة للتوسع'
    },
    buttonText: {
      en: 'View Portfolio',
      ar: 'معرض المشاريع'
    },
    buttonLink: '/projects',
    secondaryButtonText: {
      en: 'Get in Touch',
      ar: 'تواصل معنا'
    },
    secondaryButtonLink: '/contact',
    order: 3,
    isActive: true
  }
];

export const initialAbout: AboutInfo = {
  companyName: {
    en: 'ROGUE BYTE LLC',
    ar: 'روج بايت ذ.م.م'
  },
  tagline: {
    en: 'Building, analyzing, and securing modern digital technologies',
    ar: 'بناء وتحليل وحماية التقنيات الرقمية الحديثة'
  },
  bio: {
    en: 'ROGUE BYTE LLC is a technology and cybersecurity company specializing in software engineering, application development, digital solutions, cybersecurity, reverse engineering, and digital forensics. We develop secure, scalable, and innovative mobile applications, web platforms, intelligent systems, and custom software solutions while providing advanced security analysis and digital investigation capabilities. Our mission is to build, analyze, and secure modern digital technologies through innovation, technical expertise, and responsible security research.',
    ar: 'شركة روج بايت (ROGUE BYTE LLC) هي شركة متخصصة في التكنولوجيا والأمن السيبراني، وهندسة البرمجيات، وتطوير التطبيقات، والحلول الرقمية، والأمن السيبراني، والهندسة العكسية، والتحقيق الجنائي الرقمي. نقوم بتطوير تطبيقات جوال ومنصات ويب وأنظمة ذكية وحلول برمجية مخصصة آمنة وقابلة للتطوير ومبتكرة، مع توفير قدرات متقدمة للتحليل الأمني والتحقيق الرقمي. مهمتنا هي بناء وتحليل وحماية التقنيات الرقمية الحديثة من خلال الابتكار والخبرة الفنية والأبحاث الأمنية المسؤولة.'
  },
  story: {
    en: 'ROGUE BYTE LLC was founded by elite security researchers, system architects, and reverse engineers with a unified mission: to bridge the gap between world-class software engineering and hardened digital security. We build systems from the ground up with security-first architectures, while providing deep-tier forensic and vulnerability insights to high-stakes organizations worldwide.',
    ar: 'تأسست شركة روج بايت على أيدي نخبة من باحثي الأمن السيبراني ومهندسي الأنظمة والهندسة العكسية بهدف الجمع بين الإتقان البرمجي الهندسي والحماية الأمنية الفائقة. نبني الأنظمة وفق أعلى المعايير الأمنية وندعم المؤسسات بالتحليلات الجنائية والوقائية المتقدمة.'
  },
  vision: {
    en: 'To be a globally recognized authority in cybersecurity, software engineering, and digital forensics, renowned for building resilient software architectures and pioneering defensive & analytical innovations.',
    ar: 'أن نكون المرجع التقني والأمني الأول عالمياً في هندسة البرمجيات والأمن السيبراني والتحقيق الجنائي الرقمي، والمعروف بابتكار حلول وأنظمة فائقة الصمود والأمان.'
  },
  mission: {
    en: 'Our mission is to build, analyze, and secure modern digital technologies through innovation, technical expertise, and responsible security research.',
    ar: 'مهمتنا هي بناء وتحليل وحماية التقنيات الرقمية الحديثة من خلال الابتكار والخبرة الفنية والأبحاث الأمنية المسؤولة.'
  },
  values: [
    {
      title: { en: 'Security-First Engineering', ar: 'الهندسة المبنية على الأمان أولاً' },
      desc: { en: 'Zero-trust design patterns, strict cryptographic standards, and secure SDLC at every phase.', ar: 'تطبيق مبادئ انعدام الثقة (Zero-Trust)، التشفير القوي، ودورات تطوير برمجية آمنة ومحمية بالكامل.' },
      icon: 'ShieldCheck'
    },
    {
      title: { en: 'Deep Technical Rigor', ar: 'الصرامة والدقة الفنية' },
      desc: { en: 'Mastery over low-level binaries, reverse engineering, kernel internals, and high-throughput systems.', ar: 'إتقان متعمق للشيفرات البرمجية منخفضة المستوى، الهندسة العكسية، ونواة الأنظمة.' },
      icon: 'Binary'
    },
    {
      title: { en: 'Responsible Security Research', ar: 'الأبحاث الأمنية المسؤولة' },
      desc: { en: 'Committed to ethical vulnerability disclosure, forensic integrity, and technological guardianship.', ar: 'الالتزام التام بالمعايير الأخلاقية في كشف الثغرات والنزاهة الجنائية الرقمية.' },
      icon: 'Lock'
    },
    {
      title: { en: 'Innovation & Agility', ar: 'الابتكار والمرونة التكنولوجية' },
      desc: { en: 'Developing modern, scalable, intuitive web, mobile, and AI solutions that outperform expectations.', ar: 'تطوير حلول ويب وجوال وذكاء اصطناعي حديثة وقابلة للتطوير تفوق التوقعات.' },
      icon: 'Zap'
    }
  ],
  experienceYears: 10,
  completedProjects: 85,
  satisfiedClients: 140,
  expertTeam: 32,
  heroImageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80'
};

export const initialServices: Service[] = [
  {
    id: 'service-cybersecurity',
    title: {
      en: 'Cybersecurity & Penetration Testing',
      ar: 'الأمن السيبراني واختبار الاختراق'
    },
    description: {
      en: 'Comprehensive threat modeling, advanced red-teaming, web/mobile penetration testing, and infrastructure hardening.',
      ar: 'تقييم شامل للتهديدات، اختبارات اختراق متقدمة لتطبيقات الويب والجوال، وتحصين البنى التحتية الحساسة.'
    },
    icon: 'Shield',
    order: 1,
    isActive: true,
    features: [
      { en: 'Full-Scope Red Team & Penetration Assessments', ar: 'اختبارات اختراق شاملة ومحاكاة الهجمات الواقعية' },
      { en: 'Source Code Security Review (SAST & DAST)', ar: 'مراجعة أمنية دقيقة للشيفرة المصدرية' },
      { en: 'Zero-Trust Architecture & Cloud Hardening', ar: 'بناء استراتيجيات انعدام الثقة وتأمين السحابة' }
    ]
  },
  {
    id: 'service-reverse-engineering',
    title: {
      en: 'Reverse Engineering & Binary Analysis',
      ar: 'الهندسة العكسية وتحليل البرمجيات'
    },
    description: {
      en: 'Decompilation, binary instrumentation, proprietary protocol analysis, and malware dissection to uncover internal logic.',
      ar: 'تفكيك الشيفرات الثنائية، تحليل البروتوكولات الخاصة، وتحليل البرمجيات الخبيثة لفهم وتدقيق آليات عملها.'
    },
    icon: 'Terminal',
    order: 2,
    isActive: true,
    features: [
      { en: 'Binary Decompilation & Assembly Inspection', ar: 'تفكيك الشيفرات البرمجية وتحليل لغة التجميع' },
      { en: 'Hardware & Firmware Security Auditing', ar: 'تدقيق أمني للبرمجيات المدمجة والعتاد الذكي' },
      { en: 'Proprietary Protocol & API Reverse Engineering', ar: 'تحليل وفك شفرة بروتوكولات الاتصال الخاصة' }
    ]
  },
  {
    id: 'service-digital-forensics',
    title: {
      en: 'Digital Forensics & Incident Response (DFIR)',
      ar: 'التحقيق الجنائي الرقمي والاستجابة للحوادث'
    },
    description: {
      en: 'Evidence preservation, memory dump analysis, root cause breach investigation, and forensic court-ready reporting.',
      ar: 'تحريز الأدلة الرقمية، تحليل الذاكرة وسجلات النظام، تحديد أسباب الاختراقات، وإعداد تقارير جنائية معتمدة.'
    },
    icon: 'FileSearch',
    order: 3,
    isActive: true,
    features: [
      { en: 'Rapid Incident Response & Threat Containment', ar: 'استجابة سريعة للحوادث واحتواء التهديدات' },
      { en: 'Memory, Disk & Network Artifact Forensics', ar: 'تحليل جنائي متعمق للذاكرة والأقراص والشبكات' },
      { en: 'Chain of Custody & Forensic Reporting', ar: 'توثيق سلسلة الحيازة وتقارير جنائية متكاملة' }
    ]
  },
  {
    id: 'service-software-engineering',
    title: {
      en: 'Software Engineering & Custom Solutions',
      ar: 'هندسة البرمجيات والحلول المخصصة'
    },
    description: {
      en: 'Engineering scalable backend services, microservices, high-throughput APIs, and custom enterprise tools.',
      ar: 'بناء وتصميم أنظمة برمجية مخصصة، واجهات برمجية عالية الأداء، وحلول مؤسسية معقدة.'
    },
    icon: 'Cpu',
    order: 4,
    isActive: true,
    features: [
      { en: 'High-Concurrency Distributed Systems', ar: 'أنظمة موزعة فائقة التحمل والأداء' },
      { en: 'Microservices & Clean Architecture', ar: 'هياكل برمجية معيارية ونظيفة' },
      { en: 'Automated CI/CD & DevSecOps Pipelines', ar: 'مسارات دمج ونشر مؤتمتة ومعززة أمنياً' }
    ]
  },
  {
    id: 'service-mobile-web-dev',
    title: {
      en: 'Application Development (Mobile & Web Platforms)',
      ar: 'تطوير التطبيقات (منصات الجوال والويب)'
    },
    description: {
      en: 'Developing secure, modern, and intuitive native iOS, Android, and responsive web platforms.',
      ar: 'تطوير تطبيقات جوال ومنصات ويب حديثة، سريعة، وسلسة مع مراعاة أعلى معايير الحماية والأداء.'
    },
    icon: 'Smartphone',
    order: 5,
    isActive: true,
    features: [
      { en: 'Native & Cross-Platform Mobile Apps (Flutter, React Native)', ar: 'تطبيقات جوال احترافية لأنظمة iOS و Android' },
      { en: 'High-Performance Web Platforms (React, Next.js)', ar: 'منصات ويب متقدمة وسريعة الاستجابة' },
      { en: 'End-to-End Encryption & Biometric Auth', ar: 'تشفير كامل من طرف لطرف ومصادقة حيوية' }
    ]
  },
  {
    id: 'service-intelligent-systems',
    title: {
      en: 'Intelligent Systems & Secure Cloud Solutions',
      ar: 'الأنظمة الذكية والحلول السحابية الآمنة'
    },
    description: {
      en: 'AI model integration, automated threat detection systems, and hardened cloud infrastructure.',
      ar: 'دمج نماذج الذكاء الاصطناعي، أنظمة الكشف الآلي عن التهديدات، وبنى تحتية سحابية محصنة.'
    },
    icon: 'Cloud',
    order: 6,
    isActive: true,
    features: [
      { en: 'AI-Driven Anomaly & Threat Detection', ar: 'كشف ذكي ومؤتمت عن التهديدات والأنماط الشاذة' },
      { en: 'Hardened GCP, AWS & Azure Infrastructures', ar: 'بنى سحابية محصنة على Google Cloud و AWS' },
      { en: '24/7 Monitoring & Resilient Architecture', ar: 'مراقبة مستمرة على مدار الساعة وجاهزية قصوى' }
    ]
  }
];

export const initialApplications: Application[] = [
  {
    id: 'app-byte-shield',
    name: {
      en: 'ByteShield Sentinel',
      ar: 'ByteShield Sentinel'
    },
    logoUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=200&auto=format&fit=crop&q=80',
    coverImageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1000&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&auto=format&fit=crop&q=80'
    ],
    shortDesc: {
      en: 'Real-time endpoint protection, behavioral anomaly detection, and automated threat containment app.',
      ar: 'تطبيق حماية النقاط الطرفية في الوقت الفعلي وكشف الأنماط الشاذة واحتواء التهديدات تلقائياً.'
    },
    fullDesc: {
      en: 'ByteShield Sentinel is a next-generation security client engineered by ROGUE BYTE LLC. It provides kernel-level process monitoring, zero-day threat heuristics, memory tampering alerts, and direct integration into SOC telemetry pipelines.',
      ar: 'تطبيق ByteShield Sentinel هو نظام حماية متطور من تطوير ROGUE BYTE LLC، يقدم مراقبة العمليات البرمجية، وكشف التهديدات غير المعروفة، وتنبيهات فورية عند التلاعب بالذاكرة مع تكامل مباشر مع مراكز العمليات الأمنية.'
    },
    features: [
      { en: 'Real-Time Heuristic Malware Detection', ar: 'كشف فوري ومتقدم عن البرمجيات الخبيثة' },
      { en: 'Zero-Trust Process Isolation & Sandboxing', ar: 'عزل العمليات المشبوهة في بيئة آمنة' },
      { en: 'Encrypted Telemetry & SOC Reporting', ar: 'نقل تقارير القياس عن بعد بصيغة مشفرة' },
      { en: 'Automated Breach Isolation Kill-Switch', ar: 'مفتاح إيقاف فوري لعزل الأجهزة المصابة' }
    ],
    technologies: ['Rust', 'C++', 'eBPF', 'React Native', 'WebSockets', 'gRPC'],
    version: '2.5.0',
    releaseDate: '2026-01-20',
    status: 'live',
    googlePlayUrl: 'https://play.google.com/store',
    appStoreUrl: 'https://apple.com/app-store',
    websiteUrl: 'https://roguebyte.io/sentinel',
    githubUrl: 'https://github.com/roguebyte/sentinel-agent',
    order: 1,
    isFeatured: true,
    isActive: true
  },
  {
    id: 'app-hex-probe',
    name: {
      en: 'HexProbe Forensic Suite',
      ar: 'HexProbe Forensic'
    },
    logoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80',
    coverImageUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1000&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&fit=crop&q=80'
    ],
    shortDesc: {
      en: 'Mobile and desktop digital forensics workspace for artifact carving, timeline extraction, and evidence triage.',
      ar: 'منظومة التحقيق الجنائي الرقمي لاستخراج الأدلة، بناء الخطوط الزمنية للأحداث وتدقيق الذاكرة.'
    },
    fullDesc: {
      en: 'HexProbe is an all-in-one digital forensics and reverse engineering workspace. Allows investigators to ingest raw disk images, analyze mobile filesystem dumps, disassemble binaries with AI-powered decompilers, and generate courtroom-admissible audit reports.',
      ar: 'منظومة HexProbe المتكاملة للتحقيقات الرقمية والهندسة العكسية تتيح فحص نسخ الأقراص الصلبة، وتفكيك البرمجيات بالذكاء الاصطناعي، واستخراج السجلات الجنائية المعتمدة.'
    },
    features: [
      { en: 'Automated Artifact Parsing & Timeline Reconstruction', ar: 'تحليل السجلات وإعادة بناء الخط الزمني للحدث' },
      { en: 'Interactive Binary Disassembler & CFG Viewer', ar: 'مفكك شيفرات تفاعلي وعارض لمسارات تدفق الكود' },
      { en: 'Cryptographic Hashing & Evidence Integrity Verification', ar: 'حساب التجزئة التشفيرية لضمان سلامة الأدلة' },
      { en: 'Automated PDF/HTML Court-Ready Export', ar: 'تصدير تقارير جنائية متكاملة بصيغة PDF' }
    ],
    technologies: ['Flutter', 'Rust', 'LLVM', 'SQLite', 'WebAssembly'],
    version: '3.1.2',
    releaseDate: '2026-02-10',
    status: 'live',
    googlePlayUrl: 'https://play.google.com/store',
    appStoreUrl: 'https://apple.com/app-store',
    websiteUrl: 'https://roguebyte.io/hexprobe',
    order: 2,
    isFeatured: true,
    isActive: true
  },
  {
    id: 'app-vault-mesh',
    name: {
      en: 'VaultMesh Enterprise',
      ar: 'VaultMesh Enterprise'
    },
    logoUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&auto=format&fit=crop&q=80',
    coverImageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1000&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=800&auto=format&fit=crop&q=80'
    ],
    shortDesc: {
      en: 'Zero-knowledge encrypted team workspace, secure credential rotation, and confidential messaging.',
      ar: 'منصة مساحات العمل الآمنة بتشفير المعرفة الصفرية (Zero-Knowledge) والمراسلة السرية المشفرة.'
    },
    fullDesc: {
      en: 'VaultMesh is a zero-trust enterprise suite providing quantum-resistant end-to-end encrypted messaging, automated secret and API key rotation, granular privilege granting, and real-time audit logging.',
      ar: 'منظومة VaultMesh المؤسسية تقدم مراسلة مشفرة مقاومة للحوسبة الكمية، وإدارة وتدوير المفاتيح السرية، وصلاحيات دقيقة مع سجلات تدقيق لحظية.'
    },
    features: [
      { en: 'Post-Quantum End-to-End Encryption (Kyber/Dilithium)', ar: 'تشفير طرفي متطور مقاوم للحوسبة الكمومية' },
      { en: 'Automated API Secret & SSH Key Rotation', ar: 'تدوير تلقائي للمفاتيح السرية والشهادات' },
      { en: 'Time-Based Ephemeral Access Controls', ar: 'صلاحيات وصول مؤقتة ذاتية الإلغاء' },
      { en: 'Multi-Platform Synchronization (iOS, Android, Web)', ar: 'مزامنة متعددة المنصات عبر جميع الأجهزة' }
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'WebRTC'],
    version: '1.9.0',
    releaseDate: '2025-12-05',
    status: 'live',
    googlePlayUrl: 'https://play.google.com/store',
    appStoreUrl: 'https://apple.com/app-store',
    websiteUrl: 'https://roguebyte.io/vaultmesh',
    order: 3,
    isFeatured: true,
    isActive: true
  }
];

export const initialProjects: Project[] = [
  {
    id: 'project-cloud-soc',
    title: {
      en: 'Autonomous Cloud SOC & Threat Telemetry Hub',
      ar: 'مركز القياس الأمني السحابي وكشف التهديدات الذكي'
    },
    coverImageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1000&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80'
    ],
    description: {
      en: 'Architected and deployed a multi-tenant Security Operations Center (SOC) processing over 50,000 events/second with AI-driven threat triage and automated playbook executions.',
      ar: 'تصميم وتنفيذ منصة متطورة لمركز العمليات الأمنية (SOC) تعالج أكثر من 50 ألف حدث في الثانية مع تحليل ذكي للتهديدات واستجابة مؤتمتة.'
    },
    technologies: ['Go', 'Rust', 'Kafka', 'ClickHouse', 'React', 'Kubernetes'],
    clientName: 'Global Defense & Fintech Consortium',
    category: { en: 'Cybersecurity & Big Data', ar: 'الأمن السيبراني والبيانات الضخمة' },
    projectUrl: 'https://roguebyte.io/cases/soc',
    date: '2026-01',
    status: 'completed',
    isFeatured: true
  },
  {
    id: 'project-firmware-audit',
    title: {
      en: 'Automotive & IoT Firmware Binary Security Audit',
      ar: 'التدقيق الأمني والهندسة العكسية لبرمجيات السيارات وإنترنت الأشياء'
    },
    coverImageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1000&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80'
    ],
    description: {
      en: 'Conducted in-depth reverse engineering and binary vulnerability analysis across connected vehicle telematics units, identifying and mitigating 14 zero-day vulnerabilities prior to production.',
      ar: 'إجراء هندسة عكسية وفحص أمني شامل للبرمجيات المدمجة في وحدات تتبع المركبات المتصلة، واكتشاف ومعالجة 14 ثغرة أمنية حرجة قبل مرحلة الإنتاج.'
    },
    technologies: ['Ghidra', 'IDA Pro', 'C', 'Python', 'QEMU', 'CAN Bus Protocol'],
    clientName: 'NextGen Autonomous Mobility',
    category: { en: 'Reverse Engineering', ar: 'الهندسة العكسية' },
    projectUrl: 'https://roguebyte.io/cases/firmware',
    date: '2025-11',
    status: 'completed',
    isFeatured: true
  },
  {
    id: 'project-fintech-forensics',
    title: {
      en: 'Banking Transaction Anti-Fraud & Forensic Engine',
      ar: 'محرك التحقيق الجنائي الرقمي ومكافحة الاحتيال المصرفي'
    },
    coverImageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1000&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80'
    ],
    description: {
      en: 'Engineered a high-performance graph analytics and transaction forensics platform that detects coordinated money laundering rings and unauthorized system tampering in sub-second latency.',
      ar: 'تطوير منصة تحقيقات جنائية مالية عالية السرعة لكشف محاولات الاحتيال وغسيل الأموال والتلاعب بالأنظمة في أجزاء من الثانية.'
    },
    technologies: ['React', 'TypeScript', 'Neo4j', 'FastAPI', 'TimescaleDB', 'Docker'],
    clientName: 'Apex International Banking Group',
    category: { en: 'Digital Forensics & FinTech', ar: 'التحقيق الجنائي الرقمي والتقنية المالية' },
    projectUrl: 'https://roguebyte.io/cases/fintech-forensics',
    date: '2025-09',
    status: 'completed',
    isFeatured: true
  }
];
