/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type TabId = 'home' | 'portfolio' | 'about';

export interface Project {
  id: string;
  title: string;
  category: 'Hydrology' | 'Urban Planning' | 'Remote Sensing' | 'Network Analysis' | 'Geophysics';
  image: string;
  ref: string;
  latlng: string;
  description: string;
  categoryTag: string; // e.g. DEMOGRAPHICS, TERRAIN, hydrOLOGY
  tags: string[];
  details: string;
  inputs: string[];
  methodology: string;
  scale?: string;
  publications?: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
}

export interface TerminalLog {
  id: string;
  text: string;
  type: 'info' | 'success' | 'command' | 'warning';
  timestamp: string;
}
