import React from 'react';
import { HeroBannerSlider } from '../components/home/HeroBannerSlider';
import { ServicesSection } from '../components/home/ServicesSection';
import { ApplicationsSection } from '../components/home/ApplicationsSection';
import { ProjectsSection } from '../components/home/ProjectsSection';
import { AboutPreviewSection } from '../components/home/AboutPreviewSection';
import { ContactCTASection } from '../components/home/ContactCTASection';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroBannerSlider />
      <ServicesSection />
      <ApplicationsSection />
      <AboutPreviewSection />
      <ProjectsSection />
      <ContactCTASection />
    </div>
  );
};
