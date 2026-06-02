/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, GraduationCap, MapPin, Database, Award, BookOpen, Send, Download, CheckCircle, HelpCircle } from 'lucide-react';
import { ContactMessage } from '../types';

interface AboutViewProps {
  language: 'EN' | 'ML' | 'HI';
}

export default function AboutView({ language }: AboutViewProps) {
  const [formData, setFormData] = useState<ContactMessage>({
    name: '',
    email: '',
    company: '',
    subject: 'Select Collaboration Subject',
    message: ''
  });

  const [formProgress, setFormProgress] = useState<'idle' | 'sending' | 'success'>('idle');
  const [activeAccordion, setActiveAccordion] = useState<string | null>('msc');
  const [isPrintCVOpen, setIsPrintCVOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || formData.subject === 'Select Collaboration Subject' || !formData.message) {
      alert('Please fill in all required spatial fields including subject mapping.');
      return;
    }

    setFormProgress('sending');
    setTimeout(() => {
      setFormProgress('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: 'Select Collaboration Subject',
        message: ''
      });
    }, 1500);
  };

  const labels = {
    EN: {
      summaryTitle: 'Academic Summary',
      summaryText: 'Expertly trained in geographical concepts and modern geospatial workflows during my academic progression. I coordinate complex spatial datasets and synthesize thematic map representations that communicate critical physical and human-environment characteristics.',
      mscDegree: 'M.Sc. Geography',
      mscSchool: 'Kannur University, Department of Geography',
      mscGrade: 'CGPA: 8.23 / 10.0',
      mscYears: '2023 - 2025',
      bscDegree: 'B.Sc. Geography',
      bscSchool: 'University of Kerala, Department of Geography',
      bscGrade: 'CGPA: 7.51 / 10.0',
      bscYears: '2020 - 2023',
      dissertationTitle: 'Featured Research & Dissertations',
      arsenalTitle: 'Technical Tools Arsenal',
      contactTitle: 'Contact & Collaboration Request',
      contactSub: 'Submit a message pipeline to initiate partnership, consulting, or consulting queries.',
      btnSubmit: 'TRANSMIT GEOFEST REQUEST',
      successMsg: 'SUCCESS: Spatial correlation collaboration requests logged correctly!'
    },
    ML: {
      summaryTitle: 'വിദ്യാഭ്യാസ സംഗ്രഹം',
      summaryText: 'ഭൂമിശാസ്ത്രപരമായ ആശയങ്ങളിലും ആധുനിക ജി.ഐ.എസ് സാങ്കേതികവിദ്യകളിലും അക്കാദമിക പരിശീലനം നേടിയിട്ടുണ്ട്. സങ്കീർണ്ണമായ സ്പേഷ്യൽ ഡാറ്റാസെറ്റുകളെ വിശകലനം ചെയ്ത് തീമാറ്റിക് ഭൂപടങ്ങളാക്കി മികച്ച രീതിയിൽ അവതരിപ്പിക്കുന്നു.',
      mscDegree: 'എം.എസ്.സി ജിയോഗ്രാഫി',
      mscSchool: 'കണ്ണൂർ സർവകലാശാല, ഡിപ്പാർട്ട്മെന്റ് ഓഫ് ജിയോഗ്രാഫി',
      mscGrade: 'CGPA: 8.23 / 10.0',
      mscYears: '2023 - 2025',
      bscDegree: 'ബി.എസ്.സി ജിയോഗ്രാഫി',
      bscSchool: 'കേരള സർവകലാശാല, ഡിപ്പാർട്ട്മെന്റ് ഓഫ് ജിയോഗ്രാഫി',
      bscGrade: 'CGPA: 7.51 / 10.0',
      bscYears: '2020 - 2023',
      dissertationTitle: 'ഗവേഷണ പ്രബന്ധങ്ങൾ',
      arsenalTitle: 'സാങ്കേതിക വൈദഗ്ദ്ധ്യം',
      contactTitle: 'ബന്ധപ്പെടുക / സഹകരണം',
      contactSub: 'പ്രോജക്റ്റുകളെക്കുറിച്ചോ കൺസൾട്ടിംഗിനെക്കുറിച്ചോ ഉള്ള വിവരങ്ങൾക്കായി പൈപ്പ്‌ലൈൻ സമർപ്പിക്കുക.',
      btnSubmit: 'അപേക്ഷ സമർപ്പിക്കുക',
      successMsg: 'വിജയം: അപേക്ഷ വിജയകരമായി സമർപ്പിച്ചു!'
    },
    HI: {
      summaryTitle: 'अकादमिक सारांश',
      summaryText: 'वैज्ञानिक भौगोलिक सिद्धांतों और आधुनिक जीआईएस कार्यप्रवाहों में उच्च स्तर पर प्रशिक्षित। मैं स्थानिक अनुप्रयोगों में जटिल भौगोलिक डेटासेट और स्थानिक विषयगत मानचित्रों का कुशलतापूर्वक संश्लेषण करता हूं।',
      mscDegree: 'एम.एससी भूगोल',
      mscSchool: 'कन्नूर विश्वविद्यालय, भूगोल विभाग',
      mscGrade: 'CGPA: 8.23 / 10.0',
      mscYears: '2023 - 2025',
      bscDegree: 'बी.एससी भूगोल',
      bscSchool: 'केरल विश्वविद्यालय, भूगोल विभाग',
      bscGrade: 'CGPA: 7.51 / 10.0',
      bscYears: '2020 - 2023',
      dissertationTitle: 'विशेषीकृत थीसिस और अनुसंधान',
      arsenalTitle: 'तकनीकी उपकरण शस्त्रागार',
      contactTitle: 'संपर्क और सहयोगात्मक अनुरोध',
      contactSub: 'साझेदारी, परामर्श या विशेष परियोजनाओं के लिए संपर्क संदेश प्रेषित करें।',
      btnSubmit: 'स्थानिक अनुरोध सबमिट करें',
      successMsg: 'सफलता: संविदात्मक सहयोग प्रस्ताव विधिवत दर्ज किया गया है!'
    }
  }[language];

  // Dissertation outlines
  const dissertations = [
    {
      id: 'msc',
      title: 'Smart Growth for a Small Township: Geospatial Solutions for Urban Sustainability in Pala Municipality, Kerala',
      scope: 'LULC Change Detection (2017 & 2024), Urban Growth Prediction & Simulation (2032 & 2040), Flood Risk Assessment, MCDA Land Suitability Mapping',
      description: 'Conducted a comprehensive master’s dissertation on Pala Municipality using Sentinel-2B imagery (2017 & 2024), CA-Markov / CA-ANN models to simulate future urban growth boundaries for 2032 & 2040, a GIS-based Weighted Sum Analysis for Flood Risk Assessment (utilizing rainfall, river distance, elevation, slope, LULC, drainage, and road proximity layers), and a Multi-Criteria Decision Analysis (MCDA) based land suitability model to prioritize sustainable, climate-resilient development zones.',
      tools: 'ArcGIS Pro, QGIS, Google Earth Engine, MOLUSCE Plugin'
    }
  ];

  const tools = [
    { name: 'ArcGIS Pro / Desktop', category: 'Geospatial Software', proficiency: 'Advanced' },
    { name: 'QGIS Suite', category: 'Geospatial Software', proficiency: 'Advanced' },
    { name: 'PostGIS / PostgreSQL', category: 'Database Systems', proficiency: 'Intermediate' },
    { name: 'Python (GDAL, ArcPy)', category: 'Programming', proficiency: 'Intermediate' },
    { name: 'R-Stats (sf, terra)', category: 'Analytical Studies', proficiency: 'Intermediate' },
    { name: 'HEC-RAS Modeling', category: 'Hydrology Models', proficiency: 'Intermediate' },
    { name: 'Sentinel Copernicus GEE', category: 'Remote Sensing', proficiency: 'Advanced' },
    { name: 'Topographic Contouring', category: 'Cartography', proficiency: 'Advanced' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-16 py-16 space-y-20 text-gray-800 dark:text-slate-200" id="about-view-container">
      
      {/* Bio Summary Section with Photo and text */}
      <section className="grid md:grid-cols-12 gap-12 items-start">
        
        {/* Left text column */}
        <div className="md:col-span-8 space-y-6">
          <span className="font-mono text-xs text-[#0a6c44] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-3 py-1 font-bold">
            CURRICULUM VITAE
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-[#002045] dark:text-sky-200 tracking-tight">
            Academic Milestones &amp;<br />Professional Path
          </h1>
          <p className="font-sans text-sm md:text-base text-gray-500 dark:text-slate-400 leading-relaxed max-w-2xl">
            {labels.summaryText} Based inside Kerala, India, I specialize in remote sensing pipelines, watershed modeling, and publication-ready cartographic prints.
          </p>

          {/* Timeline Milestones */}
          <div className="space-y-6 pt-4">
            <h3 className="font-display font-bold text-[#002045] dark:text-sky-300 text-sm uppercase tracking-wider flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-emerald-500" />
              {labels.summaryTitle}
            </h3>

            {/* Timelines list */}
            <div className="space-y-4 border-l-2 border-gray-150 dark:border-slate-800 pl-6 ml-2.5">
              
              {/* PG */}
              <div className="relative">
                <div className="absolute -left-[31px] top-1 px-1 py-1 rounded-full bg-white dark:bg-[#001733] border-2 border-emerald-500 text-emerald-500">
                  <span className="w-1.5 h-1.5 block rounded-full bg-emerald-500"></span>
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-display font-bold text-base text-[#002045] dark:text-sky-300">
                      {labels.mscDegree}
                    </h4>
                    <span className="font-mono text-xs bg-[#00142e] text-white dark:bg-sky-950 dark:text-sky-300 py-1 px-2.5">
                      {labels.mscYears}
                    </span>
                  </div>
                  <p className="font-sans text-sm text-gray-400">{labels.mscSchool}</p>
                  <p className="font-mono text-xs text-[#0a6c44] dark:text-emerald-400 font-bold">{labels.mscGrade}</p>
                </div>
              </div>

              {/* UG */}
              <div className="relative pt-6">
                <div className="absolute -left-[31px] top-7 px-1 py-1 rounded-full bg-white dark:bg-[#001733] border-2 border-slate-300 dark:border-slate-700">
                  <span className="w-1.5 h-1.5 block rounded-full bg-gray-300"></span>
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-display font-bold text-base text-[#002045] dark:text-sky-300">
                      {labels.bscDegree}
                    </h4>
                    <span className="font-mono text-xs bg-gray-150 dark:bg-slate-800 text-gray-500 py-1 px-2.5">
                      {labels.bscYears}
                    </span>
                  </div>
                  <p className="font-sans text-sm text-gray-400">{labels.bscSchool}</p>
                  <p className="font-mono text-xs text-[#0a6c44] dark:text-emerald-400 font-bold">{labels.bscGrade}</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right card coordinates info */}
        <div className="md:col-span-4 bg-slate-50 dark:bg-[#000e21] border border-gray-150 dark:border-slate-800 p-6 rounded space-y-6">
          <div className="text-center space-y-3">
            <div className="h-40 w-40 rounded-full overflow-hidden mx-auto bg-slate-200 border-2 border-emerald-500 p-1">
              <div className="h-full w-full bg-slate-300 rounded-full flex items-center justify-center font-display font-bold text-gray-400 text-6xl">
                HC
              </div>
            </div>
            
            <div>
              <h3 className="font-display font-bold text-base text-[#002045] dark:text-sky-200">
                Hitesh Chandra
              </h3>
              <p className="font-mono text-[11px] text-gray-400 uppercase tracking-widest leading-none">
                Geospatial Analyst
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-gray-150 dark:border-slate-800/60 font-mono text-xs text-gray-600 dark:text-slate-400">
            <div className="flex justify-between">
              <span>LOCATION:</span>
              <span className="text-[#002045] dark:text-sky-300 font-semibold">Kerala, India</span>
            </div>
            <div className="flex justify-between">
              <span>NATIONALITY:</span>
              <span className="text-[#002045] dark:text-sky-300 font-semibold">Indian</span>
            </div>
            <div className="flex justify-between">
              <span>EMAIL:</span>
              <a href="mailto:hiteshchandra036@gmail.com" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                hiteshchandra036@@gmail.com
              </a>
            </div>
          </div>

          {/* Resume Quick print button */}
          <button 
            id="btn-print-cv"
            onClick={() => setIsPrintCVOpen(true)}
            className="w-full bg-[#002045] hover:bg-[#001733] dark:bg-sky-600 text-white font-mono text-xs uppercase tracking-wider py-2.5 rounded font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow hover:shadow-lg"
          >
            <Download className="w-4 h-4 animate-bounce" />
            Export Formal Resume
          </button>
        </div>

      </section>

      {/* Accordion Dissertations */}
      <section className="space-y-6">
        <h3 className="font-display text-xl font-extrabold text-[#002045] dark:text-sky-200 tracking-tight">
          {labels.dissertationTitle}
        </h3>

        <div className="space-y-3">
          {dissertations.map(diss => (
            <div 
              key={diss.id} 
              id={`accordion-diss-${diss.id}`}
              className="border border-gray-155 dark:border-slate-800 rounded overflow-hidden"
            >
              <button
                onClick={() => setActiveAccordion(activeAccordion === diss.id ? null : diss.id)}
                className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 dark:bg-[#000e21] text-left transition-colors font-semibold font-display text-sm text-[#002045] dark:text-sky-300 cursor-pointer"
              >
                <span>{diss.title}</span>
                <span className="text-emerald-500 font-bold">{activeAccordion === diss.id ? '−' : '+'}</span>
              </button>
              
              {activeAccordion === diss.id && (
                <div className="p-5 border-t border-gray-155 dark:border-slate-800 bg-white dark:bg-[#00142e] text-xs space-y-3 animate-fade-in">
                  <p className="font-mono text-[10px] text-gray-400 font-semibold uppercase italic">{diss.scope}</p>
                  <p className="font-sans text-gray-600 dark:text-slate-350 leading-relaxed text-sm">{diss.description}</p>
                  <div className="pt-2 flex flex-wrap gap-2 items-center">
                    <span className="font-mono font-bold text-gray-405 text-[10px] uppercase">Associated Tech:</span>
                    <span className="bg-[#00142e] text-[#0a6c44] dark:bg-sky-950 dark:text-emerald-300 py-1 px-2.5 rounded text-[10px] bg-emerald-50 font-mono font-bold">
                      {diss.tools}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Technical Arsenal Grid */}
      <section className="space-y-6">
        <h3 className="font-display text-xl font-extrabold text-[#002045] dark:text-sky-200 tracking-tight">
          {labels.arsenalTitle}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {tools.map(tool => (
            <div 
              key={tool.name}
              className="bg-slate-50 dark:bg-[#001733] border border-gray-150 dark:border-slate-800 p-4 rounded text-center space-y-1.5 transition-all hover:bg-white dark:hover:bg-sky-950 hover:shadow"
            >
              <Database className="w-5 h-5 text-emerald-500 mx-auto" />
              <h5 className="font-display font-bold text-xs text-[#002045] dark:text-sky-300 leading-tight">
                {tool.name}
              </h5>
              <p className="font-sans text-[10px] text-gray-400">{tool.category}</p>
              <span className="inline-block bg-[#0a6c44]/10 dark:bg-emerald-950 text-[#0a6c44] dark:text-emerald-400 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                {tool.proficiency}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section 
        className="bg-slate-50 dark:bg-[#000a14] border border-gray-150 dark:border-slate-800 p-8 rounded space-y-8 max-w-3xl mx-auto tech-border transition-colors duration-300"
        id="contact-section"
      >
        <div className="space-y-2">
          <h2 className="font-display text-xl md:text-2xl font-bold text-[#002045] dark:text-sky-200 tracking-tight">
            {labels.contactTitle}
          </h2>
          <p className="font-sans text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
            {labels.contactSub}
          </p>
        </div>

        {formProgress === 'success' ? (
          <div className="bg-emerald-50 dark:bg-emerald-950/25 border border-emerald-200 dark:border-emerald-900 p-6 rounded text-center space-y-3 animate-fade-in text-gray-800 dark:text-emerald-300">
            <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
            <h4 className="font-display font-bold text-base">{labels.successMsg}</h4>
            <p className="font-sans text-xs text-slate-400">Collaboration query transmitted correctly via Simulated Node API buffers. Hitesh will contact you within 24 standard business hours.</p>
            <button
              id="btn-send-another"
              onClick={() => setFormProgress('idle')}
              className="mt-2 bg-[#002045] hover:bg-[#001733] dark:bg-sky-600 hover:scale-105 text-white font-mono text-xs uppercase py-2 px-4 rounded font-bold cursor-pointer transition-all"
            >
              TRANSCEIVER_RESET
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-gray-400 text-[10px] uppercase font-bold">Sender Name *</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="e.g. Dr. Ramesh Kumar"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white dark:bg-[#00142e] border border-gray-200 dark:border-slate-800 p-3 rounded"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-gray-400 text-[10px] uppercase font-bold">Email Coordinates *</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="name@organization.org"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white dark:bg-[#00142e] border border-gray-200 dark:border-slate-800 p-3 rounded"
                />
              </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Organization */}
              <div className="space-y-1.5">
                <label className="text-gray-400 text-[10px] uppercase block font-bold">Organization / Corporate (Optional)</label>
                <input
                  id="contact-company"
                  type="text"
                  placeholder="e.g. Geophysics Research Inst"
                  value={formData.company}
                  onChange={e => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-white dark:bg-[#00142e] border border-gray-200 dark:border-slate-800 p-3 rounded"
                />
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label className="text-gray-400 text-[10px] uppercase block font-bold">Subject Mapping *</label>
                <select
                  id="contact-subject"
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-white dark:bg-[#00142e] border border-gray-200 dark:border-slate-800 p-3 rounded cursor-pointer"
                >
                  <option disabled>Select Collaboration Subject</option>
                  <option>Regional GIS Database Consulting</option>
                  <option>Remote Sensing &amp; LULC Training Projects</option>
                  <option>Academic Research Collaboration</option>
                  <option>Hydrologic Basin Flood Inundation Modeling</option>
                  <option>Other / General Correspondence</option>
                </select>
              </div>

            </div>

            {/* Message Area */}
            <div className="space-y-1.5">
              <label className="text-gray-400 text-[10px] uppercase block font-bold">Detailed Message Coordinates *</label>
              <textarea
                id="contact-message"
                required
                rows={5}
                placeholder="Include specifications about scale boundary targets, data projections, or dissertation review requirements..."
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white dark:bg-[#00142e] border border-gray-200 dark:border-slate-800 p-3 rounded focus:outline-none"
              ></textarea>
            </div>

            <button
              id="btn-transmit-post"
              type="submit"
              disabled={formProgress === 'sending'}
              className="w-full bg-emerald-600 hover:bg-emerald-500 font-sans text-xs uppercase tracking-wider font-bold py-3.5 text-white flex items-center justify-center gap-2 transition-all hover:shadow-lg disabled:opacity-50 cursor-pointer rounded"
            >
              <Send className="w-4 h-4" />
              {formProgress === 'sending' ? 'Transmitting nodes via Socket...' : labels.btnSubmit}
            </button>
          </form>
        )}
      </section>

      {/* CV Printing overlay layout template */}
      {isPrintCVOpen && (
        <div 
          onClick={() => setIsPrintCVOpen(false)}
          className="fixed inset-0 z-[100] overflow-y-auto bg-black/80 flex items-center justify-center p-4"
        >
          <div 
            onClick={e => e.stopPropagation()}
            className="bg-white text-gray-950 p-8 max-w-3xl w-full rounded hover:shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto relative font-sans text-sm block"
          >
            <button 
              onClick={() => setIsPrintCVOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black font-semibold font-mono text-xs border border-gray-200 p-1.5 rounded cursor-pointer"
            >
              CLOSE
            </button>

            {/* Print Header */}
            <div className="border-b-4 border-[#002045] pb-4 flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold font-display uppercase text-[#002045]">Hitesh Chandra</h1>
                <p className="font-mono text-xs uppercase text-[#0a6c44] font-semibold tracking-wider pt-1">Geospatial Analyst &amp; Cartography Expert</p>
                <p className="text-xs text-gray-500 mt-1">Kerala, India | hiteshchandra036@gmail.com</p>
              </div>
              <button 
                id="btn-system-print"
                onClick={() => window.print()}
                className="bg-[#002045] text-white py-1 px-3 rounded font-mono text-xs tracking-wider border-2 border-transparent uppercase cursor-pointer"
              >
                Trigger System Print
              </button>
            </div>

            {/* Academic profile resume prints */}
            <div className="space-y-4">
              <div>
                <h4 className="font-mono text-[11px] uppercase tracking-widest font-bold text-[#002045]">Academic Overview</h4>
                <div className="h-0.5 bg-gray-200 w-full mt-1"></div>
                <p className="text-xs leading-relaxed text-gray-600 pt-2">
                  Specialized analytical geographer based in India. Advanced study focusing on topological vector projections, Sentinel LULC multi-temporal metrics, and hydrological modeling buffers.
                </p>
              </div>

              <div>
                <h4 className="font-mono text-[11px] uppercase tracking-widest font-bold text-[#002045]">Education Credentials</h4>
                <div className="h-0.5 bg-gray-200 w-full mt-1"></div>
                
                <div className="pt-2 space-y-3">
                  <div>
                    <div className="flex justify-between font-bold text-xs text-[#002045]">
                      <span>M.Sc. Geography</span>
                      <span>2023 - 2025</span>
                    </div>
                    <p className="text-xs text-gray-500">Kannur University, Department of Geography | CGPA: 8.23</p>
                    <p className="text-[11px] text-gray-400 italic">Core dissertation: Smart Growth for a Small Township: Geospatial Solutions for Urban Sustainability in Pala Municipality, Kerala (LULC Modeling, Flood Risk & suitability mapping).</p>
                  </div>
                  <div>
                    <div className="flex justify-between font-bold text-xs text-[#002045]">
                      <span>B.Sc. Geography</span>
                      <span>2020 - 2023</span>
                    </div>
                    <p className="text-xs text-gray-500">University of Kerala, Department of Geography | CGPA: 7.51</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-mono text-[11px] uppercase tracking-widest font-bold text-[#002045]">Technical Toolsets</h4>
                <div className="h-0.5 bg-gray-200 w-full mt-1"></div>
                <div className="flex flex-wrap gap-2 pt-2 text-[10px] font-mono">
                  <span className="bg-slate-100 p-1.5 rounded">ArcGIS Pro</span>
                  <span className="bg-slate-100 p-1.5 rounded">QGIS Desktop</span>
                  <span className="bg-slate-100 p-1.5 rounded">PostGIS Spatial SQL</span>
                  <span className="bg-slate-100 p-1.5 rounded">Python ArcPy</span>
                  <span className="bg-slate-100 p-1.5 rounded">R sf/terra</span>
                  <span className="bg-slate-100 p-1.5 rounded">Landsat Copernicus GEE</span>
                  <span className="bg-slate-100 p-1.5 rounded">HEC-RAS Basin Models</span>
                </div>
              </div>
            </div>

            <p className="text-center font-mono text-[9px] text-gray-400 pt-6">PORTFOLIO TRANSCRIPT GENERATOR | HITESH CHANDRA</p>
          </div>
        </div>
      )}

    </div>
  );
}
