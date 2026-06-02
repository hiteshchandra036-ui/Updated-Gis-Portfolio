/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabId, Project } from '../types';
import { ArrowRight, Terminal, Compass, Eye, Server, RefreshCw, Cpu, Activity } from 'lucide-react';
import { PROJECTS } from '../data';

interface HomeViewProps {
  setActiveTab: (tab: TabId) => void;
  onSelectProject: (proj: Project) => void;
  projection: string;
  coordsFormat: 'Decimal' | 'DMS';
  language: 'EN' | 'ML' | 'HI';
}

interface TermLine {
  text: string;
  type: 'cmd' | 'info' | 'prg' | 'success';
}

export default function HomeView({
  setActiveTab,
  onSelectProject,
  projection,
  coordsFormat,
  language
}: HomeViewProps) {
  // Terminal Engine State
  const [activePipeline, setActivePipeline] = useState('Analytic Engine Model A');
  const [termLines, setTermLines] = useState<TermLine[]>([
    { text: 'ANALYTIC ENGINE v2.0 ACTIVE AND READY', type: 'info' },
    { text: '> INITIALIZING SPATIAL QUERY...', type: 'cmd' },
    { text: 'Accessing PostGIS database: spatial_analysis_db...', type: 'info' },
    { text: 'Parsing 1.2M vector features for topological audit...', type: 'info' },
    { text: 'Executing buffer operation: [radius=50m, join=round]', type: 'info' },
    { text: 'Generating heat density surface (Kernel Density)...', type: 'info' }
  ]);
  const [termProgress, setTermProgress] = useState(82);
  const [termStatus, setTermStatus] = useState('STATUS: INTEGRITY VERIFIED. ASSETS READY.');
  const [isCompiling, setIsCompiling] = useState(false);

  // Formatting Latitude Longitude beautifully
  const latVal = coordsFormat === 'Decimal' ? '45.523° N' : "45° 31' 22\" N";
  const lngVal = coordsFormat === 'Decimal' ? '122.676° W' : "122° 40' 33\" W";

  const runTerminalPipe = (pipeName: string) => {
    setActivePipeline(pipeName);
    setIsCompiling(true);
    setTermProgress(0);
    setTermStatus('COMPILING GRAPH LAYERS...');
    setTermLines([
      { text: `> INITIALIZING SPATIAL STREAM [${pipeName.toUpperCase()}]...`, type: 'cmd' }
    ]);

    const steps = [
      { prg: 15, text: 'Resolving topology matrices in target projection standards...', type: 'info' as const },
      { prg: 35, text: 'Querying high-fidelity remote sensing raster cells (Sentinel-2)...', type: 'info' as const },
      { prg: 60, text: 'Executing supervised Random Forest classifications...', type: 'info' as const },
      { prg: 80, text: 'Checking overlaps with regional municipal boundary shapefiles...', type: 'info' as const },
      { prg: 100, text: 'Evaluating final model accuracy indices via custom metrics...', type: 'success' as const }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        const step = steps[currentStep];
        setTermProgress(step.prg);
        setTermLines(prev => [...prev, { text: `[${step.prg}%] ${step.text}`, type: step.type }]);
        currentStep++;
      } else {
        clearInterval(interval);
        setIsCompiling(false);
        setTermStatus(`STATUS: MODEL VERIFIED. KAPPA ACCURACY: ${(0.86 + Math.random() * 0.1).toFixed(3)}`);
      }
    }, 750);
  };

  const labels = {
    EN: {
      tag: 'GIS Systems & Remote Sensing',
      title1: 'Spatial Analysis &',
      title2: 'Cartographic Design',
      bio: 'I am Hitesh Chandra, a GIS and Remote Sensing specialist with a Master\'s degree in Geography from Kannur University. I transform complex spatial datasets into intuitive visual insights using ArcGIS, QGIS, and advanced satellite imagery analysis.',
      btnExplore: 'Explore Portfolio',
      btnBio: 'Technical Bio',
      selectedBadge: 'SELECTED PROJECTS',
      selectedTitle: 'Advanced GIS Portfolio',
      btnViewAll: 'VIEW ALL CASE STUDIES',
      project1Title: 'Large Earthquake Spatial Analysis',
      project1Desc: 'Global investigation and visualization of seismic activity, mapping magnitude and casualty distribution from 2000-2020.',
      project2Title: 'NYC Population Density Mapping',
      project2Desc: 'Choropleth visualization of neighborhood tabulation areas, highlighting urban demographic concentration.'
    },
    ML: {
      tag: 'ജി.ഐ.എസ് സിസ്റ്റംസ് & റിമോട്ട് സെൻസിങ്',
      title1: 'സ്പേഷ്യൽ അനാലിസിസ് &',
      title2: 'കാർട്ടോഗ്രാഫിക്ക് ഡിസൈൻ',
      bio: 'കണ്ണൂർ യൂണിവേഴ്സിറ്റിയിൽ നിന്ന് ജിയോഗ്രാഫിയിൽ ബിരുദാനന്തര ബിരുദം നേടിയ ജി.ഐ.എസ്, റിമോട്ട് സെൻസിങ് വിദഗ്ദ്ധനാണ് ഞാൻ. ആർക്ക് ജി.ഐ.എസ്, ക്യു ജി.ഐ.എസ്, ഉപഗ്രഹ ചിത്രങ്ങൾ എന്നിവ ഉപയോഗിച്ച് സങ്കീർണ്ണമായ ഡാറ്റാസെറ്റുകളെ വ്യക്തമായ വിവരങ്ങളാക്കി മാറ്റുന്നു.',
      btnExplore: 'പോർട്ട്ഫോളിയോ കാണുക',
      btnBio: 'വിവരങ്ങൾ അറിയുക',
      selectedBadge: 'തിരഞ്ഞെടുത്ത പ്രോജക്ടുകൾ',
      selectedTitle: 'വിദഗ്ദ്ധ ജി.ഐ.എസ് പോർട്ട്ഫോളിയോ',
      btnViewAll: 'എല്ലാ പ്രോജക്ടുകളും കാണുക',
      project1Title: 'ആഗോള ഭൂകമ്പ വിശദീകരണം',
      project1Desc: 'ഭൂകമ്പങ്ങളുടെ തീവ്രതയും നാശനഷ്ടങ്ങളും രേഖപ്പെടുത്തുന്നതിനുള്ള ആഗോളതലത്തിലുള്ള മാപ്പിംഗ് പഠനം (2000-2020).',
      project2Title: 'NYC ജനസാന്ദ്രതാ മാപ്പ്',
      project2Desc: 'നഗരങ്ങളിലെ ജനസംഖ്യാ ക്രമീകരണങ്ങൾ ചിത്രീകരിക്കുന്ന കോറോപ്ലെത്ത് ഭൂപട രൂപകൽപ്പന.'
    },
    HI: {
      tag: 'जीआईएस प्रणाली और रिमोट सेंसिंग',
      title1: 'स्थानिक विश्लेषण और',
      title2: 'मानचित्रकला डिजाइन',
      bio: 'मैं हितेश चंद्र, कन्नूर विश्वविद्यालय से भूगोल में मास्टर डिग्री धारक जीआईएस और रिमोट सेंसिंग विशेषज्ञ हूं। मैं ArcGIS, QGIS और उन्नत उपग्रह इमेजरी विश्लेषण का उपयोग करके जटिल स्थानिक डेटासेट को स्पष्ट अंतर्दृष्टि में परिवर्तित करता हूं।',
      btnExplore: 'पोर्टफोलियो खोजें',
      btnBio: 'तकनीकी परिचय',
      selectedBadge: 'चयनित परियोजनाएं',
      selectedTitle: 'उन्नत जीआईएस पोर्टफोलियो',
      btnViewAll: 'सभी केस स्टडीज देखें',
      project1Title: 'वैश्विक भूकंप स्थानिक विश्लेषण',
      project1Desc: 'भूकंपीय गतिविधि की वैश्विक जांच और मानचित्रण, परिमाण और जनहानि वर्गीकरण (2000-2020)।',
      project2Title: 'NYC जनसंख्या घनत्व मानचित्रण',
      project2Desc: 'नेबरहुड टेबुलेशन क्षेत्रों का कोरोप्लेथ विज़ुअलाइज़ेशन, शहरी जनसांख्यिकीय संकेंद्रण को उजागर करना।'
    }
  }[language];

  // Projects list references
  const project1 = PROJECTS.find(p => p.id === 'global-earthquake') || PROJECTS[0];
  const project2 = PROJECTS.find(p => p.id === 'nyc-population') || PROJECTS[2];
  const uuttarakhandProj = PROJECTS.find(p => p.id === 'uttarakhand-seismic') || PROJECTS[1];
  const kochiProj = PROJECTS.find(p => p.id === 'kochi-contour') || PROJECTS[4];
  const indiaProj = PROJECTS.find(p => p.id === 'india-population') || PROJECTS[3];

  return (
    <div className="space-y-0" id="home-view-container">
      
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden border-b border-gray-200 dark:border-slate-800 bg-[#f9f9ff] dark:bg-[#000a14] transition-colors duration-300">
        {/* Background Grayscale Visual */}
        <div className="absolute inset-0 z-0 opacity-30 dark:opacity-20 pointer-events-none">
          <img 
            alt="Coastal Urban Mapping Landscape" 
            className="w-full h-full object-cover grayscale mix-blend-multiply dark:mix-blend-luminosity" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuATR0Lhy6ae9w2vfwYy6qDnel2xDK55YyauzdAqB-W9QSkjLMQ-GfnbvB3OEK2AUkWfmmWEVkpUxhR4iY0v8KjUXE_US0tDlEcaSdOZ1wr4eQ_W4VGIqcaW9E7WAWq7GISck77XUhMa2vICUNXTKs7XMLHHwNm8LGthhjaSzAXwLsASjoSKfKRooIA-evRn757L-fK6CuHo4befLFmmKeTw5pMunYGBd25ALaxWUOytdF7G7nA42BfvfIzy9O6htNICFaczhSSyZg"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f9f9ff] via-[#f9f9ff]/70 to-transparent dark:from-[#000a14] dark:via-[#000a14]/60"></div>
          <div className="absolute inset-0 map-grid-overlay"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-16 w-full">
          <div className="max-w-3xl space-y-6">
            
            {/* GIS Systems tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#002045] dark:bg-sky-950 text-white dark:text-sky-300 text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest shadow-lg">
              <Compass className="w-4 h-4 text-sky-400" />
              {labels.tag}
            </div>

            {/* Display Headings */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#002045] dark:text-sky-100 leading-tight tracking-tight">
              {labels.title1}<br />
              <span className="text-[#0a6c44] dark:text-emerald-400">{labels.title2}</span>
            </h1>

            {/* Introductory bio paragraph */}
            <p className="font-sans text-sm md:text-base text-gray-500 dark:text-slate-400 leading-relaxed max-w-xl">
              {labels.bio}
            </p>

            {/* Interactive navigation buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                id="hero-btn-explore"
                onClick={() => setActiveTab('portfolio')}
                className="bg-[#002045] hover:bg-[#001733] dark:bg-sky-600 dark:hover:bg-sky-500 text-white px-6 py-3.5 font-mono text-xs uppercase tracking-wider font-semibold flex items-center gap-2 hover:shadow-lg active:scale-95 transition-all cursor-pointer rounded"
              >
                {labels.btnExplore}
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button 
                id="hero-btn-bio"
                onClick={() => setActiveTab('about')}
                className="border-2 border-[#002045] hover:bg-[#002045] hover:text-white dark:border-sky-600 dark:text-sky-300 dark:hover:bg-sky-600 dark:hover:text-white text-[#002045] px-6 py-3.5 font-mono text-xs uppercase tracking-wider font-semibold hover:shadow-md active:scale-95 transition-all cursor-pointer rounded"
              >
                {labels.btnBio}
              </button>
            </div>

          </div>
        </div>

        {/* Floating Cartographic Details Indicator */}
        <div className="absolute bottom-12 right-16 hidden lg:block text-right border-r-2 border-[#002045] dark:border-sky-500 pr-6 space-y-2">
          <p className="font-mono text-[10px] text-[#002045] dark:text-sky-400 font-bold uppercase tracking-wider">
            PROJECTION: <span className="text-[#002045] dark:text-sky-300 font-black">{projection}</span>
          </p>
          <p className="font-mono text-[11px] text-[#002045] dark:text-sky-300 font-extrabold tracking-tight">
            {latVal} / {lngVal}
          </p>
          <div className="scale-bar-line w-40 opacity-70 bg-[#002045] dark:bg-sky-500 h-[2px]"></div>
          <p className="font-mono text-[10px] text-[#002045] dark:text-sky-300 font-black tracking-widest uppercase">
            1:50,000 SCALE
          </p>
        </div>
      </section>

      {/* Segment 2 Featured Analysis Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 md:px-16" id="selected-projects-section">
        {/* Row Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
          <div className="space-y-3">
            <span className="font-mono text-xs text-[#0a6c44] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-3 py-1 font-bold">
              {labels.selectedBadge}
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-[#002045] dark:text-sky-200 tracking-tight">
              {labels.selectedTitle}
            </h2>
          </div>
          <button 
            id="btn-all-studies"
            onClick={() => {
              setActiveTab('portfolio');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-mono text-xs text-[#002045] dark:text-sky-300 flex items-center gap-2 hover:underline underline-offset-8 decoration-2 font-bold cursor-pointer transition-all"
          >
            {labels.btnViewAll} 
            <ArrowRight className="w-4 h-4 text-[#0a6c44] dark:text-emerald-400" />
          </button>
        </div>

        {/* Bento grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Project 1: Large Featured - Global Earthquake */}
          <div 
            id="featured-card-1"
            onClick={() => onSelectProject(project1)}
            className="md:col-span-8 group cursor-pointer relative overflow-hidden aspect-[16/9] border border-gray-200 dark:border-slate-800 rounded transition-all hover:shadow-xl tech-border"
          >
            <img 
              alt="Global Earthquake Maps" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 opacity-90" 
              src={project1.image}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001733]/95 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white w-full">
              <span className="font-mono text-[10px] text-sky-300 border border-sky-300/60 px-2.5 py-1 mb-3.5 inline-block font-bold uppercase tracking-wider bg-sky-950/40">
                {project1.categoryTag}
              </span>
              <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight mb-2 group-hover:text-emerald-400 transition-colors">
                {project1.title}
              </h3>
              <p className="font-sans text-xs md:text-sm text-gray-300 max-w-lg leading-relaxed">
                {labels.project1Desc}
              </p>
            </div>
          </div>

          {/* Project 2: Vertical Info Card - NYC Density mapping */}
          <div 
            id="featured-card-2"
            onClick={() => onSelectProject(project2)}
            className="md:col-span-4 group cursor-pointer flex flex-col h-full bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-8 hover:bg-slate-100 dark:hover:bg-slate-850 transition-all border-l-4 border-l-[#002045] dark:border-l-sky-500 rounded text-gray-800 dark:text-slate-200"
          >
            <div className="font-mono text-xs text-gray-400 dark:text-slate-500 mb-6 uppercase tracking-widest flex justify-between border-b border-gray-200 dark:border-slate-800 pb-2">
              <span>NTA Demographics #005</span>
              <span>40.71° N</span>
            </div>
            
            <div className="space-y-4 my-auto">
              <h3 className="font-display text-xl font-bold text-[#002045] dark:text-sky-300 tracking-tight leading-tight group-hover:text-[#0a6c44] dark:group-hover:text-emerald-400 transition-colors">
                {project2.title}
              </h3>
              <p className="font-sans text-xs line-clamp-3 text-gray-500 dark:text-slate-400 leading-relaxed">
                {labels.project2Desc}
              </p>
              <div className="overflow-hidden bg-[#00142e] h-28 border border-gray-205 dark:border-slate-800 rounded">
                <img 
                  alt="NYC Census Grid density thumbnail" 
                  className="w-full h-full object-cover grayscale opacity-45 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" 
                  src={project2.image}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <button className="mt-8 font-mono text-xs text-[#002045] dark:text-sky-300 font-bold flex items-center gap-2 group-hover:translate-x-2 transition-transform cursor-pointer">
              EXPLORE ANALYSIS 
              <ArrowRight className="w-4 h-4 text-[#0a6c44]" />
            </button>
          </div>

          {/* Bottom Row standard multi project indicators */}
          {[
            { proj: uuttarakhandProj, subtitle: 'Detailed hazard mapping evaluating landslides & focal earthquakes.' },
            { proj: kochiProj, subtitle: 'Elevation contour tracing assessing low tide buffer lines.' },
            { proj: indiaProj, subtitle: 'Large scale publication mapping projecting state statistics.' }
          ].map(({ proj, subtitle }, idx) => (
            <div 
              key={proj.id}
              onClick={() => onSelectProject(proj)}
              className="md:col-span-4 group cursor-pointer bg-white dark:bg-[#000e21] border border-gray-200 dark:border-slate-800 rounded overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="aspect-video relative overflow-hidden bg-slate-900 border-b border-gray-200 dark:border-slate-800">
                <img 
                  alt={proj.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0 opacity-95" 
                  src={proj.image}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-[#002045]/20 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="p-6 space-y-1.5 text-gray-800 dark:text-slate-200">
                <h4 className="font-display font-semibold text-sm text-[#002045] dark:text-sky-300 group-hover:text-[#0a6c44] dark:group-hover:text-emerald-400 transition-colors">
                  {proj.title}
                </h4>
                <p className="font-sans text-xs text-gray-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {subtitle}
                </p>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* Section 3 Technical Rigor and Console dashboard */}
      <section className="bg-[#00142e] text-slate-100 py-24 border-y border-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 map-grid-overlay pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Rigor Text descriptions */}
            <div className="space-y-8">
              <div className="inline-block border-l-4 border-emerald-400 pl-4 space-y-1">
                <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight">
                  Technical Rigor &amp;<br />Cartographic Excellence
                </h2>
                <p className="font-mono text-[10px] text-sky-400 tracking-[0.22em] font-bold uppercase block pt-1">
                  METHODOLOGY OVERVIEW
                </p>
              </div>

              <p className="font-sans text-sm md:text-base text-slate-400 leading-relaxed max-w-xl">
                My approach bridges the gap between raw spatial data and actionable intelligence. I combine rigorous analytical methods with the principles of human-centric cartography to create database tools that are both mathematically precise and visually intuitive.
              </p>

              {/* Skill highlights small bento */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white/5 p-5 border border-white/10 hover:bg-white/10 transition-colors rounded">
                  <Activity className="w-6 h-6 text-emerald-400 mb-3" />
                  <h4 className="font-display font-semibold text-sm text-sky-300 mb-1">
                    Advanced Spatial Modeling
                  </h4>
                  <p className="font-sans text-xs text-slate-400 leading-relaxed">
                    Expertise in Python (ArcPy), R (sf/stars), and SQL for complex vector/raster intersections and predictive modeling.
                  </p>
                </div>
                
                <div className="bg-white/5 p-5 border border-white/10 hover:bg-white/10 transition-colors rounded">
                  <Eye className="w-6 h-6 text-emerald-400 mb-3" />
                  <h4 className="font-display font-semibold text-sm text-sky-300 mb-1">
                    Dynamic Web Mapping
                  </h4>
                  <p className="font-sans text-xs text-slate-400 leading-relaxed">
                    Deployment of interactive geospatial portals using MapLibre, Leaflet, and custom D3.js data visualizations.
                  </p>
                </div>
              </div>
            </div>

            {/* Simulated Live Console Widget */}
            <div className="relative">
              <div className="bg-[#000a14] border border-white/15 p-6 md:p-8 rounded shadow-2xl font-mono text-xs space-y-4">
                
                {/* Header console controls */}
                <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-4 text-[10px]">
                  <span className="text-sky-400 font-semibold uppercase flex items-center gap-1">
                    <Terminal className="w-3.5 h-3.5" />
                    ANALYTIC_ENGINE_v2.0
                  </span>
                  <span className={`flex items-center gap-1.5 font-bold ${isCompiling ? 'text-amber-400' : 'text-emerald-400'}`}>
                    <span className={`w-2 h-2 rounded-full ${isCompiling ? 'bg-amber-400 animate-spin' : 'bg-emerald-400 animate-pulse'}`}></span>
                    {isCompiling ? 'RUNNING_MODEL' : 'SYSTEM_LIVE'}
                  </span>
                </div>

                {/* Simulated log print stack */}
                <div className="space-y-2.5 h-56 overflow-y-auto pr-2" id="console-logs-stack">
                  {termLines.map((line, index) => (
                    <div 
                      key={index}
                      className={`leading-relaxed text-[11px] ${
                        line.type === 'cmd' 
                          ? 'text-sky-300 font-bold' 
                          : line.type === 'success' 
                            ? 'text-emerald-400 font-bold bg-slate-900/40 p-1 rounded' 
                            : 'text-slate-400'
                      }`}
                    >
                      {line.text}
                    </div>
                  ))}
                </div>

                {/* Progress evaluation loading bar */}
                <div className="space-y-1.5 pt-2 border-t border-white/5">
                  <div className="flex justify-between items-center text-[10px] text-slate-400">
                    <span>GRID INDEX LOAD RATIO</span>
                    <span>{termProgress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-sky-400 transition-all duration-300 rounded"
                      style={{ width: `${termProgress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Status verifying key */}
                <div className="text-emerald-400 text-xs font-bold pt-2 select-none">
                  &gt; {termStatus}
                </div>

                {/* Action switcher tabs supporting console query */}
                <div className="pt-4 flex flex-wrap gap-2">
                  <button 
                    id="btn-run-term-a"
                    onClick={() => runTerminalPipe('PostGIS Buffer Solver')}
                    disabled={isCompiling}
                    className="bg-sky-900/50 border border-sky-700/50 hover:bg-sky-950 text-sky-300 font-mono text-[10px] uppercase py-2 px-3 rounded tracking-wider cursor-pointer font-semibold transition-all disabled:opacity-40"
                  >
                    PostGIS Buffer
                  </button>
                  <button 
                    id="btn-run-term-b"
                    onClick={() => runTerminalPipe('Kriging Interpolator')}
                    disabled={isCompiling}
                    className="bg-sky-900/50 border border-sky-700/50 hover:bg-sky-950 text-sky-300 font-mono text-[10px] uppercase py-2 px-3 rounded tracking-wider cursor-pointer font-semibold transition-all disabled:opacity-40"
                  >
                    Ordinary Kriging
                  </button>
                  <button 
                    id="btn-run-term-c"
                    onClick={() => runTerminalPipe('LULC Neural Classification')}
                    disabled={isCompiling}
                    className="bg-sky-900/50 border border-sky-700/50 hover:bg-sky-950 text-sky-300 font-mono text-[10px] uppercase py-2 px-3 rounded tracking-wider cursor-pointer font-semibold transition-all disabled:opacity-40"
                  >
                    Neural Classification
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
