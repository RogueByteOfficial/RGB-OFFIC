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
    'nav.services': 'Services',
    'nav.applications': 'Applications',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact Us',
    'nav.admin': 'Admin Panel',
    'nav.getInTouch': 'Get in Touch',

    // Hero
    'hero.badge': 'NS GROUP Technologies',
    'hero.title': 'We Build the Future with Precision',
    'hero.subtitle': 'Pioneering digital experiences, mobile applications, and high-performance enterprise systems.',
    'hero.exploreWorks': 'Explore Our Work',
    'hero.contactUs': 'Contact Us',
    'hero.viewDetails': 'View Details',
    'hero.discoverApps': 'Discover Applications',

    // Services
    'services.heading': 'Our Core Services',
    'services.subheading': 'Cutting-edge digital and engineering solutions tailored for modern high-growth businesses.',
    'services.viewAll': 'View All Services',
    'services.learnMore': 'Learn More',

    // Applications
    'apps.heading': 'Latest Applications',
    'apps.subheading': 'Explore the mobile and web software ecosystem developed and engineered by our team.',
    'apps.viewAll': 'View All Applications',
    'apps.viewDetails': 'View Details',
    'apps.version': 'Version',
    'apps.releaseDate': 'Released',
    'apps.status': 'Status',
    'apps.status.live': 'Live in Store',
    'apps.status.beta': 'Public Beta',
    'apps.status.in_development': 'In Development',
    'apps.features': 'Key Features',
    'apps.technologies': 'Technologies Used',
    'apps.download': 'Download & Access',
    'apps.screenshots': 'App Screenshots',
    'apps.googlePlay': 'Google Play',
    'apps.appStore': 'App Store',
    'apps.webApp': 'Web App',
    'apps.sourceCode': 'Source Code',

    // Projects
    'projects.heading': 'Featured Portfolio',
    'projects.subheading': 'A selection of bespoke digital transformation projects delivered to clients worldwide.',
    'projects.viewAll': 'View All Projects',
    'projects.livePreview': 'Live Preview',
    'projects.github': 'GitHub',
    'projects.client': 'Client',
    'projects.date': 'Completion Date',

    // About
    'about.heading': 'About Our Company',
    'about.subheading': 'Engineering innovation, empowering enterprises, and building sustainable digital ecosystems.',
    'about.yearsExp': 'Years Experience',
    'about.projectsDone': 'Projects Delivered',
    'about.happyClients': 'Satisfied Clients',
    'about.expertTeam': 'Team Experts',
    'about.vision': 'Our Vision',
    'about.mission': 'Our Mission',
    'about.values': 'Core Values',
    'about.story': 'Our Story',

    // Contact
    'contact.heading': 'Get in Touch',
    'contact.subheading': 'Have a project in mind or want to collaborate? Send us a message and we will respond swiftly.',
    'contact.name': 'Your Full Name',
    'contact.email': 'Email Address',
    'contact.phone': 'Phone Number (Optional)',
    'contact.subject': 'Subject',
    'contact.message': 'Your Message',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending message...',
    'contact.success': 'Your message has been sent successfully. We will contact you soon!',
    'contact.error': 'Failed to send message. Please try again.',
    'contact.info': 'Contact Information',
    'contact.directReach': 'Direct Channels',

    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.quickLinks': 'Quick Links',
    'footer.builtWith': 'Engineered by NS Technologies',

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
    'nav.about': 'من نحن',
    'nav.services': 'خدماتنا',
    'nav.applications': 'تطبيقاتنا',
    'nav.projects': 'أعمالنا',
    'nav.contact': 'تواصل معنا',
    'nav.admin': 'لوحة التحكم',
    'nav.getInTouch': 'تواصل معنا',

    // Hero
    'hero.badge': 'NS GROUP Technologies',
    'hero.title': 'نحن نصنع التقنية من أجل المستقبل',
    'hero.subtitle': 'شركة تقنية متخصصة في تطوير التطبيقات والحلول الرقمية المبتكرة للشركات والأفراد.',
    'hero.exploreWorks': 'استكشف أعمالنا',
    'hero.contactUs': 'تواصل معنا',
    'hero.viewDetails': 'عرض التفاصيل',
    'hero.discoverApps': 'اكتشف التطبيقات',

    // Services
    'services.heading': 'خدماتنا المتطورة',
    'services.subheading': 'حلول برمجية وهندسية متكاملة مصممة خصيصاً لتمكين الشركات وتسريع النمو الرقمي.',
    'services.viewAll': 'عرض جميع الخدمات',
    'services.learnMore': 'معرفة المزيد',

    // Applications
    'apps.heading': 'أحدث تطبيقاتنا',
    'apps.subheading': 'منظومة تطبيقات الهاتف والويب التي قمنا بتطويرها وفق أعلى المعايير التقنية.',
    'apps.viewAll': 'عرض جميع التطبيقات',
    'apps.viewDetails': 'عرض التفاصيل',
    'apps.version': 'الإصدار',
    'apps.releaseDate': 'تاريخ الإطلاق',
    'apps.status': 'الحالة',
    'apps.status.live': 'متاح في المتجر',
    'apps.status.beta': 'نسخة تجريبية',
    'apps.status.in_development': 'قيد التطوير',
    'apps.features': 'المميزات الرئيسية',
    'apps.technologies': 'التقنيات المستخدمة',
    'apps.download': 'تحميل واستخدام التطبيق',
    'apps.screenshots': 'لقطات الشاشة',
    'apps.googlePlay': 'Google Play',
    'apps.appStore': 'App Store',
    'apps.webApp': 'تطبيق الويب',
    'apps.sourceCode': 'الكود المصدري',

    // Projects
    'projects.heading': 'معرض المشاريع والأعمال',
    'projects.subheading': 'نماذج من المشاريع الرقمية والأنظمة التقنية التي نفذناها لعملائنا بنجاح.',
    'projects.viewAll': 'عرض جميع الأعمال',
    'projects.livePreview': 'معاينة حية',
    'projects.github': 'المستودع البرمجي',
    'projects.client': 'العميل / الجهة',
    'projects.date': 'تاريخ الإنجاز',

    // About
    'about.heading': 'من نحن',
    'about.subheading': 'نبتكر الحلول الرقمية، ونمكن الشركات من الريادة عبر برمجيات متقدمة ومستدامة.',
    'about.yearsExp': 'سنوات خبرة',
    'about.projectsDone': 'مشروع منجز',
    'about.happyClients': 'عميل سعيد',
    'about.expertTeam': 'خبير ومطور',
    'about.vision': 'رؤيتنا',
    'about.mission': 'رسالتنا',
    'about.values': 'قيمنا الأساسية',
    'about.story': 'قصتنا',

    // Contact
    'contact.heading': 'تواصل معنا',
    'contact.subheading': 'هل لديك فكرة تطبيق أو مشروع رقمي ترغب في تحويله إلى واقع؟ تواصل معنا اليوم.',
    'contact.name': 'الاسم الكامل',
    'contact.email': 'البريد الإلكتروني',
    'contact.phone': 'رقم الهاتف (اختياري)',
    'contact.subject': 'موضوع الرسالة',
    'contact.message': 'تفاصيل الرسالة',
    'contact.send': 'إرسال الرسالة',
    'contact.sending': 'جارٍ الإرسال...',
    'contact.success': 'تم إرسال رسالتك بنجاح! سنقوم بالرد عليك في أقرب وقت.',
    'contact.error': 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.',
    'contact.info': 'معلومات التواصل',
    'contact.directReach': 'قنوات مباشرة',

    // Footer
    'footer.rights': 'جميع الحقوق محفوظة.',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'الشروط والأحكام',
    'footer.quickLinks': 'روابط سريعة',
    'footer.builtWith': 'تطوير وهندسة NS Technologies',

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
    return (saved === 'ar' || saved === 'en') ? saved : 'en'; // Default English as requested
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
