/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Download, Move } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MapLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  language: 'EN' | 'ML' | 'HI';
}

export default function MapLightbox({ isOpen, onClose, imageUrl, title, language }: MapLightboxProps) {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when lightbox is open
      document.body.style.overflow = 'hidden';
      // Reset state on open
      setZoom(1);
      setPosition({ x: 0, y: 0 });
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setZoom(prev => {
      const nextZoom = Math.max(prev - 0.5, 1);
      if (nextZoom === 1) {
        setPosition({ x: 0, y: 0 }); // Reset position when at 1x
      }
      return nextZoom;
    });
  };

  const handleReset = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom === 1) return;
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    // Boundary check logic
    const container = imageContainerRef.current;
    if (!container) return;

    const newX = e.clientX - dragStart.current.x;
    const newY = e.clientY - dragStart.current.y;
    
    // Restrict movement range proportionally to zoom level
    const maxOffset = (zoom - 1) * 300;
    setPosition({
      x: Math.max(-maxOffset, Math.min(maxOffset, newX)),
      y: Math.max(-maxOffset, Math.min(maxOffset, newY))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoom === 1 || e.touches.length !== 1) return;
    const touch = e.touches[0];
    setIsDragging(true);
    dragStart.current = { x: touch.clientX - position.x, y: touch.clientY - position.y };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const newX = touch.clientX - dragStart.current.x;
    const newY = touch.clientY - dragStart.current.y;
    const maxOffset = (zoom - 1) * 300;
    setPosition({
      x: Math.max(-maxOffset, Math.min(maxOffset, newX)),
      y: Math.max(-maxOffset, Math.min(maxOffset, newY))
    });
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(imageUrl, { mode: 'cors' });
      if (!response.ok) throw new Error('Network error');
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${title.replace(/\s+/g, '_')}_cartography.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      // CORS fallback: open in new tab with standard download tag
      const link = document.createElement('a');
      link.href = imageUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.download = `${title.replace(/\s+/g, '_')}_cartography.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setIsDownloading(false);
    }
  };

  const t = {
    EN: {
      download: 'Download Map',
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out',
      reset: 'Reset',
      panHelp: 'Drag to explore the map. Use controls to zoom.',
      close: 'Close',
      preparing: 'Preparing Map...'
    },
    ML: {
      download: 'ഭൂപടം ഡൗൺലോഡ് ചെയ്യുക',
      zoomIn: 'വലുതാക്കുക',
      zoomOut: 'ചെറുതാക്കുക',
      reset: 'റീസെറ്റ്',
      panHelp: 'ഭൂപടം നീക്കി നോക്കാൻ ഡ്രാഗ് ചെയ്യുക.',
      close: 'അടക്കുക',
      preparing: 'ഡൗൺലോഡ് തയ്യറാക്കുന്നു...'
    },
    HI: {
      download: 'मानचित्र डाउनलोड करें',
      zoomIn: 'ज़ूम इन',
      zoomOut: 'ज़ूम आउट',
      reset: 'रीसेट करें',
      panHelp: 'मानचित्र खिसकाने के लिए ड्रैग करें।',
      close: 'बंद करें',
      preparing: 'तैयारी की जा रही है...'
    }
  }[language];

  return (
    <AnimatePresence>
      <div 
        id="map-lightbox-overlay"
        onClick={onClose}
        className="fixed inset-0 z-50 bg-[#001229]/95 backdrop-blur-md flex flex-col justify-between"
      >
        {/* Top Control Bar */}
        <div 
          id="map-lightbox-header"
          onClick={e => e.stopPropagation()}
          className="p-4 md:px-8 border-b border-sky-950 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#000a18]/60 backdrop-blur-sm z-10"
        >
          <div>
            <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase tracking-widest block mb-1">
              Cartographic Analytics Viewer
            </span>
            <h2 className="font-display font-extrabold text-white text-base md:text-lg tracking-tight">
              {title}
            </h2>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            {/* Zoom Controls */}
            <div className="flex items-center bg-sky-950/40 border border-sky-900/50 rounded p-1">
              <button
                id="btn-zoom-out"
                onClick={handleZoomOut}
                disabled={zoom <= 1}
                title={t.zoomOut}
                className="p-1.5 rounded text-slate-300 hover:text-white hover:bg-sky-900/40 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="font-mono text-[11px] font-bold text-sky-300 px-2 min-w-14 text-center">
                {zoom.toFixed(1)}x
              </span>
              <button
                id="btn-zoom-in"
                onClick={handleZoomIn}
                disabled={zoom >= 4}
                title={t.zoomIn}
                className="p-1.5 rounded text-slate-300 hover:text-white hover:bg-sky-900/40 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                id="btn-zoom-reset"
                onClick={handleReset}
                title={t.reset}
                className="ml-1 p-1.5 rounded text-slate-400 hover:text-white hover:bg-sky-900/40 border-l border-sky-900/40 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Download Button */}
            <button
              id="btn-download-map-file"
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs uppercase tracking-wider font-semibold py-2 px-3.5 rounded transition-all cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isDownloading ? t.preparing : t.download}</span>
            </button>

            {/* Close Button */}
            <button
              id="btn-lightbox-close"
              onClick={onClose}
              title={t.close}
              className="p-2 rounded bg-red-950/40 hover:bg-red-900 text-red-200 border border-red-900/30 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center Map Image Stage */}
        <div 
          id="map-lightbox-stage"
          ref={imageContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
          className={`flex-grow relative flex items-center justify-center p-4 overflow-hidden select-none ${
            zoom > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
          }`}
        >
          {/* Subtle grid pattern background under stage */}
          <div className="absolute inset-0 map-grid-overlay opacity-5 pointer-events-none"></div>

          <motion.div
            animate={{
              scale: zoom,
              x: position.x,
              y: position.y
            }}
            transition={isDragging ? { type: 'tween', duration: 0 } : { type: 'spring', damping: 25, stiffness: 200 }}
            className="max-w-full max-h-[75vh] md:max-h-[80vh]"
          >
            <img
              src={imageUrl}
              alt={title}
              className="w-auto h-auto max-w-full max-h-[75vh] md:max-h-[80vh] rounded shadow-2xl object-contain border border-sky-950/40 pointer-events-none mix-blend-normal"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        {/* Bottom Status Help Bar */}
        <div 
          id="map-lightbox-footer"
          onClick={e => e.stopPropagation()}
          className="p-3 bg-[#000814] text-slate-400 border-t border-sky-950/80 text-center font-mono text-[10px] tracking-wide flex items-center justify-center gap-2 z-10"
        >
          <Move className="w-3.5 h-3.5 text-emerald-400" />
          <span>{zoom > 1 ? t.panHelp : 'Click Zoom Controls above or pinch is available.'}</span>
        </div>
      </div>
    </AnimatePresence>
  );
}
