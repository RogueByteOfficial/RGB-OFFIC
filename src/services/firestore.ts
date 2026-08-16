import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  where,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase/config';
import {
  AboutInfo,
  Application,
  Banner,
  ContactMessage,
  GeneralSettings,
  MediaItem,
  Project,
  Service,
  SocialLinks
} from '../types';
import {
  initialAbout,
  initialApplications,
  initialBanners,
  initialProjects,
  initialServices,
  initialSettings
} from './seedData';

// --- SETTINGS ---
export const getSettings = async (): Promise<GeneralSettings> => {
  try {
    const docRef = doc(db, 'settings', 'general');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as GeneralSettings;
    }
  } catch (e) {
    console.warn('Using default settings fallback:', e);
  }
  return initialSettings;
};

export const updateSettings = async (data: Partial<GeneralSettings>): Promise<void> => {
  const docRef = doc(db, 'settings', 'general');
  await setDoc(docRef, data, { merge: true });
};

// --- ABOUT ---
export const getAbout = async (): Promise<AboutInfo> => {
  try {
    const docRef = doc(db, 'about', 'company');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as AboutInfo;
    }
  } catch (e) {
    console.warn('Using default about fallback:', e);
  }
  return initialAbout;
};

export const updateAbout = async (data: Partial<AboutInfo>): Promise<void> => {
  const docRef = doc(db, 'about', 'company');
  await setDoc(docRef, data, { merge: true });
};

// --- BANNERS ---
export const getBanners = async (activeOnly = false): Promise<Banner[]> => {
  try {
    const colRef = collection(db, 'banners');
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Banner));
      items.sort((a, b) => (a.order || 0) - (b.order || 0));
      return activeOnly ? items.filter((b) => b.isActive) : items;
    }
  } catch (e) {
    console.warn('Error fetching banners:', e);
  }
  return activeOnly ? initialBanners.filter((b) => b.isActive) : initialBanners;
};

export const saveBanner = async (banner: Partial<Banner> & { id?: string }): Promise<string> => {
  const colRef = collection(db, 'banners');
  if (banner.id) {
    const docRef = doc(db, 'banners', banner.id);
    await setDoc(docRef, { ...banner }, { merge: true });
    return banner.id;
  } else {
    const docRef = await addDoc(colRef, {
      ...banner,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  }
};

export const deleteBanner = async (id: string): Promise<void> => {
  const docRef = doc(db, 'banners', id);
  await deleteDoc(docRef);
};

// --- SERVICES ---
export const getServices = async (activeOnly = false): Promise<Service[]> => {
  try {
    const colRef = collection(db, 'services');
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Service));
      items.sort((a, b) => (a.order || 0) - (b.order || 0));
      return activeOnly ? items.filter((s) => s.isActive) : items;
    }
  } catch (e) {
    console.warn('Error fetching services:', e);
  }
  return activeOnly ? initialServices.filter((s) => s.isActive) : initialServices;
};

export const saveService = async (service: Partial<Service> & { id?: string }): Promise<string> => {
  const colRef = collection(db, 'services');
  if (service.id) {
    const docRef = doc(db, 'services', service.id);
    await setDoc(docRef, { ...service }, { merge: true });
    return service.id;
  } else {
    const docRef = await addDoc(colRef, { ...service });
    return docRef.id;
  }
};

export const deleteService = async (id: string): Promise<void> => {
  const docRef = doc(db, 'services', id);
  await deleteDoc(docRef);
};

// --- APPLICATIONS ---
export const getApplications = async (activeOnly = false): Promise<Application[]> => {
  try {
    const colRef = collection(db, 'applications');
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Application));
      items.sort((a, b) => (a.order || 0) - (b.order || 0));
      return activeOnly ? items.filter((a) => a.isActive) : items;
    }
  } catch (e) {
    console.warn('Error fetching applications:', e);
  }
  return activeOnly ? initialApplications.filter((a) => a.isActive) : initialApplications;
};

export const getApplicationById = async (id: string): Promise<Application | null> => {
  try {
    const docRef = doc(db, 'applications', id);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() } as Application;
    }
  } catch (e) {
    console.warn('Error fetching application by id:', e);
  }
  const fallback = initialApplications.find((a) => a.id === id);
  return fallback || null;
};

export const saveApplication = async (appData: Partial<Application> & { id?: string }): Promise<string> => {
  const colRef = collection(db, 'applications');
  if (appData.id) {
    const docRef = doc(db, 'applications', appData.id);
    await setDoc(docRef, { ...appData }, { merge: true });
    return appData.id;
  } else {
    const docRef = await addDoc(colRef, { ...appData });
    return docRef.id;
  }
};

