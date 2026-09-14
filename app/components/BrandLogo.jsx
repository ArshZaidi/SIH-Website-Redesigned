"use client";

import Image from "next/image";

export default function BrandLogo({
  size = 44,
  alt = "Smart India Hackathon",
}) {
  return (
    <div
      className="brand-logo-wrap"
      style={{
        height: size,
        width: "auto",
      }}
    >
      <Image
        src="/logos/sih-logo.png"
        alt={alt}
        width={180}
        height={size}
        className="brand-logo"
        priority
      />
    </div>
  );
}