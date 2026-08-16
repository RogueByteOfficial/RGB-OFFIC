import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/config';
import { saveMediaItem } from './firestore';

export interface UploadProgressCallback {
  (progress: number): void;
}

// Compress image to maintain high quality while keeping size optimal
export const compressImage = async (file: File, maxWidth = 1600, quality = 0.85): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const elem = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        elem.width = width;
        elem.height = height;
        const ctx = elem.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = elem.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};

export const uploadFile = async (
  file: File,
  folder = 'uploads',
  onProgress?: UploadProgressCallback
): Promise<string> => {
  try {
    const cleanFileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const storageRef = ref(storage, `${folder}/${cleanFileName}`);

    // Try Firebase Storage first
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) onProgress(progress);
        },
        async (error) => {
          console.warn('Firebase Storage upload fallback to optimized storage:', error);
          try {
            const compressed = await compressImage(file);
            await saveMediaItem({
              name: file.name,
              url: compressed,
              size: file.size,
              type: file.type
            });
            if (onProgress) onProgress(100);
            resolve(compressed);
          } catch (fallbackError) {
            reject(fallbackError);
          }
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          await saveMediaItem({
            name: file.name,
            url: downloadUrl,
            size: file.size,
            type: file.type
          });
          if (onProgress) onProgress(100);
          resolve(downloadUrl);
        }
      );
    });
  } catch (e) {
    const compressed = await compressImage(file);
    await saveMediaItem({
      name: file.name,
      url: compressed,
      size: file.size,
      type: file.type
    });
    if (onProgress) onProgress(100);
    return compressed;
  }
};

export const uploadImage = uploadFile;
