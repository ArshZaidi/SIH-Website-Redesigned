"use client";

import { useState } from "react";

export default function BrandLogo({
  size = 44,
  alt = "Smart India Hackathon",
}) {
  const [failed, setFailed] = useState(false);

  return (
    <span
      className="brand-logo-wrap"
      aria-label={alt}
    >
      {!failed ? (
        <img
          src="/logos/sih-logo.svg"
          alt={alt}
          className="brand-logo"
          onError={() => {
            console.warn(
              "[BrandLogo] Failed to load /logos/sih-logo.svg"
            );
            setFailed(true);
          }}
        />
      ) : (
        <span
          className="brand-mark"
          aria-hidden="true"
        >
          <span className="bm-saffron" />
          <span className="bm-green" />
        </span>
      )}
    </span>
  );
}