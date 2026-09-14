'use client'

import { useState, useMemo } from 'react'
import {
  Search, X, ExternalLink, Code2, Database, Cpu, Layers, Filter,
} from 'lucide-react'
import PageTopBar from '../components/ui/PageTopBar'

function GithubIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55v-2.13c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18.92-.26 1.91-.38 2.9-.38.99 0 1.97.13 2.9.38 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .3.21.66.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  )
}

const KITS = [
  { theme: 'MedTech', title: 'Medical Imaging Starter', type: 'Software',
    desc: 'Pretrained models and open datasets for X-ray, MRI and retinal imaging.',
    links: [
      { label: 'MedMNIST', url: 'https://medmnist.com', kind: 'dataset' },
      { label: 'MONAI', url: 'https://monai.io', kind: 'library' },
      { label: 'CheXpert', url: 'https://stanfordmlgroup.github.io/competitions/chexpert/', kind: 'dataset' },
    ] },
  { theme: 'MedTech', title: 'Wearable Health Sensors', type: 'Hardware',
    desc: 'Open-hardware boards and reference designs for vitals monitoring.',
    links: [
      { label: 'MAX30102 breakout', url: 'https://www.analog.com', kind: 'hardware' },
      { label: 'OpenBCI', url: 'https://openbci.com', kind: 'hardware' },
      { label: 'PhysioNet', url: 'https://physionet.org', kind: 'dataset' },
    ] },
  { theme: 'AgriTech', title: 'Crop Disease Detection', type: 'Software',
    desc: 'Datasets and pretrained models for plant disease classification.',
    links: [
      { label: 'PlantVillage', url: 'https://www.kaggle.com/datasets/abdallahalidev/plantvillage-dataset', kind: 'dataset' },
      { label: 'PlantDoc', url: 'https://github.com/pratikkayal/PlantDoc-Dataset', kind: 'github' },
      { label: 'AgriNet', url: 'https://github.com/AgriNet', kind: 'github' },
    ] },
  { theme: 'AgriTech', title: 'Soil & Weather Sensors', type: 'Hardware',
    desc: 'Reference designs for NPK, moisture and weather stations.',
    links: [
      { label: 'CropX API', url: 'https://cropx.com', kind: 'api' },
      { label: 'OpenWeather', url: 'https://openweathermap.org/api', kind: 'api' },
      { label: 'Arduino Agriculture Kit', url: 'https://store.arduino.cc', kind: 'hardware' },
    ] },
  { theme: 'Mobility', title: 'Transit & Routing', type: 'Software',
    desc: 'GTFS feeds, map APIs and routing engines for public transport.',
    links: [
      { label: 'OpenTripPlanner', url: 'https://www.opentripplanner.org', kind: 'library' },
      { label: 'Transitland', url: 'https://github.com/transitland/transitland-datastore', kind: 'github' },
      { label: 'Mapbox', url: 'https://www.mapbox.com', kind: 'api' },
    ] },
  { theme: 'EdTech', title: 'Multilingual NLP', type: 'Software',
    desc: 'Indian-language models and speech APIs for education apps.',
    links: [
      { label: 'IndicBERT', url: 'https://huggingface.co/ai4bharat/IndicBERTv2-MLM-only', kind: 'library' },
      { label: 'Bhashini', url: 'https://bhashini.gov.in', kind: 'api' },
      { label: 'AI4Bharat', url: 'https://ai4bharat.iitm.ac.in', kind: 'library' },
    ] },
  { theme: 'FinTech', title: 'Payment & Fraud', type: 'Software',
    desc: 'Sandboxes and synthetic datasets for UPI and payment fraud.',
    links: [
      { label: 'Razorpay Test Mode', url: 'https://razorpay.com/docs', kind: 'api' },
      { label: 'IEEE Fraud Dataset', url: 'https://www.kaggle.com/c/ieee-fraud-detection', kind: 'dataset' },
      { label: 'Stripe Radar', url: 'https://stripe.com/radar', kind: 'api' },
    ] },
  { theme: 'Disaster Mgmt', title: 'Satellite & GIS', type: 'Software',
    desc: 'Satellite imagery, weather feeds and GIS tools for disaster response.',
    links: [
      { label: 'Sentinel Hub', url: 'https://www.sentinel-hub.com', kind: 'api' },
      { label: 'Bhuvan (ISRO)', url: 'https://bhuvan.nrsc.gov.in', kind: 'api' },
      { label: 'QGIS', url: 'https://qgis.org', kind: 'library' },
    ] },
  { theme: 'CleanTech', title: 'Air & Water Quality', type: 'Hardware',
    desc: 'Low-cost sensors and calibration datasets for environmental monitoring.',
    links: [
      { label: 'PurpleAir API', url: 'https://www2.purpleair.com', kind: 'api' },
      { label: 'OpenAQ', url: 'https://openaq.org', kind: 'api' },
      { label: 'Libelium sensors', url: 'https://www.libelium.com', kind: 'hardware' },
    ] },
  { theme: 'Robotics', title: 'Drones & ROS', type: 'Hardware',
    desc: 'Flight controllers, SLAM stacks and simulation tools.',
    links: [
      { label: 'PX4 Autopilot', url: 'https://px4.io', kind: 'library' },
      { label: 'ROS 2', url: 'https://ros.org', kind: 'library' },
      { label: 'Gazebo Sim', url: 'https://gazebosim.org', kind: 'library' },
    ] },
  { theme: 'Blockchain', title: 'Smart Contracts', type: 'Software',
    desc: 'Testnets and toolkits for building tamper-proof audit trails.',
    links: [
      { label: 'Hardhat', url: 'https://hardhat.org', kind: 'library' },
      { label: 'Polygon Testnet', url: 'https://polygon.technology', kind: 'api' },
      { label: 'OpenZeppelin', url: 'https://openzeppelin.com', kind: 'library' },
    ] },
  { theme: 'Space Tech', title: 'Orbital Data', type: 'Software',
    desc: 'Open satellite datasets and orbital mechanics libraries.',
    links: [
      { label: 'NASA Earthdata', url: 'https://earthdata.nasa.gov', kind: 'dataset' },
      { label: 'Skyfield', url: 'https://rhodesmill.org/skyfield/', kind: 'library' },
      { label: 'ISRO Bhuvan', url: 'https://bhuvan.nrsc.gov.in', kind: 'api' },
    ] },
]