export const deleteApplication = async (id: string): Promise<void> => {
  const docRef = doc(db, 'applications', id);
  await deleteDoc(docRef);
};

// --- PROJECTS ---
export const getProjects = async (): Promise<Project[]> => {
  try {
    const colRef = collection(db, 'projects');
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Project));
      items.sort((a, b) => (a.order || 0) - (b.order || 0));
      return items;
    }
  } catch (e) {
    console.warn('Error fetching projects:', e);
  }
  return initialProjects;
};

export const getProjectById = async (id: string): Promise<Project | null> => {
  try {
    const docRef = doc(db, 'projects', id);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() } as Project;
    }
  } catch (e) {
    console.warn('Error fetching project by id:', e);
  }
  const fallback = initialProjects.find((p) => p.id === id);
  return fallback || null;
};

export const saveProject = async (project: Partial<Project> & { id?: string }): Promise<string> => {
  const colRef = collection(db, 'projects');
  if (project.id) {
    const docRef = doc(db, 'projects', project.id);
    await setDoc(docRef, { ...project }, { merge: true });
    return project.id;
  } else {
    const docRef = await addDoc(colRef, { ...project });
    return docRef.id;
  }
};

export const deleteProject = async (id: string): Promise<void> => {
  const docRef = doc(db, 'projects', id);
  await deleteDoc(docRef);
};

// --- MESSAGES ---
export const sendMessage = async (messageData: Omit<ContactMessage, 'id' | 'createdAt' | 'isRead'>): Promise<string> => {
  const colRef = collection(db, 'messages');
  const docRef = await addDoc(colRef, {
    ...messageData,
    createdAt: new Date().toISOString(),
    isRead: false
  });
  return docRef.id;
};

export const getMessages = async (): Promise<ContactMessage[]> => {
  try {
    const colRef = collection(db, 'messages');
    const snap = await getDocs(colRef);
    const messages = snap.docs.map((d) => ({ id: d.id, ...d.data() } as ContactMessage));
    messages.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    return messages;
  } catch (e) {
    console.warn('Error fetching messages:', e);
    return [];
  }
};

export const markMessageRead = async (id: string, isRead = true): Promise<void> => {
  const docRef = doc(db, 'messages', id);
  await updateDoc(docRef, { isRead });
};

export const deleteMessage = async (id: string): Promise<void> => {
  const docRef = doc(db, 'messages', id);
  await deleteDoc(docRef);
};

// --- MEDIA ---
export const getMediaItems = async (): Promise<MediaItem[]> => {
  try {
    const colRef = collection(db, 'media');
    const snap = await getDocs(colRef);
    const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as MediaItem));
    items.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    return items;
  } catch (e) {
    console.warn('Error fetching media:', e);
    return [];
  }
};

export const saveMediaItem = async (item: Omit<MediaItem, 'id' | 'createdAt'>): Promise<string> => {
  const colRef = collection(db, 'media');
  const docRef = await addDoc(colRef, {
    ...item,
    createdAt: new Date().toISOString()
  });
  return docRef.id;
};

export const deleteMediaItem = async (id: string): Promise<void> => {
  const docRef = doc(db, 'media', id);
  await deleteDoc(docRef);
};

// --- SEED / BOOTSTRAP DATABASE ---
export const seedDatabase = async (force = false): Promise<boolean> => {
  try {
    const settingsDoc = await getDoc(doc(db, 'settings', 'general'));
    const isOldBranding = settingsDoc.exists() && (
      JSON.stringify(settingsDoc.data()).includes('NS GROUP') ||
      JSON.stringify(settingsDoc.data()).includes('NS Tech')
    );

    if (settingsDoc.exists() && !force && !isOldBranding) {
      return false; // Already initialized with up-to-date data
    }

    // 1. Settings
    await setDoc(doc(db, 'settings', 'general'), initialSettings, { merge: true });

    // 2. About
    await setDoc(doc(db, 'about', 'company'), initialAbout, { merge: true });

    // 3. Banners
    for (const banner of initialBanners) {
      await setDoc(doc(db, 'banners', banner.id), banner, { merge: true });
    }

    // 4. Services
    for (const service of initialServices) {
      await setDoc(doc(db, 'services', service.id), service, { merge: true });
    }

    // 5. Applications
    for (const app of initialApplications) {
      await setDoc(doc(db, 'applications', app.id), app, { merge: true });
    }

    // 6. Projects
    for (const proj of initialProjects) {
      await setDoc(doc(db, 'projects', proj.id), proj, { merge: true });
    }

    console.log('Firebase Database synced to ROGUE BYTE LLC successfully!');
    return true;
  } catch (err) {
    console.error('Error seeding database:', err);
    throw err;
  }
};
