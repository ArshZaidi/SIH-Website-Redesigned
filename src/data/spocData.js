/* =========================================================
   SPOC (Single Point of Contact) data service
   Attempts to fetch live data from SIH portal; falls back
   to a curated static dataset for offline / CORS-blocked
   environments.
   ========================================================= */

const SIH_SPOC_API = 'https://sih.gov.in/api/spoc' // placeholder — real endpoint varies

/* Curated fallback dataset — representative institutes */
const FALLBACK_SPOCS = [
  { id: 1, institute: 'Indian Institute of Technology, Bombay', code: 'IITB', state: 'Maharashtra', spocName: 'Prof. A. K. Sharma', email: 'spoc@iitb.ac.in', phone: '+91-22-2576-7000', status: 'active' },
  { id: 2, institute: 'Indian Institute of Technology, Delhi', code: 'IITD', state: 'Delhi', spocName: 'Dr. R. K. Singh', email: 'spoc@iitd.ac.in', phone: '+91-11-2659-1000', status: 'active' },
  { id: 3, institute: 'Indian Institute of Technology, Kharagpur', code: 'IITKGP', state: 'West Bengal', spocName: 'Prof. S. Bhattacharya', email: 'spoc@iitkgp.ac.in', phone: '+91-3222-255-221', status: 'active' },
  { id: 4, institute: 'Indian Institute of Technology, Madras', code: 'IITM', state: 'Tamil Nadu', spocName: 'Dr. K. Srinivasan', email: 'spoc@iitm.ac.in', phone: '+91-44-2257-8000', status: 'active' },
  { id: 5, institute: 'National Institute of Technology, Tiruchirappalli', code: 'NITT', state: 'Tamil Nadu', spocName: 'Prof. M. Ramesh', email: 'spoc@nitt.edu', phone: '+91-431-250-3000', status: 'active' },
  { id: 6, institute: 'Delhi Technological University', code: 'DTU', state: 'Delhi', spocName: 'Dr. N. K. Jain', email: 'spoc@dtu.ac.in', phone: '+91-11-2787-1025', status: 'active' },
  { id: 7, institute: 'BITS Pilani, Hyderabad Campus', code: 'BITSH', state: 'Telangana', spocName: 'Prof. V. K. Reddy', email: 'spoc@hyderabad.bits-pilani.ac.in', phone: '+91-40-6630-3500', status: 'active' },
  { id: 8, institute: 'College of Engineering, Pune', code: 'COEP', state: 'Maharashtra', spocName: 'Dr. S. D. Joshi', email: 'spoc@coep.ac.in', phone: '+91-20-2550-7100', status: 'active' },
  { id: 9, institute: 'Anna University, Chennai', code: 'AU', state: 'Tamil Nadu', spocName: 'Prof. P. Saravanan', email: 'spoc@annauniv.edu', phone: '+91-44-2235-8000', status: 'active' },
  { id: 10, institute: 'Jadavpur University, Kolkata', code: 'JU', state: 'West Bengal', spocName: 'Dr. A. Banerjee', email: 'spoc@jadavpuruniversity.in', phone: '+91-33-2414-6000', status: 'active' },
  { id: 11, institute: 'Punjab Engineering College, Chandigarh', code: 'PEC', state: 'Chandigarh', spocName: 'Prof. H. S. Gill', email: 'spoc@pec.ac.in', phone: '+91-172-275-3000', status: 'active' },
  { id: 12, institute: 'Vellore Institute of Technology', code: 'VIT', state: 'Tamil Nadu', spocName: 'Dr. R. P. Kumar', email: 'spoc@vit.ac.in', phone: '+91-416-220-2000', status: 'active' },
  { id: 13, institute: 'Manipal Institute of Technology', code: 'MIT', state: 'Karnataka', spocName: 'Prof. S. Kamath', email: 'spoc@manipal.edu', phone: '+91-820-292-5000', status: 'active' },
  { id: 14, institute: 'Amity University, Noida', code: 'AUUP', state: 'Uttar Pradesh', spocName: 'Dr. M. Verma', email: 'spoc@amity.edu', phone: '+91-120-439-2000', status: 'active' },
  { id: 15, institute: 'SRM Institute of Science and Technology', code: 'SRM', state: 'Tamil Nadu', spocName: 'Prof. K. Selvam', email: 'spoc@srmist.edu.in', phone: '+91-44-2741-7000', status: 'active' },
  { id: 16, institute: 'Thapar Institute of Engineering and Technology', code: 'TIET', state: 'Punjab', spocName: 'Dr. G. S. Sandhu', email: 'spoc@thapar.edu', phone: '+91-175-239-3000', status: 'active' },
  { id: 17, institute: 'Amrita Vishwa Vidyapeetham', code: 'AVV', state: 'Kerala', spocName: 'Prof. L. Nair', email: 'spoc@amrita.edu', phone: '+91-484-280-5000', status: 'active' },
  { id: 18, institute: 'Savitribai Phule Pune University', code: 'SPPU', state: 'Maharashtra', spocName: 'Dr. A. Deshpande', email: 'spoc@unipune.ac.in', phone: '+91-20-2560-1000', status: 'active' },
  { id: 19, institute: 'Gujarat Technological University', code: 'GTU', state: 'Gujarat', spocName: 'Prof. P. Patel', email: 'spoc@gtu.ac.in', phone: '+91-79-2630-0100', status: 'active' },
  { id: 20, institute: 'Rajasthan Technical University', code: 'RTU', state: 'Rajasthan', spocName: 'Dr. V. Sharma', email: 'spoc@rtu.ac.in', phone: '+91-141-271-5000', status: 'active' },
]

/* Attempt live fetch; fall back to static on failure */
export async function fetchSPOCs() {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 4000)
    const res = await fetch(SIH_SPOC_API, { signal: controller.signal })
    clearTimeout(timeout)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    if (Array.isArray(data) && data.length > 0) return data
    throw new Error('Empty response')
  } catch {
    console.warn('[spocData] Live fetch failed, using fallback dataset')
    return FALLBACK_SPOCS
  }
}

/* Client-side search across all fields */
export function searchSPOCs(list, query) {
  const q = query.trim().toLowerCase()
  if (!q) return list
  return list.filter((s) =>
    [s.institute, s.code, s.state, s.spocName, s.email]
      .join(' ')
      .toLowerCase()
      .includes(q),
  )
}

export { FALLBACK_SPOCS }