const KIND_ICON = {
  dataset:  Database,
  library:  Code2,
  github:   GithubIcon,
  api:      Layers,
  hardware: Cpu,
}

export default function KitsClient() {
  const [query, setQuery] = useState('')
  const [themeFilter, setThemeFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')

  const themes = useMemo(
    () => ['All', ...Array.from(new Set(KITS.map((k) => k.theme))).sort()],
    [],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return KITS.filter((k) => {
      if (themeFilter !== 'All' && k.theme !== themeFilter) return false
      if (typeFilter !== 'All' && k.type !== typeFilter) return false
      if (!q) return true
      return (k.title + ' ' + k.desc + ' ' + k.theme).toLowerCase().includes(q)
    })
  }, [query, themeFilter, typeFilter])

  const activeFilterCount =
    (themeFilter !== 'All' ? 1 : 0) + (typeFilter !== 'All' ? 1 : 0) + (query.trim() ? 1 : 0)

  const reset = () => { setQuery(''); setThemeFilter('All'); setTypeFilter('All') }

  return (
    <div className="doc-page">
      <PageTopBar title="Prototype Starter Kits" count={`${filtered.length} / ${KITS.length}`} className="doc-topbar" />

      <div className="container">
        <section className="doc-hero">
          <span className="kicker mono">// Resource</span>
          <h1>Boilerplates, datasets and APIs by theme</h1>
          <p>A curated list of open-source tools, public datasets and free-tier APIs that teams can use to go from idea to working prototype faster. Everything here is free for students or has a student tier.</p>
        </section>

        <div className="filter-bar doc-filter">
          <div className="search-wrap">
            <Search size={17} className="search-icon" />
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search kits…" aria-label="Search kits" />
            {query && (
              <button className="clear-btn" onClick={() => setQuery('')} aria-label="Clear"><X size={14} /></button>
            )}
          </div>

          <div className="filter-row">
            <div className="chip-group" role="group">
              {['All', 'Software', 'Hardware'].map((t) => (
                <button key={t} className={`chip ${typeFilter === t ? 'on' : ''}`} onClick={() => setTypeFilter(t)}>{t}</button>
              ))}
            </div>
            <select className="select" value={themeFilter} onChange={(e) => setThemeFilter(e.target.value)}>
              {themes.map((t) => <option key={t} value={t}>{t === 'All' ? 'All themes' : t}</option>)}
            </select>
            {activeFilterCount > 0 && (
              <button className="btn-reset" onClick={reset}><X size={14} /> Clear ({activeFilterCount})</button>
            )}
          </div>

          <div className="results-line">
            <Filter size={14} />
            <span>Showing <strong>{filtered.length}</strong> of {KITS.length} starter kits</span>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="empty">
            <Search size={32} />
            <h3>No kits match your filters</h3>
            <p>Try a different theme or clear the search.</p>
            <button className="btn btn-primary" onClick={reset}>Reset filters</button>
          </div>
        ) : (
          <div className="kits-grid">
            {filtered.map((k, i) => (
              <article className="kit-card" key={k.title} style={{ animationDelay: `${i * 40}ms` }}>
                <div className="kit-top">
                  <span className={`pill pill-${k.type.toLowerCase()}`}>{k.type}</span>
                  <span className="mono kit-theme">{k.theme}</span>
                </div>
                <h3>{k.title}</h3>
                <p>{k.desc}</p>
                <div className="kit-links">
                  {k.links.map((l) => {
                    const Icon = KIND_ICON[l.kind] || ExternalLink
                    return (
                      <a key={l.url} href={l.url} target="_blank" rel="noreferrer noopener" className={`kit-link kit-${l.kind}`}>
                        <Icon size={13} />
                        <span>{l.label}</span>
                        <ExternalLink size={11} className="kit-link-ext" />
                      </a>
                    )
                  })}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}