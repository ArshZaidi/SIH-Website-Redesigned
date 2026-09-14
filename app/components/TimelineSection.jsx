"use client";

import { useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  Check,
  Flag,
  Lightbulb,
  Rocket,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";

import "./TimelineSection.css";

const timeline = [
  {
    date: "APRIL",
    title: "Registration Opens",
    description:
      "Students and institutions can officially begin their Smart India Hackathon journey.",
    icon: Users,
    status: "completed",
  },
  {
    date: "MAY",
    title: "Idea Submission",
    description:
      "Participants submit innovative ideas addressing real-world challenges and problem statements.",
    icon: Lightbulb,
    status: "completed",
  },
  {
    date: "JUNE",
    title: "Internal Hackathon",
    description:
      "Institutions conduct internal hackathons to discover and select their strongest teams.",
    icon: Rocket,
    status: "current",
  },
  {
    date: "JULY",
    title: "Team Selection",
    description:
      "Shortlisted teams are evaluated before advancing to the national-level competition.",
    icon: Sparkles,
    status: "upcoming",
  },
  {
    date: "AUGUST",
    title: "Grand Finale",
    description:
      "Selected teams come together to build solutions capable of creating real-world impact.",
    icon: Trophy,
    status: "upcoming",
  },
];

export default function TimelineSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    let ticking = false;

    const updateTimeline = () => {
      const rect = section.getBoundingClientRect();

      /*
       * How far the timeline section has been scrolled through.
       *
       * 0   = section just entered viewport
       * 1   = section completely scrolled through
       */
      const scrollDistance = section.offsetHeight - window.innerHeight;

      if (scrollDistance <= 0) return;

      const currentScroll = Math.min(
        Math.max(-rect.top, 0),
        scrollDistance
      );

      const rawProgress = currentScroll / scrollDistance;

      /*
       * Small easing so the movement feels smoother.
       */
      const easedProgress =
        rawProgress * rawProgress * (3 - 2 * rawProgress);

      setProgress(rawProgress);

      /*
       * Calculate the amount of horizontal movement.
       */
      const maxTranslate =
        track.scrollWidth - track.parentElement.clientWidth;

      const translateX = maxTranslate * easedProgress;

      track.style.transform = `translate3d(${-translateX}px, 0, 0)`;

      /*
       * Determine active card.
       */
      const cards = track.querySelectorAll(".timeline-card");

      if (cards.length) {
        let closestIndex = 0;
        let closestDistance = Infinity;

        const viewportCenter =
          window.innerWidth / 2;

        cards.forEach((card, index) => {
          const cardRect = card.getBoundingClientRect();
          const cardCenter =
            cardRect.left + cardRect.width / 2;

          const distance = Math.abs(
            cardCenter - viewportCenter
          );

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        setActiveIndex(closestIndex);
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateTimeline);
        ticking = true;
      }
    };

    const handleResize = () => {
      updateTimeline();
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleResize);

    updateTimeline();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="timeline-section"
    >
      {/* Background */}
      <div className="timeline-grid" />

      <div className="timeline-orb timeline-orb-one" />
      <div className="timeline-orb timeline-orb-two" />

      {/* Sticky viewport */}
      <div className="timeline-sticky">
        <div className="timeline-container">

          {/* Header */}
          <div className="timeline-header">
            <div className="timeline-kicker">
              <CalendarDays size={15} />
              <span>Timeline</span>
            </div>

            <div className="timeline-heading-row">
              <div>
                <h2>
                  From idea to
                  <span> impact.</span>
                </h2>

                <p>
                  Follow the journey of Smart India Hackathon
                  from the first idea to the Grand Finale.
                </p>
              </div>

              <div className="timeline-counter">
                <span>
                  0{activeIndex + 1}
                </span>

                <i>/</i>

                <span>
                  0{timeline.length}
                </span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="timeline-progress">
            <div
              className="timeline-progress-fill"
              style={{
                transform: `scaleX(${progress})`,
              }}
            />
          </div>

          {/* Horizontal viewport */}
          <div className="timeline-viewport">

            {/* Moving track */}
            <div
              ref={trackRef}
              className="timeline-track"
            >
              {timeline.map((item, index) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className={`timeline-card ${
                      index === activeIndex
                        ? "active"
                        : ""
                    }`}
                  >
                    {/* Top */}
                    <div className="timeline-card-top">
                      <div className="timeline-number">
                        0{index + 1}
                      </div>

                      <div className="timeline-icon">
                        <Icon
                          size={25}
                          strokeWidth={1.6}
                        />
                      </div>
                    </div>

                    {/* Date */}
                    <div className="timeline-date">
                      {item.date}
                    </div>

                    {/* Title */}
                    <h3>{item.title}</h3>

                    {/* Description */}
                    <p>{item.description}</p>

                    {/* Status */}
                    <div
                      className={`timeline-status ${item.status}`}
                    >
                      {item.status === "completed" && (
                        <>
                          <span className="status-icon">
                            <Check size={11} />
                          </span>

                          Completed
                        </>
                      )}

                      {item.status === "current" && (
                        <>
                          <span className="status-live" />
                          In Progress
                        </>
                      )}

                      {item.status === "upcoming" && (
                        <>
                          <span className="status-icon">
                            <Flag size={10} />
                          </span>

                          Upcoming
                        </>
                      )}
                    </div>

                    {/* Bottom accent */}
                    <div className="card-accent" />
                  </article>
                );
              })}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="timeline-scroll-indicator">
            <div className="scroll-line">
              <span
                style={{
                  transform: `scaleX(${progress})`,
                }}
              />
            </div>

            <span>
              SCROLL TO EXPLORE
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}