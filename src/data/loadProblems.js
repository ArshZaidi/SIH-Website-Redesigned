// Loads SIH problem statements from the CSV placed in this folder.
// Expected file: src/data/sih-problems.csv

const CSV_URL = new URL('./sih-problems.csv', import.meta.url).href

function parseCSV(text) {
  const rows = []
  let cur = ''
  let row = []
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    const next = text[i + 1]

    if (ch === '"') {
      if (inQuotes && next === '"') {
        cur += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (ch === ',' && !inQuotes) {
      row.push(cur)
      cur = ''
    } else if ((ch === '\n' || ch === '\r') && !inQuotes) {
      if (ch === '\r' && next === '\n') i++
      row.push(cur)
      if (row.some((c) => c.trim() !== '')) rows.push(row)
      row = []
      cur = ''
    } else {
      cur += ch
    }
  }
  if (cur || row.length) {
    row.push(cur)
    if (row.some((c) => c.trim() !== '')) rows.push(row)
  }
  return rows
}

function toNumber(v) {
  const n = parseInt(String(v).replace(/[^\d]/g, ''), 10)
  return Number.isFinite(n) ? n : 0
}

let cache = null

export async function loadProblems() {
  if (cache) return cache

  const res = await fetch(CSV_URL)
  if (!res.ok) throw new Error(`Failed to load CSV: ${res.status}`)
  const text = await res.text()

  const rows = parseCSV(text)
  if (!rows.length) return []

  const header = rows[0].map((h) => h.trim())
  const idx = (name) => header.indexOf(name)

  const iYear = idx('Year')
  const iId = idx('Problem_Statement_ID')
  const iTitle = idx('Problem_Statement_Title')
  const iOrg = idx('Organization')
  const iDept = idx('Department')
  const iCat = idx('Category')
  const iTheme = idx('Theme')
  const iDesc = idx('Description')

  const problems = rows.slice(1).map((r, n) => {
    const rawId = r[iId] ?? ''
    const code = rawId.startsWith('SIH') ? rawId : `SIH${rawId}`
    return {
      id: `${iYear >= 0 ? r[iYear] : 'x'}-${rawId || n}`,
      code,
      year: iYear >= 0 ? toNumber(r[iYear]) : null,
      title: (r[iTitle] || '').trim() || 'Untitled problem statement',
      ministry: (r[iOrg] || '').trim(),
      department: (r[iDept] || '').trim(),
      type: (r[iCat] || 'Software').trim(),
      theme: (r[iTheme] || 'General').trim(),
      description: (r[iDesc] || '').trim() || 'No description provided.',
      // fields the UI expects but CSV doesn't have — filled with sensible fallbacks
      difficulty: 'Medium',
      ideas: 0,
      prize: '₹1,00,000',
      eligibility: 'UG / PG students',
      tags: [(r[iTheme] || '').trim()].filter(Boolean),
    }
  })

  cache = problems.filter((p) => p.title)
  return cache
}