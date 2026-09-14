"use client";

import { CalendarDays, CheckCircle2, Circle } from "lucide-react";

const timeline = [
  {
    date: "April",
    title: "Registration Opens",
    description:
      "Students and institutions can begin registering for Smart India Hackathon.",
    completed: true,
  },
  {
    date: "May",
    title: "Idea Submission",
    description:
      "Participants submit innovative ideas addressing real-world problem statements.",
    completed: true,
  },
  {
    date: "June",
    title: "Internal Hackathon",
    description:
      "Institutions conduct internal hackathons to select their strongest teams.",
    completed: false,
  },
  {
    date: "July",
    title: "Team Selection",
    description:
      "Shortlisted teams are evaluated and selected for the next stage.",
    completed: false,
  },
  {
    date: "August",
    title: "Grand Finale",
    description:
      "Selected teams compete at the Smart India Hackathon Grand Finale.",
    completed: false,
  },
];

export default function TimelineSection() {
  return (
    <section
      id="timeline"
      className="relative w-full overflow-hidden bg-[#0b0d0c] px-6 py-24 text-white md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <div className="mb-5 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-white/50">
            <CalendarDays size={16} />
            <span>Timeline</span>
          </div>

          <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
            From idea to
            <span className="text-white/40"> impact.</span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/60 md:text-lg">
            Follow the journey of Smart India Hackathon from registration and
            idea submission to the final stage.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[11px] top-0 h-full w-px bg-white/10 md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-12 md:space-y-0">
            {timeline.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={`${item.date}-${item.title}`}
                  className="relative md:grid md:min-h-[180px] md:grid-cols-2"
                >
                  {/* Desktop left side */}
                  <div
                    className={`hidden md:block ${
                      isLeft
                        ? "pr-20 text-right"
                        : "col-start-2 row-start-1 pl-20"
                    }`}
                  >
                    <div className={isLeft ? "" : "pt-2"}>
                      <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/40">
                        {item.date}
                      </p>

                      <h3 className="mt-2 text-2xl font-semibold">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-white/50">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Desktop right side */}
                  <div
                    className={`hidden md:block ${
                      isLeft
                        ? "col-start-2 row-start-1 pl-20"
                        : "pr-20 text-right"
                    }`}
                  >
                    {!isLeft && (
                      <div className="pt-2">
                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/40">
                          {item.date}
                        </p>

                        <h3 className="mt-2 text-2xl font-semibold">
                          {item.title}
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-white/50">
                          {item.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Timeline node */}
                  <div className="absolute left-0 top-0 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-[#0b0d0c] md:left-1/2 md:-translate-x-1/2">
                    {item.completed ? (
                      <CheckCircle2
                        size={16}
                        className="text-white"
                      />
                    ) : (
                      <Circle size={10} className="text-white/40" />
                    )}
                  </div>

                  {/* Mobile content */}
                  <div className="pl-10 md:hidden">
                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/40">
                      {item.date}
                    </p>

                    <h3 className="mt-2 text-xl font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-white/50">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}