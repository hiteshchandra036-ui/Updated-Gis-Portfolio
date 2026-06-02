/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Project } from '../types';
import { PROJECTS } from '../data';
import { Search, Compass, Sliders, MapPin, Grid, AlertCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PortfolioViewProps {
  onSelectProject: (proj: Project) => void;
  language: 'EN' | 'ML' | 'HI';
  coordsFormat: 'Decimal' | 'DMS';
}

type CategoryFilter = 'All' | 'Remote Sensing' | 'Urban Planning' | 'Hydrology' | 'Geophysics';

export default function PortfolioView({ onSelectProject, language, coordsFormat }: PortfolioViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  // Categories list
  const categories: CategoryFilter[] = ['All', 'Remote Sensing', 'Urban Planning', 'Hydrology', 'Geophysics'];

  // Dynamically compile all tags across projects
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    PROJECTS.forEach(proj => {
      proj.tags.forEach(t => tagsSet.add(t));
    });
    return ['All', ...Array.from(tagsSet)];
  }, []);

  // Filter projects by search query, category, and specific tool tag
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(proj => {
      const matchSearch = 
        proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.details.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchCategory = selectedCategory === 'All' || proj.category === selectedCategory;
      const matchTag = selectedTag === 'All' || proj.tags.includes(selectedTag);

      return matchSearch && matchCategory && matchTag;
    });
  }, [searchQuery, selectedCategory, selectedTag]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedTag('All');
  };

  const formatCoord = (latlng: string) => {
    if (latlng === 'GLOBAL' || latlng === 'STATE_LEVEL' || latlng === 'ASSAM' || latlng === 'MYANMAR') {
      return latlng;
    }
    if (coordsFormat === 'Decimal') return latlng;
    
    // Simple DMS conversion for standard inputs
    if (latlng.includes('30.06° N')) return "30° 3' N";
    if (latlng.includes('40.71° N')) return "40° 42' N";
    if (latlng.includes('9.93° N')) return "9° 55' N";
    
    return latlng;
  };

  const labels = {
    EN: {
      title: 'Geospatial Project Catalog',
      subtitle: 'Browse professional map products, regional hazard assessments, and satellite pipelines',
      placeholder: 'Search map projects, tools, datasets...',
      categoryBadge: 'Categories',
      toolBadge: 'Technical Toolset Filters',
      emptyTitle: 'No Map Archives Found',
      emptySub: 'Try loosening your search terms or resetting filters.',
      btnReset: 'Clear Filters',
      viewCase: 'EXPLORE CASE MODEL'
    },
    ML: {
      title: 'ജി.ഐ.എസ് ഭൂപട നിർമ്മിതികൾ',
      subtitle: 'വിവിധ ഭൂപടങ്ങൾ, ദുരന്ത നിവാരണ പദ്ധതികൾ, ഉപഗ്രഹ ചിത്ര വിവരങ്ങൾ എന്നിവ കാണുക',
      placeholder: 'ഭൂപടങ്ങളും ടൂളുകളും തിരയുക...',
      categoryBadge: 'വിഭാഗങ്ങൾ',
      toolBadge: 'സാങ്കേതിക ടൂളുകൾ',
      emptyTitle: 'ഭൂപടങ്ങൾ കണ്ടെത്തിയില്ല',
      emptySub: 'തിരയൽ പദങ്ങൾ മാറ്റുകയോ ഫിൽട്ടറുകൾ നീക്കം ചെയ്യുകയോ ചെയ്യുക.',
      btnReset: 'ക്ലിയർ ഫിൽട്ടറുകൾ',
      viewCase: 'വിശദ വിവരങ്ങൾ കാണുക'
    },
    HI: {
      title: 'स्थानिक मानचित्र कैटलॉग',
      subtitle: 'स्थानिक अध्ययनों, क्षेत्रीय खतरा आकलनों और उपग्रह प्रणालियों का अन्वेषण करें',
      placeholder: 'मानचित्र परियोजनाओं, उपकरणों, डेटासेट को खोजें...',
      categoryBadge: 'श्रेणियाँ',
      toolBadge: 'तकनीकी उपकरण फिल्टर',
      emptyTitle: 'कोई मानचित्र डेटाबेस नहीं मिला',
      emptySub: 'कृपया खोज शब्दों को बदलें या फ़िल्टर को साफ़ करें।',
      btnReset: 'फ़िल्टर साफ़ करें',
      viewCase: 'केस मॉडल खोजें'
    }
  }[language];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-16 py-16 space-y-12" id="portfolio-view-container">
      
      {/* Title block */}
      <div className="space-y-3">
        <span className="font-mono text-xs text-[#0a6c44] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-3 py-1 font-bold">
          MAP REPOSITORY
        </span>
        <h1 className="font-display text-3xl md:text-4xl font-extrabold text-[#002045] dark:text-sky-200 tracking-tight">
          {labels.title}
        </h1>
        <p className="font-sans text-sm text-gray-500 dark:text-slate-400 max-w-2xl leading-relaxed">
          {labels.subtitle}
        </p>
      </div>

      {/* Control filters dashboard */}
      <div className="bg-slate-50 dark:bg-[#000e21] border border-gray-150 dark:border-slate-800 p-6 rounded space-y-6">
        
        {/* Search row */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-3.5 text-gray-400 dark:text-slate-500" />
          <input
            id="search-input"
            type="text"
            placeholder={labels.placeholder}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-[#00142e] border border-gray-200 dark:border-slate-800 p-3.5 pl-12 rounded font-mono text-xs text-gray-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        {/* Categories toggler block */}
        <div className="space-y-3">
          <h4 className="font-mono text-[10px] text-gray-400 dark:text-slate-500 uppercase tracking-widest font-bold">
            {labels.categoryBadge}
          </h4>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                id={`filter-cat-${cat.replace(' ', '-').toLowerCase()}`}
                onClick={() => setSelectedCategory(cat)}
                className={`py-2 px-3.5 text-xs font-mono rounded select-none cursor-pointer transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#002045] dark:bg-sky-600 text-white font-bold shadow-sm'
                    : 'bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-gray-600 dark:text-slate-400 hover:border-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Specific tags list */}
        <div className="space-y-3 pt-2 border-t border-gray-200/50 dark:border-slate-800/50">
          <h4 className="font-mono text-[10px] text-gray-400 dark:text-slate-500 uppercase tracking-widest font-bold">
            {labels.toolBadge}
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {allTags.map(tag => (
              <button
                key={tag}
                id={`filter-tag-${tag.replace(' ', '-').toLowerCase()}`}
                onClick={() => setSelectedTag(tag)}
                className={`py-1.5 px-3 rounded-full text-[10px] font-mono cursor-pointer transition-all ${
                  selectedTag === tag
                    ? 'bg-[#0a6c44] dark:bg-emerald-600 text-white font-bold'
                    : 'bg-white dark:bg-slate-900 text-gray-500 dark:text-slate-500 border border-gray-200 dark:border-slate-800 hover:bg-slate-100'
                }`}
              >
                {tag === 'All' ? 'ANY_TOOL' : tag}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Grid listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map(proj => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              key={proj.id}
              id={`project-card-${proj.id}`}
              onClick={() => onSelectProject(proj)}
              className="group cursor-pointer bg-white dark:bg-[#001733] border border-gray-150 dark:border-slate-800 rounded overflow-hidden hover:shadow-xl transition-all flex flex-col h-full hover:-translate-y-1 duration-300"
            >
              {/* Top header values card */}
              <div className="aspect-video relative overflow-hidden bg-slate-900 border-b border-gray-200 dark:border-slate-800">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-95"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-xs text-white text-[9px] font-mono font-bold py-1 px-2 uppercase border border-white/10 tracking-widest">
                  REF: {proj.ref}
                </div>
                <div className="absolute top-3 right-3 bg-emerald-800/85 backdrop-blur-xs text-white text-[9px] font-mono py-1 px-2 border border-emerald-600/50 flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5" />
                  {formatCoord(proj.latlng)}
                </div>
              </div>

              {/* Bottom details block */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="font-mono text-[9px] text-[#002045] dark:text-sky-300 font-bold tracking-widest uppercase block">
                    {proj.category}
                  </span>
                  <h3 className="font-display font-bold text-base text-[#002045] dark:text-slate-100 group-hover:text-[#0a6c44] dark:group-hover:text-emerald-400 transition-colors tracking-tight leading-snug">
                    {proj.title}
                  </h3>
                  <p className="font-sans text-xs text-gray-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                {/* Bottom tag tools badges */}
                <div className="pt-4 border-t border-gray-100 dark:border-slate-800/60 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {proj.tags.slice(0, 2).map(t => (
                      <span key={t} className="bg-slate-50 dark:bg-sky-950/40 text-gray-500 dark:text-sky-300 py-1 px-2 rounded text-[9px] font-mono">
                        #{t}
                      </span>
                    ))}
                  </div>
                  <span className="font-mono text-[10px] text-[#002045] dark:text-sky-300 font-bold uppercase tracking-wider group-hover:underline cursor-pointer">
                    {labels.viewCase}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State, if list is empty */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-20 bg-slate-50 dark:bg-[#000e21] border border-dashed border-gray-200 dark:border-slate-800 rounded space-y-4 max-w-lg mx-auto">
          <AlertCircle className="w-12 h-12 text-gray-300 dark:text-slate-600 mx-auto" />
          <div>
            <h3 className="font-display font-bold text-gray-700 dark:text-slate-300 text-lg">
              {labels.emptyTitle}
            </h3>
            <p className="font-sans text-xs text-gray-500 dark:text-slate-500">
              {labels.emptySub}
            </p>
          </div>
          <button
            id="btn-filters-reset-empty"
            onClick={resetFilters}
            className="inline-flex items-center gap-2 bg-[#002045] hover:bg-[#001733] dark:bg-sky-600 text-white px-4 py-2 rounded font-mono text-xs uppercase tracking-wider cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {labels.btnReset}
          </button>
        </div>
      )}

    </div>
  );
}
