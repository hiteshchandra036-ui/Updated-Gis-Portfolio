/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Layers, Sliders, ToggleLeft, Sparkles, Orbit } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  projection: string;
  setProjection: (proj: string) => void;
  showGrid: boolean;
  setShowGrid: (show: boolean) => void;
  coordsFormat: 'Decimal' | 'DMS';
  setCoordsFormat: (format: 'Decimal' | 'DMS') => void;
  themeType: 'Soft Slate' | 'High Contrast' | 'Classic Mono';
  setThemeType: (theme: 'Soft Slate' | 'High Contrast' | 'Classic Mono') => void;
  language: 'EN' | 'ML' | 'HI';
}

export default function SettingsPanel({
  isOpen,
  onClose,
  projection,
  setProjection,
  showGrid,
  setShowGrid,
  coordsFormat,
  setCoordsFormat,
  themeType,
  setThemeType,
  language
}: SettingsPanelProps) {
  if (!isOpen) return null;

  const labels = {
    EN: {
      title: 'Cartographic Preferences',
      subtitle: 'Customize localized grid layouts & project scales',
      projection: 'Mathematical Projection Standards',
      grid: 'Background Map Grid Lines',
      gridDesc: 'Render interactive dot overlays on background sections',
      coords: 'Coordinate Degree Formatting',
      theme: 'Visual Contrast Presets',
      close: 'Apply Configurations'
    },
    ML: {
      title: 'കാർട്ടോഗ്രാഫിക്ക് ക്രമീകരണങ്ങൾ',
      subtitle: 'ഭൂപടത്തിന്റെ ഗ്രിഡ് ലേഔട്ടുകളും സ്കെയിലുകളും ക്രമീകരിക്കുക',
      projection: 'മാത്തമാറ്റിക്കൽ പ്രൊജക്ഷൻ സ്റ്റാൻഡേർഡ്',
      grid: 'ബാക്ക്ഗ്രൗണ്ട് മാപ്പ് ഗ്രിഡ് ലൈനുകൾ',
      gridDesc: 'പശ്ചാത്തലത്തിൽ ഡോട്ടഡ് ഗ്രിഡ് ഓവർലേ കാണിക്കുക',
      coords: 'കോർഡിനേറ്റ് ഫോർമാറ്റിംഗ്',
      theme: 'വിഷ്വൽ തീം പ്രീസെറ്റുകൾ',
      close: 'ക്രമീകരണങ്ങൾ സംരക്ഷിക്കുക'
    },
    HI: {
      title: 'मानचित्रकला प्राथमिकताएं',
      subtitle: 'स्थानिक ग्रिड लेआउट और पैमाना अनुकूलित करें',
      projection: 'गणितीय प्रक्षेपण मानक',
      grid: 'पृष्ठभूमि ग्रिड रेखाएँ',
      gridDesc: 'पृष्ठभूमि में बिंदु ओवरले प्रदर्शित करें',
      coords: 'समन्वय डिग्री प्रारूप',
      theme: 'दृश्य कंट्रास्ट प्रीसेट',
      close: 'कॉन्फ़िगरेशन लागू करें'
    }
  }[language];

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 overflow-hidden flex justify-end"
        id="settings-drawer-container"
        onClick={onClose}
      >
        {/* Backdrop overlay filter */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"></div>

        {/* Panel side alignment right */}
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="relative w-full max-w-sm bg-white dark:bg-[#001733] border-l border-gray-150 dark:border-slate-800 shadow-2xl h-screen flex flex-col cursor-default"
          onClick={e => e.stopPropagation()}
        >
          {/* Drawer Header */}
          <div className="p-6 border-b border-gray-150 dark:border-slate-800 flex justify-between items-center bg-gray-50 dark:bg-[#000e21]">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#0a6c44] dark:text-emerald-400 uppercase tracking-widest font-semibold">
                <Sliders className="w-3.5 h-3.5" />
                Parameters
              </div>
              <h3 className="font-display font-bold text-lg text-[#002045] dark:text-sky-300 mt-1">
                {labels.title}
              </h3>
              <p className="font-sans text-xs text-gray-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                {labels.subtitle}
              </p>
            </div>
            <button 
              id="settings-btn-close"
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-800 dark:hover:text-white rounded hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body Form Settings */}
          <div className="p-6 flex-grow space-y-8 overflow-y-auto">
            {/* Projection selection */}
            <div className="space-y-3">
              <label className="font-display font-bold text-xs text-gray-700 dark:text-slate-300 uppercase tracking-wider block">
                {labels.projection}
              </label>
              <select 
                id="select-projection"
                value={projection}
                onChange={e => setProjection(e.target.value)}
                className="w-full font-mono text-xs p-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-gray-700 dark:text-slate-300 rounded focus:ring-1 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="WGS84">WGS84 (Spherical - EPSG:4326)</option>
                <option value="UTM Zone 44N">UTM Zone 44N (Projection - EPSG:32644)</option>
                <option value="Lambert Conformal">Lambert Conformal Conic (Sovereign)</option>
                <option value="Web Mercator">Web Mercator (Cylindrical - EPSG:3857)</option>
              </select>
              <p className="font-mono text-[10px] text-gray-400 dark:text-slate-500 flex items-center gap-1">
                <Orbit className="w-3 h-3 text-sky-400" />
                Guides ratio sizing calculations across case models.
              </p>
            </div>

            {/* Grid Toggle */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="font-display font-bold text-xs text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                  {labels.grid}
                </label>
                <button
                  id="btn-toggle-grid"
                  onClick={() => setShowGrid(!showGrid)}
                  className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer ${
                    showGrid 
                      ? 'bg-[#0a6c44] dark:bg-emerald-600' 
                      : 'bg-gray-200 dark:bg-slate-800'
                  }`}
                >
                  <div 
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      showGrid ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  ></div>
                </button>
              </div>
              <p className="font-sans text-[11px] text-gray-400 dark:text-slate-500 leading-relaxed">
                {labels.gridDesc}
              </p>
            </div>

            {/* Coordinates Formatting */}
            <div className="space-y-3">
              <label className="font-display font-bold text-xs text-gray-700 dark:text-slate-300 uppercase tracking-wider block">
                {labels.coords}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  id="btn-coord-dec"
                  onClick={() => setCoordsFormat('Decimal')}
                  className={`py-2 px-3 text-center text-xs font-mono rounded transition-all cursor-pointer ${
                    coordsFormat === 'Decimal'
                      ? 'bg-[#002045] dark:bg-sky-600 text-white font-bold'
                      : 'bg-gray-50 dark:bg-slate-900 border border-gray-150 dark:border-slate-800 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  Decimal (e.g. 30.06°)
                </button>
                <button
                  id="btn-coord-dms"
                  onClick={() => setCoordsFormat('DMS')}
                  className={`py-2 px-3 text-center text-xs font-mono rounded transition-all cursor-pointer ${
                    coordsFormat === 'DMS'
                      ? 'bg-[#002045] dark:bg-sky-600 text-white font-bold'
                      : 'bg-gray-50 dark:bg-slate-900 border border-gray-150 dark:border-slate-800 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  DMS (e.g. 30° 3' 36" N)
                </button>
              </div>
            </div>

            {/* Contrast Preset Selection */}
            <div className="space-y-3">
              <label className="font-display font-bold text-xs text-gray-700 dark:text-slate-300 uppercase tracking-wider block">
                {labels.theme}
              </label>
              <div className="flex flex-col space-y-2">
                {(['Soft Slate', 'High Contrast', 'Classic Mono'] as const).map(th => (
                  <button
                    key={th}
                    id={`btn-theme-${th.replace(' ', '-').toLowerCase()}`}
                    onClick={() => setThemeType(th)}
                    className={`w-full py-2.5 px-4 text-left text-xs font-mono rounded flex justify-between items-center transition-all border cursor-pointer ${
                      themeType === th
                        ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500 text-[#002045] dark:text-emerald-400 font-bold'
                        : 'bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <span>{th}</span>
                    {themeType === th && <Sparkles className="w-3.5 h-3.5 text-emerald-500" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Drawer Footer Actions */}
          <div className="p-6 border-t border-gray-150 dark:border-slate-800 bg-gray-50 dark:bg-[#000e21]">
            <button
              id="btn-settings-close-nav"
              onClick={onClose}
              className="w-full bg-[#002045] hover:bg-[#001733] dark:bg-sky-600 dark:hover:bg-sky-500 text-white py-3 rounded font-mono text-xs uppercase tracking-wider font-semibold transition-all hover:shadow-lg text-center cursor-pointer"
            >
              {labels.close}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
