/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabId, Project } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import PortfolioView from './components/PortfolioView';
import AboutView from './components/AboutView';
import ProjectModal from './components/ProjectModal';
import SettingsPanel from './components/SettingsPanel';
import { Compass, Globe, Info } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [projection, setProjection] = useState('WGS84');
  const [showGrid, setShowGrid] = useState(true);
  const [coordsFormat, setCoordsFormat] = useState<'Decimal' | 'DMS'>('Decimal');
  const [themeType, setThemeType] = useState<'Soft Slate' | 'High Contrast' | 'Classic Mono'>('Soft Slate');
  const [language, setLanguage] = useState<'EN' | 'ML' | 'HI'>('EN');

  // Change html document lang & direction
  useEffect(() => {
    document.title = "Hitesh Chandra - Cartographic & Spatial Analysis Portfolio";
  }, []);

  const toggleLanguage = () => {
    if (language === 'EN') setLanguage('ML');
    else if (language === 'ML') setLanguage('HI');
    else setLanguage('EN');
  };

  // Compile themes dynamic class
  const getThemeClass = () => {
    switch (themeType) {
      case 'High Contrast':
        return 'bg-slate-900 border-slate-950 text-slate-100 font-sans dark';
      case 'Classic Mono':
        return 'bg-white text-gray-900 font-sans grayscale';
      case 'Soft Slate':
      default:
        return 'bg-slate-50 text-gray-800 font-sans';
    }
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between overflow-x-hidden transition-all duration-300 ${getThemeClass()}`}>
      
      {/* Background Dot Grid Overlay under state variables check */}
      {showGrid && <div className="fixed inset-0 dot-grid opacity-50 pointer-events-none z-0"></div>}

      {/* Global Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openSettings={() => setIsSettingsOpen(true)}
        language={language}
        toggleLanguage={toggleLanguage}
        projection={projection}
      />

      {/* Main Container with top offset for fixed navbar */}
      <main className="flex-grow pt-16 relative z-10">
        
        {/* Dynamic render tab panels */}
        {activeTab === 'home' && (
          <HomeView
            setActiveTab={setActiveTab}
            onSelectProject={setSelectedProject}
            projection={projection}
            coordsFormat={coordsFormat}
            language={language}
          />
        )}

        {activeTab === 'portfolio' && (
          <PortfolioView
            onSelectProject={setSelectedProject}
            coordsFormat={coordsFormat}
            language={language}
          />
        )}

        {activeTab === 'about' && (
          <AboutView
            language={language}
          />
        )}

      </main>

      {/* Persistent global footer */}
      <Footer 
        setActiveTab={setActiveTab} 
        language={language} 
      />

      {/* Settings configuration sidebar drawer */}
      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        projection={projection}
        setProjection={setProjection}
        showGrid={showGrid}
        setShowGrid={setShowGrid}
        coordsFormat={coordsFormat}
        setCoordsFormat={setCoordsFormat}
        themeType={themeType}
        setThemeType={setThemeType}
        language={language}
      />

      {/* Case Study Metadata Detail Modal overlay popup */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        language={language}
      />

    </div>
  );
}
