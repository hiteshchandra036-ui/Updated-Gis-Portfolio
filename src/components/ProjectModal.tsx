/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Project } from '../types';
import { X, Layers, BrainCircuit, Target, Globe, BookOpen, Cpu, Check, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import MapLightbox from './MapLightbox';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  language: 'EN' | 'ML' | 'HI';
}

export default function ProjectModal({ project, onClose, language }: ProjectModalProps) {
  const [runningAnalysis, setRunningAnalysis] = useState<string | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisLogs, setAnalysisLogs] = useState<string[]>([]);
  const [selectedScenario, setSelectedScenario] = useState('Default (Standard Boundary)');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!project) return null;

  const runSimulatedAnalytic = () => {
    setRunningAnalysis(project.id);
    setAnalysisProgress(0);
    setAnalysisLogs([`Initializing spatial analytic pipeline for: ${project.title}...`]);

    const steps = [
      { prg: 20, log: 'Connecting remote catalog databases & verified local permissions.' },
      { prg: 45, log: `Parsing GIS model input features structure: ${project.inputs[0].substring(0, 35)}...` },
      { prg: 70, log: `Interpolating mathematical values under projection standard: ${project.scale || 'Default Projection'}` },
      { prg: 90, log: 'Performing topological audit check; resolving overlapping node margins...' },
      { prg: 100, log: `SUCCESS: GIS Model compiled correctly. Accuracy Index: ${(0.87 + Math.random() * 0.1).toFixed(3)} Kappa.` }
    ];

    let currentStepIndex = 0;
    const interval = setInterval(() => {
      if (currentStepIndex < steps.length) {
        const step = steps[currentStepIndex];
        setAnalysisProgress(step.prg);
        setAnalysisLogs(prev => [...prev, `[${step.prg}%] ${step.log}`]);
        currentStepIndex++;
      } else {
        clearInterval(interval);
      }
    }, 700);
  };

  const labels = {
    EN: {
      ref: 'PROJECT_REF',
      inputs: 'GIS Database Input Layers',
      methodology: 'Workflow & Processing Steps',
      scale: 'Target Display Scale',
      scenarios: 'Operational Boundary Scenarios',
      runAnalysis: 'Execute Spatial Validation Model',
      publications: 'Associated Publication or Summit Reference'
    },
    ML: {
      ref: 'പ്രോജക്ട് റെഫറൻസ്',
      inputs: 'ജി.ഐ.എസ് ഡാറ്റാബേസ് ഇൻപുട്ടുകൾ',
      methodology: 'പ്രവർത്തന ഘട്ടങ്ങൾ',
      scale: 'ഭൂപടത്തിന്റെ സ്കെയിൽ',
      scenarios: 'പ്രവർത്തന പരിധികൾ',
      runAnalysis: 'സ്പേഷ്യൽ അനാലിസിസ് പരിശോധിക്കുക',
      publications: 'സംബന്ധിച്ച പ്രസിദ്ധീകരണങ്ങൾ / സമ്മേളനം'
    },
    HI: {
      ref: 'परियोजना संदर्भ',
      inputs: 'जीआईएस डेटाबेस इनपुट परतें',
      methodology: 'कार्यप्रवाह और प्रसंस्करण चरण',
      scale: 'लक्षित मानचित्र पैमाना',
      scenarios: 'परिचालन सीमा परिदृश्य',
      runAnalysis: 'स्थानिक सत्यापन मॉडल चलाएं',
      publications: 'संबद्ध प्रकाशन या शिखर सम्मेलन संदर्भ'
    }
  }[language];

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-gray-900/70 backdrop-blur-sm"
        onClick={onClose}
        id="modal-overlay"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="relative bg-white dark:bg-[#001733] border border-gray-200 dark:border-slate-800 rounded shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto cursor-default tech-border"
          onClick={e => e.stopPropagation()}
          id="project-modal-container"
        >
          {/* Header Image Bar */}
          <div 
            id="modal-header-image-container"
            onClick={() => setIsLightboxOpen(true)}
            className="relative h-64 md:h-80 bg-[#00142e] overflow-hidden group/image cursor-pointer"
            title="Click to view and download full map in high-res"
          >
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover opacity-85 mix-blend-normal transition-all grayscale group-hover/image:grayscale-0 group-hover/image:scale-[1.01] duration-500"
              referrerPolicy="no-referrer"
            />
            {/* Hover clear overlay */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center gap-1.5 z-10">
              <span className="bg-sky-950/90 border border-sky-400/40 text-sky-200 text-xs font-mono py-2 px-3.5 shadow-lg uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-400" />
                View Full Map (High Resolution)
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            
            {/* Close Button */}
            <button 
              id="btn-close-modal"
              onClick={onClose}
              className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white p-2 rounded-full transition-colors cursor-pointer z-10 border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title Floating */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="font-mono text-xs text-sky-300 border border-sky-300/50 px-2 py-1 uppercase tracking-wider bg-sky-950/40">
                {project.categoryTag}
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold mt-3 tracking-tight">
                {project.title}
              </h2>
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2 font-mono text-xs text-gray-300">
                <span className="flex items-center gap-1">
                  <Target className="w-3.5 h-3.5 text-sky-400" />
                  {labels.ref}: {project.ref}
                </span>
                <span className="flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-sky-400" />
                  COORD: {project.latlng}
                </span>
              </div>
            </div>
          </div>

          {/* Grid Layout Content */}
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 text-gray-800 dark:text-slate-200">
            
            {/* Main Column */}
            <div className="md:col-span-7 space-y-6">
              {/* Description */}
              <div className="space-y-2">
                <h4 className="font-display font-bold text-sm text-[#002045] dark:text-sky-300 uppercase tracking-wider">
                  Summary &amp; Project Goal
                </h4>
                <p className="font-sans text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                  {project.details}
                </p>
                <p className="font-sans text-sm text-gray-600 dark:text-slate-300 leading-relaxed italic">
                  {project.description}
                </p>
              </div>

              {/* Workflow Step Indicator */}
              <div className="space-y-3">
                <h4 className="font-display font-bold text-sm text-[#002045] dark:text-sky-300 uppercase tracking-wider flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-[#002045] dark:text-sky-400" />
                  {labels.methodology}
                </h4>
                <div className="bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-4 rounded text-xs leading-relaxed space-y-2.5 font-mono">
                  {project.methodology.split('\n').map((step, idx) => (
                    <div key={idx} className="flex gap-2 text-gray-600 dark:text-slate-400">
                      <span className="text-[#0a6c44] dark:text-emerald-400 font-bold">●</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Publications, if exists */}
              {project.publications && (
                <div className="space-y-2">
                  <h4 className="font-display font-bold text-sm text-[#002045] dark:text-sky-300 uppercase tracking-wider flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#002045] dark:text-sky-400" />
                    {labels.publications}
                  </h4>
                  <p className="font-sans text-xs text-gray-500 dark:text-slate-400 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-150 dark:border-emerald-900 px-3 py-2.5 rounded">
                    {project.publications}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar Column */}
            <div className="md:col-span-5 space-y-6">
              
              {/* Cartographic Export / High-Res view */}
              <div id="sidebar-map-export" className="bg-[#00142e] border border-sky-950/80 p-5 rounded space-y-3 shadow-md">
                <h4 className="font-display font-bold text-xs text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <Globe className="w-4 h-4 text-sky-400" />
                  Cartographic Export
                </h4>
                <p className="font-sans text-xs text-slate-300 leading-relaxed">
                  Analyze the map features, grid overlays, and legend details in clear full-color. Download the map in high resolution for reports or presentations.
                </p>
                <button
                  id="btn-sidebar-view-high-res"
                  onClick={() => setIsLightboxOpen(true)}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded font-mono text-xs uppercase tracking-wider font-semibold transition-all hover:shadow-lg cursor-pointer text-center flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  View &amp; Download Map
                </button>
              </div>

              {/* GIS Inputs */}
              <div className="bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-5 rounded">
                <h4 className="font-display font-bold text-xs text-[#002045] dark:text-sky-300 uppercase tracking-wider flex items-center gap-2 mb-4 border-b border-gray-200 dark:border-slate-800 pb-2">
                  <Layers className="w-4 h-4 text-sky-400" />
                  {labels.inputs}
                </h4>
                <ul className="space-y-3">
                  {project.inputs.map((inp, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-600 dark:text-slate-400 leading-relaxed">
                      <span className="p-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-400 mt-0.5 flex-shrink-0">
                        <Check className="w-3 h-3" />
                      </span>
                      <span>{inp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Display Scales */}
              <div className="border border-gray-200 dark:border-slate-800 p-4 rounded flex items-center justify-between text-xs font-mono">
                <span className="text-gray-400">{labels.scale}</span>
                <span className="text-[#002045] dark:text-sky-300 font-bold tracking-wider">{project.scale || 'Variable'}</span>
              </div>

              {/* Dynamic Boundary Selection */}
              <div className="space-y-2">
                <label className="font-mono text-[10px] text-gray-400 dark:text-slate-500 uppercase block">
                  {labels.scenarios}
                </label>
                <select 
                  id="select-scenario"
                  value={selectedScenario}
                  onChange={e => setSelectedScenario(e.target.value)}
                  className="w-full font-mono text-xs p-2.5 bg-white dark:bg-[#001733] border border-gray-200 dark:border-slate-800 text-gray-700 dark:text-slate-300 rounded focus:ring-1 focus:ring-sky-500"
                >
                  <option>Default (Standard Boundary)</option>
                  <option>Regional Flood Zone Buffered (+50m)</option>
                  <option>Topological Overlay Exclusion (High Buffer)</option>
                  <option>Seismic Focal Buffer Extent Model (10km)</option>
                </select>
              </div>

              {/* Execute Model Sandbox */}
              <div className="bg-[#00142e] border border-sky-950 p-5 rounded space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5 text-sky-300 font-mono text-xs uppercase tracking-wider font-semibold">
                    <Cpu className="w-4 h-4" />
                    Validation Sandbox
                  </div>
                  {runningAnalysis && (
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  )}
                </div>

                <p className="font-sans text-[11px] text-slate-400 leading-relaxed">
                  Trigger a live technical validation simulation on of the GIS database utilizing the parameters set under <b>{selectedScenario}</b>.
                </p>

                <button
                  id="btn-run-validation"
                  onClick={runSimulatedAnalytic}
                  disabled={runningAnalysis !== null && analysisProgress < 100}
                  className="w-full bg-sky-600 hover:bg-sky-500 text-white py-2.5 rounded font-mono text-xs uppercase tracking-wider font-semibold transition-all hover:shadow-lg disabled:opacity-50 cursor-pointer text-center"
                >
                  {runningAnalysis && analysisProgress < 100 ? 'Compiling GIS layers...' : labels.runAnalysis}
                </button>

                {/* Progress bar info */}
                {runningAnalysis && (
                  <div className="space-y-3 font-mono">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-sky-400 uppercase tracking-tighter">Status Progress</span>
                      <span className="text-white font-bold">{analysisProgress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-sky-950 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-sky-400 transition-all duration-300 rounded"
                        style={{ width: `${analysisProgress}%` }}
                      ></div>
                    </div>
                    
                    {/* Live log output */}
                    <div className="bg-black/40 border border-sky-950/50 p-2.5 rounded text-[10px] text-slate-300 space-y-1 max-h-24 overflow-y-auto">
                      {analysisLogs.map((log, index) => (
                        <div key={index} className="flex gap-1">
                          <span className="text-sky-400">&gt;</span>
                          <span>{log}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>
        </motion.div>

        {/* Map high resolution Lightbox modal */}
        <MapLightbox
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          imageUrl={project.image}
          title={project.title}
          language={language}
        />
      </div>
    </AnimatePresence>
  );
}
