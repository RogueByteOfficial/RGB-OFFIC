import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Banner } from '../../types';
import { getBanners } from '../../services/firestore';

export const HeroBannerSlider: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { isRtl, localize, t } = useLanguage();

  useEffect(() => {
    getBanners(true).then((data) => {
      if (data && data.length > 0) {
        setBanners(data);
      }
    });
  }, []);

  // 5-second auto rotation
  useEffect(() => {
    if (banners.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [banners.length, isPaused]);

  if (!banners.length) return null;

  const currentBanner = banners[currentIndex] || banners[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  return (
    <section 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative min-h-[90vh] lg:min-h-screen bg-slate-950 text-white flex items-center justify-center pt-24 pb-16 overflow-hidden select-none"
    >
      {/* Dynamic Background Glow & Grid Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.25),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      {/* Decorative floating blur spheres */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBanner.id || currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
          >
            {/* Visual Phone Mockups / Tech Graphic Display (Left side on LTR, Right side on RTL or responsive) */}
            <div className="lg:col-span-6 order-2 lg:order-1 flex justify-center items-center">
              <div className="relative w-full max-w-lg">
                {/* Visual Phones Showcase inspired by NS Group header */}
                <div className="relative flex items-center justify-center -space-x-8 rtl:space-x-reverse">
                  {/* Left Floating Device */}
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="w-40 sm:w-48 aspect-[9/18.5] bg-slate-900 rounded-[2rem] border-4 border-slate-700/60 shadow-2xl p-2 z-10 -rotate-6 transform hover:rotate-0 hover:z-30 transition-all duration-300 overflow-hidden"
                  >
                    <div className="w-full h-full rounded-[1.5rem] bg-gradient-to-b from-slate-900 to-slate-950 p-2.5 flex flex-col justify-between border border-slate-800">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-blue-400">NS Cars</span>
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      </div>
                      <div className="my-auto py-2">
                        <img 
                          src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=300&auto=format&fit=crop&q=80" 
                          alt="NS Cars"
                          className="w-full h-24 object-cover rounded-xl"
                        />
                      </div>
                      <div className="text-[9px] text-slate-400">Easy booking system</div>
                    </div>
                  </motion.div>

                  {/* Center Main Device */}
                  <motion.div 
                    initial={{ y: 0, opacity: 0 }}
                    animate={{ y: -10, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-44 sm:w-56 aspect-[9/18.5] bg-slate-900 rounded-[2.2rem] border-4 border-blue-500/80 shadow-2xl shadow-blue-500/20 p-2 z-20 hover:scale-105 transition-all duration-300 overflow-hidden"
                  >
                    <div className="w-full h-full rounded-[1.7rem] bg-gradient-to-b from-slate-900 via-slate-900 to-blue-950 p-3 flex flex-col justify-between border border-blue-500/30">
                      <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                        <span className="text-xs font-black text-white">NS PLAYER</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-600 text-white font-bold">4K</span>
                      </div>
                      <div className="my-auto flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-blue-600/30 border border-blue-400 flex items-center justify-center text-blue-400">
                          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                        <span className="text-[11px] font-bold text-slate-200">Video Player Pro</span>
                      </div>
                      <div className="w-full bg-slate-800/80 rounded-lg p-1.5 text-[9px] text-slate-300 text-center">
                        Multi-format Support
                      </div>
                    </div>
                  </motion.div>

                  {/* Right Floating Device */}
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="w-40 sm:w-48 aspect-[9/18.5] bg-slate-900 rounded-[2rem] border-4 border-slate-700/60 shadow-2xl p-2 z-10 rotate-6 transform hover:rotate-0 hover:z-30 transition-all duration-300 overflow-hidden"
                  >
                    <div className="w-full h-full rounded-[1.5rem] bg-gradient-to-b from-slate-900 to-slate-950 p-2.5 flex flex-col justify-between border border-slate-800">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-indigo-400">NS HR</span>
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                      </div>
                      <div className="my-auto py-2">
                        <img 
                          src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300&auto=format&fit=crop&q=80" 
                          alt="NS HR"
                          className="w-full h-24 object-cover rounded-xl"
                        />
                      </div>
                      <div className="text-[9px] text-slate-400">Enterprise Suite</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Banner Text Content */}
            <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col items-center lg:items-start text-center lg:text-start gap-5">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>
                  {currentBanner.badge ? localize(currentBanner.badge) : t('hero.badge')}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.2] text-white">
                {localize(currentBanner.title)}
              </h1>

              {/* Subtitle / Description */}
              <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
                {localize(currentBanner.subtitle || currentBanner.description)}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3">
                {currentBanner.buttonText && (
                  <Link
                    to={currentBanner.buttonLink || '/applications'}
                    className="px-7 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all flex items-center gap-2 group"
                  >
                    <span>{localize(currentBanner.buttonText)}</span>
                    {isRtl ? (
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    ) : (
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    )}
                  </Link>
                )}

                {currentBanner.secondaryButtonText && (
                  <Link
                    to={currentBanner.secondaryButtonLink || '/contact'}
                    className="px-6 py-3.5 rounded-xl font-semibold text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 transition-all flex items-center gap-2"
                  >
                    <span>{localize(currentBanner.secondaryButtonText)}</span>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Navigation Arrows */}
        {banners.length > 1 && (
          <div className="flex items-center justify-between w-full absolute top-1/2 left-0 right-0 -translate-y-1/2 px-2 pointer-events-none">
            <button
              onClick={handlePrev}
              aria-label="Previous Slide"
              className="pointer-events-auto p-2.5 rounded-full bg-slate-900/70 hover:bg-blue-600 text-white border border-slate-800 backdrop-blur-sm transition shadow-lg"
            >
              {isRtl ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Slide"
              className="pointer-events-auto p-2.5 rounded-full bg-slate-900/70 hover:bg-blue-600 text-white border border-slate-800 backdrop-blur-sm transition shadow-lg"
            >
              {isRtl ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
        )}

        {/* Pagination Dots with 5-second progress indicator */}
        {banners.length > 1 && (
          <div className="flex items-center justify-center gap-2.5 mt-10">
            {banners.map((banner, index) => (
              <button
                key={banner.id || index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`transition-all duration-300 rounded-full h-2 ${
                  index === currentIndex
                    ? 'w-8 bg-blue-500'
                    : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
