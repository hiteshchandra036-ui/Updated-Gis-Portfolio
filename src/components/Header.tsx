/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TabId } from '../types';
import { Settings, Globe, Menu, X } from 'lucide-react';

interface HeaderProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  openSettings: () => void;
  language: 'EN' | 'ML' | 'HI';
  toggleLanguage: () => void;
  projection: string;
}

export default function Header({
  activeTab,
  setActiveTab,
  openSettings,
  language,
  toggleLanguage,
  projection
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Localization labels
  const labels = {
    EN: {
      brand: 'HITESH CHANDRA',
      portfolio: 'Portfolio',
      about: 'About',
      contact: 'Contact'
    },
    ML: {
      brand: 'ഹിതേഷ് ചന്ദ്ര',
      portfolio: 'പോർട്ട്ഫോളിയോ',
      about: 'വിവരങ്ങൾ',
      contact: 'ബന്ധപ്പെടുക'
    },
    HI: {
      brand: 'हितेश चन्द्र',
      portfolio: 'पोर्टफोलियो',
      about: 'परिचय',
      contact: 'संपर्क'
    }
  }[language];

  const handleTabClick = (tab: TabId) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    // Switch to About page where contact form is located, and scroll to it
    setActiveTab('about');
    setTimeout(() => {
      const contactSection = document.getElementById('contact-section');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  };

  return (
    <header className="bg-white/95 dark:bg-[#00142e]/95 backdrop-blur-md fixed top-0 w-full z-50 border-b border-gray-200 dark:border-slate-800 transition-colors duration-300">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 md:px-16 h-16">
        {/* Brand Logo */}
        <div 
          onClick={() => handleTabClick('home')}
          className="font-display text-lg md:text-xl font-bold text-[#002045] dark:text-sky-400 tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
          id="nav-logo"
        >
          {labels.brand}
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-12">
          <button
            id="nav-btn-home"
            onClick={() => handleTabClick('home')}
            className={`font-mono text-sm tracking-wider uppercase pb-1 border-b-2 transition-all cursor-pointer ${
              activeTab === 'home'
                ? 'text-[#002045] dark:text-sky-300 border-[#002045] dark:border-sky-300 font-semibold'
                : 'text-gray-500 dark:text-slate-400 border-transparent hover:text-[#002045] dark:hover:text-sky-300'
            }`}
          >
            Overview
          </button>
          <button
            id="nav-btn-portfolio"
            onClick={() => handleTabClick('portfolio')}
            className={`font-mono text-sm tracking-wider uppercase pb-1 border-b-2 transition-all cursor-pointer ${
              activeTab === 'portfolio'
                ? 'text-[#002045] dark:text-sky-300 border-[#002045] dark:border-sky-300 font-semibold'
                : 'text-gray-500 dark:text-slate-400 border-transparent hover:text-[#002045] dark:hover:text-sky-300'
            }`}
          >
            {labels.portfolio}
          </button>
          <button
            id="nav-btn-about"
            onClick={() => handleTabClick('about')}
            className={`font-mono text-sm tracking-wider uppercase pb-1 border-b-2 transition-all cursor-pointer ${
              activeTab === 'about'
                ? 'text-[#002045] dark:text-sky-300 border-[#002045] dark:border-sky-300 font-semibold'
                : 'text-gray-500 dark:text-slate-400 border-transparent hover:text-[#002045] dark:hover:text-sky-300'
            }`}
          >
            {labels.about}
          </button>
          <a
            id="nav-link-contact"
            href="#contact"
            onClick={handleContactClick}
            className="font-mono text-sm tracking-wider uppercase pb-1 border-b-2 border-transparent text-gray-500 dark:text-slate-400 hover:text-[#002045] dark:hover:text-sky-300 transition-all cursor-pointer"
          >
            {labels.contact}
          </a>
        </nav>

        {/* Global Toolbar */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Active Projection Tag - Desktop */}
          <span className="hidden lg:inline-block font-mono text-[11px] text-gray-400 dark:text-slate-500 tracking-wider">
            PRJ: <span className="text-[#0a6c44] dark:text-emerald-400 font-medium">{projection}</span>
          </span>

          {/* Language Toggle */}
          <button
            id="btn-toggle-lang"
            onClick={toggleLanguage}
            title="Switch Language"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors border border-gray-200 dark:border-slate-800 cursor-pointer"
          >
            <Globe className="w-4 h-4 text-[#002045] dark:text-sky-400" />
            <span className="font-mono text-xs font-semibold">{language}</span>
          </button>

          {/* Settings Button */}
          <button
            id="btn-settings"
            onClick={openSettings}
            title="Map Preferences"
            className="p-2 rounded text-[#002045] dark:text-sky-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors border border-gray-200 dark:border-slate-800 cursor-pointer"
          >
            <Settings className="w-4 h-4 animate-hover-spin" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="btn-mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded text-[#002045] dark:text-sky-400 hover:bg-gray-100 dark:hover:bg-slate-800 border border-gray-200 dark:border-slate-800 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-[#00142e] py-3 px-4 shadow-xl flex flex-col space-y-2 animate-fade-in">
          <button
            onClick={() => handleTabClick('home')}
            className={`w-full text-left font-mono py-2.5 px-4 rounded text-sm tracking-wide uppercase ${
              activeTab === 'home'
                ? 'bg-slate-100 dark:bg-slate-800 text-[#002045] dark:text-sky-300 font-semibold'
                : 'text-gray-600 dark:text-slate-400'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => handleTabClick('portfolio')}
            className={`w-full text-left font-mono py-2.5 px-4 rounded text-sm tracking-wide uppercase ${
              activeTab === 'portfolio'
                ? 'bg-slate-100 dark:bg-slate-800 text-[#002045] dark:text-sky-300 font-semibold'
                : 'text-gray-600 dark:text-slate-400'
            }`}
          >
            {labels.portfolio}
          </button>
          <button
            onClick={() => handleTabClick('about')}
            className={`w-full text-left font-mono py-2.5 px-4 rounded text-sm tracking-wide uppercase ${
              activeTab === 'about'
                ? 'bg-slate-100 dark:bg-slate-800 text-[#002045] dark:text-sky-300 font-semibold'
                : 'text-gray-600 dark:text-slate-400'
            }`}
          >
            {labels.about}
          </button>
          <button
            onClick={handleContactClick}
            className="w-full text-left font-mono py-2.5 px-4 rounded text-sm tracking-wide uppercase text-gray-600 dark:text-slate-400"
          >
            {labels.contact}
          </button>
          
          <div className="pt-2 border-t border-gray-100 dark:border-slate-800 flex justify-between items-center px-4 font-mono text-[10px] text-gray-400">
            <span>PROJECTION</span>
            <span className="text-[#0a6c44] dark:text-emerald-400 font-bold">{projection}</span>
          </div>
        </div>
      )}
    </header>
  );
}
