'use client'

import { useState } from 'react'
import { X, Send } from 'lucide-react'
import StarRating from './ui/StarRating'

export default function ReviewFormModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({ name: '', email: '', role: 'Student', rating: 0, title: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Please enter your name.'
    if (!form.email.trim()) e.email = 'Please enter your email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.'
    if (!form.rating) e.rating = 'Please pick a rating.'
    if (!form.title.trim()) e.title = 'Add a short headline.'
    if (form.message.trim().length < 10) e.message = 'Review should be at least 10 characters.'
    return e
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) return
    setSubmitting(true)
    setTimeout(() => {
      onSubmit({ name: form.name.trim(), role: form.role, rating: form.rating, title: form.title.trim(), message: form.message.trim() })
    }, 500)
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal modal-form" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="modal-x" onClick={onClose} aria-label="Close"><X size={20} /></button>
        <div className="modal-body">
          <span className="kicker mono">// Share your experience</span>
          <h2>Write a review</h2>
          <p className="form-sub">Your feedback helps future participants pick the right problem statement.</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <label>Full name
                <input type="text" value={form.name} onChange={(e) => set('name', e.target.value)}
                  placeholder="e.g. Ananya Sharma" className={errors.name ? 'err' : ''} />
                {errors.name && <span className="err-msg">{errors.name}</span>}
              </label>
              <label>Email
                <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)}
                  placeholder="you@example.com" className={errors.email ? 'err' : ''} />
                {errors.email && <span className="err-msg">{errors.email}</span>}
              </label>
            </div>

            <div className="form-row">
              <label>I am a
                <select value={form.role} onChange={(e) => set('role', e.target.value)}>
                  <option>Student</option><option>Mentor</option><option>Judge</option><option>Organiser</option>
                </select>
              </label>
              <label>Overall rating
                <div className="rating-row">
                  <StarRating value={form.rating} onChange={(v) => set('rating', v)} />
                  {form.rating > 0 && <span className="mono rating-num">{form.rating}/5</span>}
                </div>
                {errors.rating && <span className="err-msg">{errors.rating}</span>}
              </label>
            </div>

            <label className="full">Review headline
              <input type="text" value={form.title} onChange={(e) => set('title', e.target.value)}
                placeholder="Sum it up in a line" className={errors.title ? 'err' : ''} />
              {errors.title && <span className="err-msg">{errors.title}</span>}
            </label>

            <label className="full">Your review
              <textarea rows={5} value={form.message} onChange={(e) => set('message', e.target.value)}
                placeholder="What worked, what didn't, what you'd tell a new team…" className={errors.message ? 'err' : ''} />
              {errors.message && <span className="err-msg">{errors.message}</span>}
            </label>

            <div className="form-actions">
              <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Submitting…' : <><Send size={16} /> Submit review</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}