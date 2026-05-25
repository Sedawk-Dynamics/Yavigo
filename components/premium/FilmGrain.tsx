"use client"

/**
 * Fixed full-viewport SVG turbulence grain overlay. Cinematic film texture.
 * Very low opacity so it never overpowers content.
 */
export default function FilmGrain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] opacity-[0.045]"
      style={{ mixBlendMode: "overlay" }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <filter id="film-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.95"
            numOctaves="2"
            stitchTiles="stitch"
          >
            <animate
              attributeName="baseFrequency"
              dur="20s"
              values="0.85;1.05;0.85"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#film-noise)" />
      </svg>
    </div>
  )
}
