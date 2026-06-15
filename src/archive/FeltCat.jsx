// Felt cat illustration — SVG recreation of Figma layer (fvDoQ5nYuDvrlPaF8g3xd6, node 3:3).
// Side-profile sleeping cat, needle-felt art style.
// Oversized head, tiny body, teal collar, decorative polka dots.

export default function FeltCat({ size = 300, className = "", style = {} }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      style={{ display: "block", ...style }}
      role="img"
      aria-label="Sleeping felt cat illustration"
    >
      {/* ── Background ── */}
      <rect width="200" height="200" rx="12" fill="#f5f0e6" />

      {/* ── Decorative polka dots ── */}
      {/* red/pink dots */}
      <circle cx="18"  cy="22"  r="9"  fill="#e03060" opacity="0.85" />
      <circle cx="170" cy="18"  r="9"  fill="#e03060" opacity="0.85" />
      <circle cx="10"  cy="100" r="8"  fill="#e03060" opacity="0.8"  />
      <circle cx="182" cy="105" r="8"  fill="#e03060" opacity="0.8"  />
      <circle cx="38"  cy="178" r="9"  fill="#e03060" opacity="0.75" />
      <circle cx="155" cy="182" r="7"  fill="#e03060" opacity="0.75" />
      {/* green dots */}
      <circle cx="100" cy="14"  r="8"  fill="#5a8a40" opacity="0.8"  />
      <circle cx="185" cy="55"  r="7"  fill="#5a8a40" opacity="0.8"  />
      <circle cx="14"  cy="155" r="8"  fill="#5a8a40" opacity="0.8"  />
      <circle cx="170" cy="160" r="7"  fill="#5a8a40" opacity="0.75" />
      <circle cx="130" cy="10"  r="6"  fill="#5a8a40" opacity="0.7"  />

      {/* ── Cat body — small, tucked beneath head ── */}
      <ellipse cx="102" cy="158" rx="38" ry="28" fill="#e8a820" />
      {/* body shadow/depth */}
      <ellipse cx="105" cy="163" rx="30" ry="18" fill="#c8880a" opacity="0.4" />
      {/* right paw stub */}
      <ellipse cx="135" cy="162" rx="14" ry="10" fill="#e8a820" />

      {/* ── Tail ── */}
      <path
        d="M 68,155 Q 45,148 40,135 Q 35,118 48,112"
        fill="none"
        stroke="#e8a820"
        strokeWidth="12"
        strokeLinecap="round"
      />

      {/* ── Cat head — oversized, side profile ── */}
      <ellipse cx="105" cy="105" rx="60" ry="58" fill="#e8a820" />
      {/* head highlight — upper area */}
      <ellipse cx="95" cy="82" rx="32" ry="24" fill="#f5c040" opacity="0.5" />
      {/* head underside shadow */}
      <ellipse cx="108" cy="130" rx="42" ry="18" fill="#c8880a" opacity="0.3" />

      {/* ── Left ear ── */}
      <polygon points="62,68 52,35 82,52" fill="#e8a820" />
      {/* left ear inner (dark red tip) */}
      <polygon points="63,63 55,42 78,54" fill="#8b2020" opacity="0.7" />

      {/* ── Right ear ── */}
      <polygon points="135,55 148,28 158,55" fill="#e8a820" />
      {/* right ear inner */}
      <polygon points="138,53 148,35 155,53" fill="#8b2020" opacity="0.7" />

      {/* ── Teal collar ── */}
      <path
        d="M 62,138 Q 105,152 148,138"
        fill="none"
        stroke="#38b0b0"
        strokeWidth="8"
        strokeLinecap="round"
      />
      {/* collar highlight */}
      <path
        d="M 64,135 Q 105,148 146,135"
        fill="none"
        stroke="#60d8d0"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* ── Sleeping left eye (our left = cat's right) ── */}
      {/* upper eyelid arc with lashes */}
      <path
        d="M 82,103 Q 92,96 102,103"
        fill="none"
        stroke="#1a1714"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* lashes */}
      <line x1="82"  y1="103" x2="76"  y2="98"  stroke="#1a1714" strokeWidth="2" strokeLinecap="round" />
      <line x1="88"  y1="99"  x2="85"  y2="93"  stroke="#1a1714" strokeWidth="2" strokeLinecap="round" />
      <line x1="96"  y1="97"  x2="95"  y2="91"  stroke="#1a1714" strokeWidth="2" strokeLinecap="round" />
      <line x1="102" y1="103" x2="107" y2="98"  stroke="#1a1714" strokeWidth="2" strokeLinecap="round" />
      {/* lower crease */}
      <path
        d="M 84,104 Q 92,108 101,104"
        fill="none"
        stroke="#1a1714"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* ── Sleeping right eye ── */}
      <path
        d="M 110,100 Q 120,93 130,100"
        fill="none"
        stroke="#1a1714"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line x1="110" y1="100" x2="104" y2="95"  stroke="#1a1714" strokeWidth="2" strokeLinecap="round" />
      <line x1="116" y1="95"  x2="113" y2="89"  stroke="#1a1714" strokeWidth="2" strokeLinecap="round" />
      <line x1="124" y1="94"  x2="123" y2="88"  stroke="#1a1714" strokeWidth="2" strokeLinecap="round" />
      <line x1="130" y1="100" x2="135" y2="95"  stroke="#1a1714" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M 111,101 Q 120,105 129,101"
        fill="none"
        stroke="#1a1714"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* ── Nose ── */}
      <circle cx="106" cy="118" r="6" fill="#8b2020" />
      <circle cx="104" cy="116" r="2" fill="#c05050" opacity="0.5" />

      {/* ── Mouth ── */}
      <path
        d="M 106,123 Q 100,130 94,127"
        fill="none"
        stroke="#1a1714"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 106,123 Q 112,130 118,127"
        fill="none"
        stroke="#1a1714"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* ── Whisker dots on muzzle ── */}
      <circle cx="90"  cy="120" r="2.5" fill="#1a1714" opacity="0.5" />
      <circle cx="122" cy="120" r="2.5" fill="#1a1714" opacity="0.5" />
    </svg>
  );
}
