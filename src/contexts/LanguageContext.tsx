import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, LocalizedString } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRtl: boolean;
  t: (key: string) => string;
  localize: (obj: LocalizedString | undefined | null, fallback?: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.services': 'Services & Security',
    'nav.applications': 'Applications',
    'nav.projects': 'Case Studies',
    'nav.contact': 'Contact Us',
    'nav.admin': 'Control Center',
    'nav.getInTouch': 'Get in Touch',

    // Hero
    'hero.badge': 'ROGUE BYTE LLC | Technology & Cybersecurity',
    'hero.title': 'Building, Analyzing & Securing Modern Digital Technologies',
    'hero.subtitle': 'Specialized in software engineering, application development, digital solutions, cybersecurity, reverse engineering, and digital forensics.',
    'hero.exploreWorks': 'Explore Solutions',
    'hero.contactUs': 'Contact Us',
    'hero.viewDetails': 'View Details',
    'hero.discoverApps': 'Discover Applications',

    // Services
    'services.heading': 'Capabilities & Specialized Services',
    'services.subheading': 'From deep binary analysis and incident forensics to scalable application engineering and cloud defense.',
    'services.viewAll': 'View All Capabilities',
    'services.learnMore': 'Learn More',

    // Applications
    'apps.heading': 'Software & Tool Ecosystem',
    'apps.subheading': 'Explore secure mobile apps, forensic suites, and platforms engineered and released by ROGUE BYTE LLC.',
    'apps.viewAll': 'View All Applications',
    'apps.viewDetails': 'View Details',
    'apps.version': 'Version',
    'apps.releaseDate': 'Released',
    'apps.status': 'Status',
    'apps.status.live': 'Live in Production',
    'apps.status.beta': 'Public Beta',
    'apps.status.in_development': 'In Active Development',
    'apps.features': 'Core Capabilities',
    'apps.technologies': 'Technologies & Architecture',
    'apps.download': 'Download & Access',
    'apps.screenshots': 'Interface & Architecture Gallery',
    'apps.googlePlay': 'Google Play',
    'apps.appStore': 'App Store',
    'apps.webApp': 'Launch Web Client',
    'apps.sourceCode': 'Source Repository',

    // Projects
    'projects.heading': 'Case Studies & Security Deployments',
    'projects.subheading': 'A selection of high-impact engineering architectures and security investigations delivered worldwide.',
    'projects.viewAll': 'View All Case Studies',
    'projects.livePreview': 'View Live Architecture',
    'projects.github': 'Repository / Source',
    'projects.client': 'Organization / Sector',
    'projects.date': 'Completion Date',

    // About
    'about.heading': 'About ROGUE BYTE LLC',
    'about.subheading': 'Building, analyzing, and securing modern digital technologies through innovation, technical expertise, and responsible security research.',
    'about.yearsExp': 'Years Field Experience',
    'about.projectsDone': 'Completed Deployments',
    'about.happyClients': 'Enterprise Partners',
    'about.expertTeam': 'Specialist Engineers & Researchers',
    'about.vision': 'Our Vision',
    'about.mission': 'Our Mission',
    'about.values': 'Core Principles',
    'about.story': 'Our Background',

    // Contact
    'contact.heading': 'Initiate Consultation & Inquiries',
    'contact.subheading': 'Connect directly with our engineering and cybersecurity specialists for project development or security assessments.',
    'contact.name': 'Your Full Name',
    'contact.email': 'Email Address',
    'contact.phone': 'Phone Number (Optional)',
    'contact.subject': 'Subject / Service Required',
    'contact.message': 'Project Details or Inquiry',
    'contact.send': 'Transmit Message',
    'contact.sending': 'Transmitting...',
    'contact.success': 'Your message has been received securely. Our engineering team will respond promptly.',
    'contact.error': 'Failed to transmit message. Please check connection and retry.',
    'contact.info': 'Direct Headquarters & Channels',
    'contact.directReach': 'Direct Communication Channels',

    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.quickLinks': 'Navigation',
    'footer.builtWith': 'Engineered by ROGUE BYTE LLC',

    // Common
    'common.search': 'Search...',
    'common.filter': 'Filter',
    'common.all': 'All',
    'common.back': 'Back',
    'common.loading': 'Loading...',
    'common.noData': 'No items available at the moment.',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
  },
  ar: {
    // Nav
    'nav.home': 'الرئيسية',
    'nav.about': 'عن الشركة',
    'nav.services': 'الخدمات والأمن',
    'nav.applications': 'تطبيقاتنا',
    'nav.projects': 'الأعمال والمشاريع',
    'nav.contact': 'تواصل معنا',
    'nav.admin': 'مركز التحكم',
    'nav.getInTouch': 'تواصل معنا',

    // Hero
    'hero.badge': 'روج بايت ذ.م.م | التكنولوجيا والأمن السيبراني',
    'hero.title': 'بناء، تحليل، وحماية التقنيات الرقمية الحديثة',
    'hero.subtitle': 'متخصصون في هندسة البرمجيات وتطوير التطبيقات والحلول الرقمية والأمن السيبراني والهندسة العكسية والتحقيق الجنائي الرقمي.',
    'hero.exploreWorks': 'استكشف حلولنا',
    'hero.contactUs': 'تواصل معنا',
    'hero.viewDetails': 'عرض التفاصيل',
    'hero.discoverApps': 'اكتشف التطبيقات',

    // Services
    'services.heading': 'خدماتنا المتخصصة',
    'services.subheading': 'من التحليل الثنائي والهندسة العكسية والتحقيق الجنائي إلى هندسة البرمجيات المتقدمة وتأمين السحابة.',
    'services.viewAll': 'عرض جميع الخدمات',
    'services.learnMore': 'معرفة المزيد',

    // Applications
    'apps.heading': 'منظومة التطبيقات والبرمجيات',
    'apps.subheading': 'استكشف التطبيقات الآمنة ومنظومات التحقيق الرقمي والأنظمة المطورة بواسطة ROGUE BYTE LLC.',
    'apps.viewAll': 'عرض جميع التطبيقات',
    'apps.viewDetails': 'عرض التفاصيل',
    'apps.version': 'الإصدار',
    'apps.releaseDate': 'تاريخ الإطلاق',
    'apps.status': 'الحالة',
    'apps.status.live': 'متاح في الإنتاج',
    'apps.status.beta': 'نسخة تجريبية عامة',
    'apps.status.in_development': 'قيد التطوير الفعلي',
    'apps.features': 'القدرات والخصائص',
    'apps.technologies': 'التقنيات والبنية البرمجية',
    'apps.download': 'تحميل واستخدام',
    'apps.screenshots': 'معرض الواجهات والتصميم',
    'apps.googlePlay': 'Google Play',
    'apps.appStore': 'App Store',
    'apps.webApp': 'منصة الويب',
    'apps.sourceCode': 'المستودع البرمجي',

    // Projects
    'projects.heading': 'دراسات الحالة والمشاريع المنفذة',
    'projects.subheading': 'نماذج من الأنظمة البرمجية والتحليلات الأمنية المتقدمة التي نفذناها بنجاح.',
    'projects.viewAll': 'عرض جميع المشاريع',
    'projects.livePreview': 'معاينة المنظومة',
    'projects.github': 'المستودع البرمجي',
    'projects.client': 'الجهة / القطاع',
    'projects.date': 'تاريخ الإنجاز',

    // About
    'about.heading': 'عن ROGUE BYTE LLC',
    'about.subheading': 'مهمتنا هي بناء وتحليل وحماية التقنيات الرقمية الحديثة من خلال الابتكار والخبرة الفنية والأبحاث الأمنية المسؤولة.',
    'about.yearsExp': 'سنوات خبرة فنية',
    'about.projectsDone': 'مشروع ونظام منجز',
    'about.happyClients': 'شريك ومؤسسة',
    'about.expertTeam': 'مهندس وباحث أمني',
    'about.vision': 'رؤيتنا',
    'about.mission': 'رسالتنا',
    'about.values': 'مبادئنا الأساسية',
    'about.story': 'نبذة عن تأسيسنا',

    // Contact
    'contact.heading': 'بدء استشارة وتواصل فني',
    'contact.subheading': 'تواصل مباشرة مع مهندسينا وخبراء الأمن السيبراني لمناقشة تطوير الأنظمة أو الفحص الأمني.',
    'contact.name': 'الاسم الكامل',
    'contact.email': 'البريد الإلكتروني',
    'contact.phone': 'رقم الهاتف (اختياري)',
    'contact.subject': 'موضوع الرسالة / نوع الخدمة',
    'contact.message': 'تفاصيل المشروع أو الاستفسار',
    'contact.send': 'إرسال الرسالة',
    'contact.sending': 'جارٍ الإرسال...',
    'contact.success': 'تم استلام رسالتك بأمان، وسيتواصل معك فريقنا الهندسي قريباً.',
    'contact.error': 'حدث خطأ أثناء الإرسال، يرجى إعادة المحاولة.',
    'contact.info': 'بيانات المقر وقنوات التواصل',
    'contact.directReach': 'قنوات التواصل المباشرة',

    // Footer
    'footer.rights': 'جميع الحقوق محفوظة.',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'الشروط والأحكام',
    'footer.quickLinks': 'روابط سريعة',
    'footer.builtWith': 'هندسة وتطوير ROGUE BYTE LLC',

    // Common
    'common.search': 'بحث...',
    'common.filter': 'تصفية',
    'common.all': 'الكل',
    'common.back': 'رجوع',
    'common.loading': 'جارٍ التحميل...',
    'common.noData': 'لا توجد بيانات متاحة حالياً.',
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('app_lang');
    return (saved === 'ar' || saved === 'en') ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app_lang', lang);
  };

  const isRtl = language === 'ar';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  }, [language, isRtl]);

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const localize = (obj: LocalizedString | undefined | null, fallback = ''): string => {
    if (!obj) return fallback;
    return obj[language] || obj.en || obj.ar || fallback;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRtl, t, localize }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
