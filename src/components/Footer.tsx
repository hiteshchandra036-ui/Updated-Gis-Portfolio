/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TabId } from '../types';

interface FooterProps {
  setActiveTab: (tab: TabId) => void;
  language: 'EN' | 'ML' | 'HI';
}

export default function Footer({ setActiveTab, language }: FooterProps) {
  const handleTabClick = (tab: TabId) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const labels = {
    EN: {
      bio: 'Professional GIS Specialist & Remote Sensing Analyst based in India. Specializing in spatial intelligence and precision cartography.',
      nav: 'Navigation',
      portfolio: 'Portfolio',
      about: 'About My Work',
      papers: 'Technical Papers',
      contact: 'Contact',
      connect: 'Connect',
      status: 'Available for spatial consulting and collaborative research.',
      meta: 'BUILT WITH CARTOGRAPHIC PRECISION'
    },
    ML: {
      bio: 'ഇന്ത്യ ആസ്ഥാനമായി പ്രവർത്തിക്കുന്ന പ്രൊഫഷണൽ ജി.ഐ.എസ് വിദഗ്ദ്ധനും റിമോട്ട് സെൻസിങ് അനലിസ്റ്റും. ഭൂപട രൂപകൽപ്പനയിലും സ്പേഷ്യൽ അനാലിസിസിലും വൈദഗ്ദ്ധ്യം.',
      nav: 'നാവിഗേഷൻ',
      portfolio: 'പോർട്ട്ഫോളിയോ',
      about: 'എന്റെ പ്രവർത്തനങ്ങൾ',
      papers: 'സാങ്കേതിക ലേഖനങ്ങൾ',
      contact: 'ബന്ധപ്പെടുക',
      connect: 'ബന്ധങ്ങൾ',
      status: 'സ്പേഷ്യൽ കൺസൾട്ടിംഗിനും സംയുക്ത ഗവേഷണങ്ങൾക്കും ലഭ്യമാണ്.',
      meta: 'കാർട്ടോഗ്രാഫിക് കൃത്യതയോടെ നിർമ്മിച്ചത്'
    },
    HI: {
      bio: 'भारत में स्थित व्यावसायिक जीआईएस विशेषज्ञ और रिमोट सेंसिंग विश्लेषक। स्थानिक बुद्धिमत्ता और सटीक मानचित्रकला में विशेषज्ञता।',
      nav: 'मार्गदर्शन',
      portfolio: 'पोर्टफोलियो',
      about: 'मेरे शोध कार्य',
      papers: 'तकनीकी शोध पत्र',
      contact: 'संपर्क',
      connect: 'जुड़ें',
      status: 'स्थानिक परामर्श और सहयोगात्मक अनुसंधान के लिए उपलब्ध।',
      meta: 'मानचित्रकला परिशुद्धता के साथ निर्मित'
    }
  }[language];

  return (
    <footer className="bg-white dark:bg-[#000a14] border-t border-gray-200 dark:border-slate-800 w-full transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start mb-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="font-display font-bold text-lg text-[#002045] dark:text-sky-400 tracking-tight">
              HITESH CHANDRA
            </div>
            <p className="font-sans text-sm text-gray-500 dark:text-slate-400 leading-relaxed max-w-xs">
              {labels.bio}
            </p>
          </div>

          {/* Nav Col */}
          <div>
            <h5 className="font-mono text-xs font-bold text-[#002045] dark:text-sky-300 mb-4 uppercase tracking-widest">
              {labels.nav}
            </h5>
            <ul className="space-y-2.5 text-sm text-gray-600 dark:text-slate-400">
              <li>
                <button 
                  onClick={() => handleTabClick('home')} 
                  className="hover:text-[#002045] dark:hover:text-sky-300 hover:underline transition-all cursor-pointer text-left"
                >
                  Overview
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleTabClick('portfolio')} 
                  className="hover:text-[#002045] dark:hover:text-sky-300 hover:underline transition-all cursor-pointer text-left"
                >
                  {labels.portfolio}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleTabClick('about')} 
                  className="hover:text-[#002045] dark:hover:text-sky-300 hover:underline transition-all cursor-pointer text-left"
                >
                  {labels.about}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    handleTabClick('about');
                    setTimeout(() => {
                      document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }} 
                  className="hover:text-[#002045] dark:hover:text-sky-300 hover:underline transition-all cursor-pointer text-left"
                >
                  {labels.papers} &amp; {labels.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Socials Col */}
          <div className="md:text-right space-y-6">
            <div>
              <h5 className="font-mono text-xs font-bold text-[#002045] dark:text-sky-300 mb-4 uppercase tracking-widest md:justify-end flex">
                {labels.connect}
              </h5>
              <div className="flex md:justify-end gap-6 text-sm">
                <a 
                  href="https://linkedin.com/in/hitesh-chandra" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-gray-500 dark:text-slate-400 hover:text-[#002045] dark:hover:text-sky-300 hover:underline font-medium transition-all"
                >
                  LinkedIn
                </a>
                <a 
                  href="https://github.com/hiteshchandra" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-gray-500 dark:text-slate-400 hover:text-[#002045] dark:hover:text-sky-300 hover:underline font-medium transition-all"
                >
                  GitHub
                </a>
              </div>
            </div>
            <p className="text-xs text-gray-400 dark:text-slate-500 italic max-w-xs md:ml-auto">
              {labels.status}
            </p>
          </div>
        </div>

        {/* Decorative Map Scale Bar in Footer */}
        <div className="pt-8 border-t border-gray-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 w-full md:w-80">
            <span className="font-mono text-[10px] text-gray-400 dark:text-slate-500">0 KM</span>
            <div className="scale-bar-line opacity-30 dark:opacity-20 flex-1"></div>
            <span className="font-mono text-[10px] text-gray-400 dark:text-slate-500 font-bold">250 KM</span>
          </div>
          
          <p className="font-mono text-[10px] text-gray-400 dark:text-slate-500 uppercase tracking-widest text-center">
            © 2026 HITESH CHANDRA | {labels.meta}
          </p>
        </div>
      </div>
    </footer>
  );
}
