'use client'

import { useState } from 'react'
import { MessageSquare } from 'lucide-react'
import Reveal from './ui/Reveal'
import StarRating from './ui/StarRating'
import ReviewFormModal from './ReviewFormModal'
import { useToast } from '../contexts/ToastContext'

const SEED_REVIEWS = [
  { id: 'r1', name: 'Ananya Sharma', role: 'Student', rating: 5,
    title: 'The explorer made shortlisting painless',
    message: 'Filtering by theme and difficulty in one go saved our team an entire evening. We found our AgriTech problem in minutes.',
    date: '2 days ago' },
  { id: 'r2', name: 'Dr. R. Menon', role: 'Mentor', rating: 4,
    title: 'Clean, fast, and focused',
    message: 'The problem detail cards surface exactly what mentors need — eligibility, ministry and difficulty. Would love CSV export.',
    date: '1 week ago' },
  { id: 'r3', name: 'Karthik Iyer', role: 'Student', rating: 5,
    title: 'Compare dock is a killer feature',
    message: 'Being able to line up three problem statements side-by-side before committing was genuinely useful.',
    date: '2 weeks ago' },
]

export default function ReviewsSection() {
  const { notify } = useToast()
  const [reviews, setReviews] = useState(SEED_REVIEWS)
  const [showReview, setShowReview] = useState(false)

  const handleSubmit = (review) => {
    setReviews((prev) => [{ ...review, id: `r${Date.now()}`, date: 'just now' }, ...prev])
    setShowReview(false)
    notify('Review submitted', 'Thanks for sharing your experience!')
    setTimeout(() => {
      const el = document.getElementById('reviews')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 200)
  }

  return (
    <section className="section section-alt" id="reviews">
      <div className="container">
        <Reveal>
          <div className="section-head reviews-head">
            <div>
              <span className="kicker mono">// Reviews</span>
              <h2>What participants are saying</h2>
              <p>{reviews.length} review{reviews.length !== 1 ? 's' : ''} from students, mentors and judges.</p>
            </div>
            <button className="btn btn-primary" onClick={() => setShowReview(true)}>
              <MessageSquare size={16} /> Write a review
            </button>
          </div>
        </Reveal>

        <div className="reviews-grid">
          {reviews.map((r, i) => (
            <Reveal key={r.id} delay={Math.min(i * 60, 240)}>
              <article className="review-card">
                <div className="rv-top">
                  <div className="rv-avatar" aria-hidden="true">
                    {r.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                  </div>
                  <div className="rv-person">
                    <strong>{r.name}</strong>
                    <span>{r.role} · {r.date}</span>
                  </div>
                </div>
                <StarRating value={r.rating} readOnly size={16} />
                <h4>{r.title}</h4>
                <p>{r.message}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {showReview && (
        <ReviewFormModal onClose={() => setShowReview(false)} onSubmit={handleSubmit} />
      )}
    </section>
  )
}