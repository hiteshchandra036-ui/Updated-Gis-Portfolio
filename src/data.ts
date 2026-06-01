/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'global-earthquake',
    title: 'Global Earthquake Spatial Analysis',
    category: 'Remote Sensing',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLl6g_joxUkKMCP9CVczEgkddJcQBN-9nzTUVBVvs-ZOdIzqzOJFx7LL6jRClUevsnYO0v67vixj9SaWTpLM3oltQSi2qu4GOqQnMyfIFK6785TONAV5il9gY6BxzytyM-flUo4BsT-F7h4qloYsciNuuIDsLH9HMkbsAG-iGQOyRQeqxHxbQMRfRpmE3-Kh7_bTOoquaI5c2vmV2B_thXqkHS_wfUA9klPId56HXghmY_bd3zeGKd5G6DO5eJra3XynZa0ocb5A',
    ref: '04-G',
    latlng: 'GLOBAL',
    categoryTag: 'GIS-Analysis',
    tags: ['ArcGIS Pro', 'Python', 'Spatial Stats'],
    description: 'Geospatial investigation focusing on visualizing and quantifying global seismic risk by overlaying historical earthquake epicenters.',
    details: 'This study compiles over twenty years of global seismic data from the USGS API (2000-2020), tracking events of magnitude 5.0 and above. By computing spatial point patterns, this dataset identifies significant regional clusters of high-impact activity along active plate boundaries.',
    inputs: [
      'USGS Earthquake Hazard Point layer (20,000+ points)',
      'Tectonic Plate Boundary Shapefile (GSRM v2.1)',
      'UN WPP Population Density Grids (GPWv4)'
    ],
    methodology: '1. Executed spatio-temporal kernel density estimations (KDE) using an adaptive search radius.\n2. Overlaid point densities onto tectonic boundary vulnerability buffers.\n3. Performed Anselin Local Moran\'s I to locate hot-spots with over 95% statistical confidence.\n4. Correlated epicenter dispersion with regional demographic counts to pinpoint the highest risk human settlement corridors.',
    scale: '1:10,000,000',
    publications: 'Journal of Geophysics & Natural Hazards (Undergraduate Review, 2024)'
  },
  {
    id: 'uttarakhand-seismic',
    title: 'Uttarakhand Seismic Risk Assessment',
    category: 'Geophysics' as any, // Cast since Geophysics is in screenshots
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyJ2zqO97MywkKW-qVNvyOL_XmPH_zDFXzzJwkIte8rPT84CCy_xV52UHTYyx_P_7zbVKRtTDhyG7PBIDeZ4uT7jJ4huT-ceza95AhHOW1OKZpmxwnLz2lk0QX71zrtSv6QFxlUOhwUfHqDUzI3Xmus33QmBS24m0mXtSRAKWdM7KUQknKzTyrjzEkLoqHSwhXZsFzTLXeYg8_9StfiwrR42vblkRRRjqD84rSmpR-W3bldSCR_VWHRUob5Gca6_2k6zHunfW68Q',
    ref: '10-J',
    latlng: '30.06° N',
    categoryTag: 'Geophysics',
    tags: ['ArcGIS', 'Hazard_Mapping', 'Kriging'],
    description: 'Detailed earthquake vulnerability mapping and hazard analysis for the Uttarakhand region using IDW and Kriging.',
    details: 'Uttarakhand lies in an active seismic zone of the Himalayas (Zones IV & V). This project models peak ground acceleration (PGA) and structural vulnerability based on structural geology, fault lines, and slope aspects.',
    inputs: [
      'SRTM DEM 30m resolution (USGS)',
      'Geological Survey of India (GSI) Fault line shapefiles',
      'Historical landslide inventory (2010-2023)'
    ],
    methodology: '1. Extracted slope, aspect, and topographic wetness indexes from the high-res DEM.\n2. Modeled distance-to-fault matrices using structural Euclidean distance solvers.\n3. Interpolated ground motion levels using Ordinary Kriging with stable circular semivariogram models.\n4. Weighted parameters via Multi-Criteria Decision Analysis (AHP) to generate the final structural vulnerability index.',
    scale: '1:250,000',
    publications: 'State Disaster Management Forum, Dehradun (2024 Working Paper)'
  },
  {
    id: 'nyc-population',
    title: 'NYC Population Density Mapping',
    category: 'Urban Planning',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFMTOtHCUdU90OrBkgkvY_QTsUTmyMhxdePLcp77CaCBY0GyxwG0H3i7M4A0X1SNy02Tty3GccEOZUdIsulJbxJmnHaX7iN-WgHYC2N-WTnvcKJa9Q3ni4lCumUgLb1y-jeQYL0yfVP69XbOOHWQqPXj-F8HzUylmuKKfqhq1S0CEu83bjZnnr1996FvXW7YR_H0HTOMiRkZYo__7J5Q9f3Luqg0ajSl3QPzN72aQNbafIslEOMK8O8045Qs-w0PyVVMQhoMk6jw',
    ref: '06-F',
    latlng: '40.71° N',
    categoryTag: 'Demographics',
    tags: ['PostGIS', 'QGIS', 'Choropleth'],
    description: 'Choropleth visualization of neighborhood tabulation areas, highlighting urban demographic concentration.',
    details: 'A high-fidelity spatial database visualising census populations inside NY Neighborhood Tabulation Areas (NTAs). Designed to highlight critical crowded zones, this project helps evaluate infrastructure requirements relative to localized community densities.',
    inputs: [
      'US Census Bureau TIGER/Line Shapefiles (NTA boundaries)',
      'American Community Survey (ACS 5-Year Estimates) Population Tables',
      'NYC Open Data Transit Network Nodes'
    ],
    methodology: '1. Configured local PostgreSQL/PostGIS database instance to index and join geometric census records.\n2. Built custom SQL routines to calculate area-to-population ratios, eliminating water boundary distortions.\n3. Symbolized population records inside QGIS using elegant quantile classification models.\n4. Conducted network buffer queries to calculate individual NTA proximity markers to key rapid transit stops.',
    scale: '1:50,000',
    publications: 'Urban Geo-Demographics Journal (Case Study, 2023)'
  },
  {
    id: 'india-population',
    title: 'Population Map India',
    category: 'Urban Planning',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgmHeOu5-NXwLBDtBqfXLvc8deGdOWSpinWbp4dn-pQn7CY8SZMFdwEUrNkicx8TbLhomom0idzqSi_Afi6DLVOUCvyPgK6Lxxl8TNruEvFtuNjpKK4TwgLlZ3sidKB7qvoATMBgkM1HpqsQ6nbIio_RiEU_ETQY-DA1Ho2W-J6yWm5pQXrcORFGq7cGoS_6AE5Yh2MfiazvxxqgaoactlLDM-RawhwcSF_xkSZ_Jh_nOgWiI6Rf_h-6jFDo8nfXnRQ8o3XJOa_A',
    ref: '14-V',
    latlng: 'STATE_LEVEL',
    categoryTag: 'Demographics',
    tags: ['Choropleth', 'UTM 44N', 'Socioeconomic'],
    description: 'Scientific publication quality choropleth mapping of demographic distribution across the Indian subcontinent.',
    details: 'A macro-level cartographic design displaying demographic differences throughout Indian states. Focuses on balancing visual accessibility with mathematical accuracy across large sovereign boundaries.',
    inputs: [
      'Administrative Boundary Database (Survey of India)',
      'Census of India Demographic Spreadsheet Collections',
      'National Atlas and Thematic Mapping Organisation reference models'
    ],
    methodology: '1. Cleaned regional census lists and resolved topological boundary conflicts.\n2. Selected UTM Zone 44N as the local projection to ensure true visual scale with minimal distortion.\n3. Hand-curated a continuous high-contrast color palette, ensuring readability down to district bounds.\n4. Formatted visual layouts using Cartographic Standards for standard academic publishes.',
    scale: '1:4,000,000',
    publications: 'Indian Cartographer Society Quarterly (2024)'
  },
  {
    id: 'kochi-contour',
    title: 'Contour Analysis Kochi',
    category: 'Hydrology',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYccqajfWmXPZT6hmQ6oW8UpMIs_gy2CXeddsqOy32mLCw5FpIr1XrqiGCAw5rTtDuVPQqwncZQQDPGq83GoXT2k0d9MSDL_5voDWg9CNB_c2xVDrjI6GMIhT9HbXft7NhW9plNpCynC5UYKw8RFmMRxmmn8VCo7nnM0FRJlPxQYA5kkzulCEa_FG4PD6iXqjMbL90HKYmeO31SgeT4kYyaFK-Q9Y18aIWgVCPMJh9L8yWNWymI0opocB9AZd-EBxSgJErj0EDNQ',
    ref: '08-H',
    latlng: '9.93° N',
    categoryTag: 'Terrain',
    tags: ['DEM', 'Topography', 'Surface Rendering'],
    description: 'Topographic modeling and elevation range mapping for coastal urban drainage and runoff analysis in Kochi.',
    details: 'Coastal Kochi faces complex flood vectors. This terrain assessment uses fine vertical contour slices to outline local elevation dips and flow paths that compound storm-water retention.',
    inputs: [
      'ALOS PALSAR 12.5m High-Resolution RTC Terrain DEM',
      'Kochi Municipal Corporation stormwater channel layouts',
      'Local tide-level benchmarks and historical high-water tags'
    ],
    methodology: '1. Conducted specialized pit-filling operations on high-res DEM data to establish hydro-correct flows.\n2. Generated contour layers at 1-meter vertical intervals using algorithmic spline interpolations.\n3. Identified high-risk depression zones by running sink-detection tools in QGIS.\n4. Classified slope matrices to evaluate municipal canal capacity under surge conditions.',
    scale: '1:10,000',
    publications: 'Sustainable Coastal Infrastructure Summit (2024 Presentation)'
  },
  {
    id: 'assam-trend',
    title: 'Trend Analysis - Assam',
    category: 'Remote Sensing',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCABC3EXRFVT8Z8uNFB5WQoOka25ZeAWMclU-g2PaD-FWyi0Tc2Bz5OLmz4Ps-W3oG50SbWJ5HdNSd6qqoe1Z8BDJb_erhPINgVTu7KHvi0LrT-Yxxl4KzFO0YV4kyf2ywVQ9ZkCiH4trlVuVyCRFR2RQEM1rZAnAujBILdyfUaaxfLWzBAxFWfA7l3uXnoLvCwkxiSBFPw3o0W_9l3IVlDBXpIZumc4EkRYTzZ4pt1Xddkf3WiQy7lnv57O8ydFO0hqmoJN0Ngtg',
    ref: '15-T',
    latlng: 'ASSAM',
    categoryTag: 'Remote Sensing',
    tags: ['LULC', 'Landsat', 'Spatio-temporal'],
    description: 'Spatio-temporal analysis of land use and land cover changes in Assam from 1991 to 2022.',
    details: 'Tracking thirty-plus years of environmental change along the Brahmaputra River valley. Focuses on forest depletion, changes in agricultural area, and urban sprawl.',
    inputs: [
      'Landsat-5 TM (1991), Landsat-8 OLI (2005, 2022) imagery datasets',
      'Ground truth validation coordinate logs (500+ samples)',
      'MODIS annual LULC reference layers for validation checks'
    ],
    methodology: '1. Calibrated temporal images with top-of-atmosphere atmospheric corrections.\n2. Created training sets and classified images using a supervised Random Forest algorithm inside GEE.\n3. Determined change vectors by running dynamic post-classification comparison matrices.\n4. Verified product statistics, reaching an overall classification accuracy (Kappa) of 89.2%.',
    scale: '1:500,000',
    publications: 'Regional Environmental Research Review (2023)'
  },
  {
    id: 'uttarakhand-flood',
    title: 'Flood Hazard Mapping',
    category: 'Hydrology',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2qL_01cHZ-MXekICB4McKjVJdXxRoFEepw6LECTk_KeQ2Uz6JfToV3GUn5urpbVpax2yPUkmibcEE1G15gQt89JvPnhL0yLugbxqix8CPW3Lov0MsRJHIcueanMoAYqt5rIGUtijS5ajYw-ZvHv6_FVcbSkOUYfqWBG9kp7A0DQlFWvIpnx7zgAy2eYIfqHfnJGk17VKJaXD6cynYw_RZ_QbGXR83ytjQqgKwdYaJGUi8G-9r8O5YedNnjOCZuFjtM0llOvkM-A',
    ref: '16-H',
    latlng: '30.06° N',
    categoryTag: 'Hydrology',
    tags: ['HEC-RAS', 'ArcGIS', 'Dynamic Modeling'],
    description: 'Detailed flood vulnerability assessment for Uttarakhand using hydrological modeling.',
    details: 'Analyzing river inundation potentials across the Alaknanda fluvial Basin. Combines steady-flow routing models with DEM variables to outline floodway extents during heavy cloudburst conditions.',
    inputs: [
      'Copernicus 30m Global DEM',
      'Central Water Commission (CWC) historical peak hydrographs',
      'High-resolution river cross-section survey data'
    ],
    methodology: '1. Built highly realistic stream geometry structures and cross-section grids inside HEC-GeoRAS.\n2. Simulated peak discharge scenarios using HEC-RAS 1D and 2D steady-flow calculations.\n3. Mapped depth grids and critical velocity vectors during peak flood cycles.\n4. Formulated zoning risk charts by combining flow depths with local land use categories.',
    scale: '1:100,000',
    publications: 'International GIS & Hydrological Engineering Journal (2024)'
  },
  {
    id: 'myanmar-canopy',
    title: 'Canopy Height - Myanmar',
    category: 'Remote Sensing',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDi6s21CtBIBZNpYc29wShU-xneGFhkgCCTaL-OmbI3At2ufkF-6fpFE5t3PaTFXz21IZ-z0p2cN2K57wjJrolbSXhNfHDJg-U72EKah93VB0nrNa_YB5FvpSDtwJXJwvNQhIr2IhufEwpYPS71ddMayeH9EA1Jv9uWjyFoLiD64b7ezONmXSvdur31mjTRnlJkMXKRBXZ1ZDg0RU03yDJADlYiOfz2krmEucs0810yFTQ_CQ3TWOmFzLbQb1ObL8FUJuivUMKkoA',
    ref: '17-C',
    latlng: 'MYANMAR',
    categoryTag: 'Remote Sensing',
    tags: ['LiDAR', 'Python', 'Density Index'],
    description: 'Remote sensing based vegetation structure analysis and canopy density mapping.',
    details: 'This study utilizes spaceborne GEDI LiDAR returns coupled with Sentinel-2 spectral indices to estimate canopy height and compile overall carbon biomass calculations in southern Myanmar.',
    inputs: [
      'GEDI L2B Footprint variables (Canopy height profiles)',
      'Sentinel-2 Multi-spectral composite bands',
      'UN-REDD plot-level forest inventory control checks'
    ],
    methodology: '1. Standardized GEDI point counts by filtering signal noise and background elevation returns.\n2. Trained a localized Random Forest Regression model inside Python (Scikit-Learn) to map GEDI heights with Sentinel-2 variables.\n3. Outputted continuous 30m Canopy Height Models (CHM) covering target forestry reserves.\n4. Correlated tree height layers with local carbon density indices to produce detailed biomatrices.',
    scale: '1:200,000',
    publications: 'Asian Journal of Forestry & Global Remote Sensing (Consortium, 2023)'
  }
];
