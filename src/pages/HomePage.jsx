import React from 'react';

// Temporarily import sections that will be part of HomePage
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import AboutSection from '../components/AboutSection';
import TestimonialsSection from '../components/TestimonialsSection';
import GallerySection from '../components/GallerySection';
import ContactSection from '../components/ContactSection';

function HomePage() {
    return (
        <>
            <HeroSection />
            <ServicesSection />
            <AboutSection />
            <TestimonialsSection />
            <GallerySection />
            <ContactSection />
        </>
    );
}

export default HomePage;
