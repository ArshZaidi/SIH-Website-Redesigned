import fs from 'fs'
import path from 'path'

function parseCSV(text) {
  const rows = []
  let cur = '', row = [], inQuotes = false, i = 0
  const len = text.length

  while (i < len) {
    const ch = text[i], next = text[i + 1]
    if (inQuotes) {
      if (ch === '"') {
        if (next === '"') { cur += '"'; i += 2; continue }
        inQuotes = false; i++; continue
      }
      cur += ch; i++; continue
    }
    if (ch === '"') { inQuotes = true; i++; continue }
    if (ch === ',') { row.push(cur); cur = ''; i++; continue }
    if (ch === '\r') {
      row.push(cur)
      if (row.some((c) => c.trim() !== '')) rows.push(row)
      row = []; cur = ''
      if (next === '\n') i += 2; else i++
      continue
    }
    if (ch === '\n') {
      row.push(cur)
      if (row.some((c) => c.trim() !== '')) rows.push(row)
      row = []; cur = ''; i++
      continue
    }
    cur += ch; i++
  }
  if (cur !== '' || row.length > 0) {
    row.push(cur)
    if (row.some((c) => c.trim() !== '')) rows.push(row)
  }
  return rows
}

function toNumber(v) {
  const n = parseInt(String(v ?? '').replace(/[^\d-]/g, ''), 10)
  return Number.isFinite(n) ? n : null
}

function stripHTML(s) {
  return String(s ?? '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ').trim()
}

function truncate(s, n = 240) {
  const t = String(s ?? '').trim()
  if (t.length <= n) return t
  return t.slice(0, n).replace(/\s+\S*$/, '') + '…'
}

let cache = null

export function getProblems() {
  if (cache) return cache

  const csvPath = path.join(process.cwd(), 'data', 'sih-2026-ps.csv')
  if (!fs.existsSync(csvPath)) {
    console.warn('[loadProblems] CSV not found at', csvPath)
    cache = []
    return cache
  }

  const csvText = fs.readFileSync(csvPath, 'utf-8')
  const rows = parseCSV(csvText)
  if (!rows.length) { cache = []; return cache }

  const header = rows[0].map((h) => h.trim().replace(/^"|"$/g, ''))
  const idx = (name) => header.indexOf(name)

  const iYear  = idx('Year')
  const iId    = idx('Problem_Statement_ID')
  const iTitle = idx('Problem_Statement_Title')
  const iOrg   = idx('Organization')
  const iDept  = idx('Department')
  const iCat   = idx('Category')
  const iTheme = idx('Theme')
  const iDesc  = idx('Description')
  const iYT    = idx('Youtube_Links')
  const iDS    = idx('Dataset_Links')

  const problems = []
  for (let n = 1; n < rows.length; n++) {
    const r = rows[n]
    if (!r || r.length === 0) continue
    const rawId = String(r[iId] ?? '').trim()
    const title = stripHTML(r[iTitle])
    if (!title) continue
    const code = rawId ? (rawId.toUpperCase().startsWith('SIH') ? rawId : `SIH${rawId}`) : `SIH-ROW-${n}`
    const fullDescription = stripHTML(r[iDesc])
    const org = stripHTML(r[iOrg])
    const dept = stripHTML(r[iDept])
    const theme = stripHTML(r[iTheme]) || 'General'
    const type = stripHTML(r[iCat]) || 'Software'

    problems.push({
      id: `${toNumber(r[iYear]) ?? 'x'}-${rawId || n}`,
      code, year: iYear >= 0 ? toNumber(r[iYear]) : null,
      title, ministry: org || '—', department: dept || '',
      type, theme,
      description: fullDescription || 'No description provided.',
      shortDescription: truncate(fullDescription, 220),
      youtube: stripHTML(r[iYT]) || '',
      dataset: stripHTML(r[iDS]) || '',
      difficulty: 'Medium', ideas: 0, prize: '₹1,00,000',
      eligibility: 'UG / PG students',
      tags: [theme, type].filter(Boolean),
    })
  }

  cache = problems
  return cache
}

export async function loadProblems() { return getProblems() }
export default getProblems