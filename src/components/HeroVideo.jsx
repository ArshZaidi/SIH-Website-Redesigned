import { useState, useRef } from 'react'
import { Play, X, Volume2 } from 'lucide-react'

const VIDEO_ID = 'znMbKz6ZPno'

export default function HeroVideo() {
  const [playing, setPlaying] = useState(false)
  const [activated, setActivated] = useState(false)

  const handlePlay = () => {
    setPlaying(true)
    setActivated(true)
  }

  if (playing) {
    return (
      <div className="hero-video hero-video-active">
        <div className="hv-frame">
          <button className="hv-close" onClick={() => setPlaying(false)} aria-label="Close video">
            <X size={18} />
          </button>
          <div className="hv-embed">
            <iframe
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
              title="Smart India Hackathon — Official Film"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="hero-video">
      <div className="container">
        <div className="hv-outer">
          {/* decorative rings */}
          <div className="hv-ring hv-ring-1" aria-hidden="true" />
          <div className="hv-ring hv-ring-2" aria-hidden="true" />
          <div className="hv-ring hv-ring-3" aria-hidden="true" />

          <div
            className={`hv-card ${activated ? 'hv-card-played' : ''}`}
            onClick={handlePlay}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handlePlay()}
            aria-label="Play SIH official video"
          >
            {/* animated gradient border */}
            <div className="hv-glow" />

            <div className="hv-thumb">
              <img
                src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                alt="Smart India Hackathon official film"
                loading="lazy"
              />
              <div className="hv-overlay" />
            </div>

            <div className="hv-content">
              <span className="hv-badge mono">
                <Volume2 size={12} /> Official Film
              </span>
              <h2>Watch the movement</h2>
              <p>
                Millions of students. One nation. Infinite possibilities.
                See how SIH transforms ideas into India&rsquo;s solutions.
              </p>
              <div className="hv-play-wrap">
                <span className="hv-play-btn">
                  <Play size={24} fill="currentColor" />
                </span>
                <span className="hv-play-label">Play film</span>
              </div>
            </div>

            {/* floating particles */}
            <span className="hv-particle p1" />
            <span className="hv-particle p2" />
            <span className="hv-particle p3" />
            <span className="hv-particle p4" />
          </div>
        </div>
      </div>
    </section>
  )
}