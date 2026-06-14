// Kirby pixel-art sprite, referencing Figma design (sQHte1KkqpQP3XZTxUlHN7).
// 32×40 logical grid — flat fills, crispEdges, no gradients.
// Left arm lower-left, right arm upper-right: matches Figma composition.
// Arms = --accent-red, star = --accent-gold. Kirby © Nintendo.

const INK   = "#1a1714";   // --ink
const PINK  = "#f888a8";   // body
const PINKL = "#ffc8d8";   // body highlight
const RED   = "#c94040";   // --accent-red (arms)
const BLUE  = "#1a3090";   // eye dark
const WHITE = "#ffffff";
const BLUSH = "#f5a0b8";   // cheek blush
const MOUTH = "#500010";   // open mouth
const YELL  = "#e8d870";   // star fill (accent-gold warm)
const GOLD  = "#c4933a";   // --accent-gold (star outline)

export default function Kirby({ size = 192, className = "", style = {} }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 40"
      width={size}
      height={Math.round(size * 40 / 32)}
      className={className}
      style={{ display: "block", imageRendering: "pixelated", ...style }}
      shapeRendering="crispEdges"
      role="img"
      aria-label="Kirby on a star — pixel art"
    >
      {/* ── Star (bottom, --accent-gold) ── */}
      {/* top point */}
      <rect x="15" y="28" width="2" height="2" fill={YELL} />
      <rect x="14" y="30" width="4" height="2" fill={YELL} />
      {/* horizontal bar */}
      <rect x="6"  y="32" width="20" height="4" fill={YELL} />
      {/* left point */}
      <rect x="2"  y="33" width="4"  height="2" fill={YELL} />
      {/* right point */}
      <rect x="26" y="33" width="4"  height="2" fill={YELL} />
      {/* bottom point */}
      <rect x="12" y="36" width="8"  height="2" fill={YELL} />
      <rect x="14" y="38" width="4"  height="2" fill={YELL} />
      {/* star shading / outline edges */}
      <rect x="6"  y="32" width="20" height="1" fill={GOLD} />
      <rect x="2"  y="33" width="1"  height="2" fill={GOLD} />
      <rect x="29" y="33" width="1"  height="2" fill={GOLD} />
      <rect x="6"  y="35" width="6"  height="1" fill={GOLD} />
      <rect x="20" y="35" width="6"  height="1" fill={GOLD} />
      <rect x="12" y="36" width="1"  height="4" fill={GOLD} />
      <rect x="19" y="36" width="1"  height="4" fill={GOLD} />

      {/* ── Body (octagonal, drawn before arms) ── */}
      {/* ink outline via stacked outline rects, then fill polygon */}
      <polygon
        points="10,3 22,3 26,7 26,24 22,28 10,28 6,24 6,7"
        fill={INK}
      />
      {/* pink fill — 1px inside the outline */}
      <polygon
        points="11,4 21,4 25,8 25,23 21,27 11,27 7,23 7,8"
        fill={PINK}
      />
      {/* highlight — upper-left area */}
      <polygon
        points="12,5 17,5 19,7 19,11 15,13 11,13 9,11 9,7"
        fill={PINKL}
      />

      {/* ── Left arm — lower-left (Figma: big arm, front) ── */}
      <polygon points="1,18 5,15 8,18 8,24 5,27 1,24" fill={INK} />
      <polygon points="2,19 5,16 7,19 7,23 5,26 2,23" fill={RED} />

      {/* ── Right arm — upper-right (Figma: smaller arm, back) ── */}
      <polygon points="24,10 28,10 31,13 31,19 28,21 24,19" fill={INK} />
      <polygon points="25,11 28,11 30,13 30,18 28,20 25,18" fill={RED} />

      {/* ── Left eye ── (ink box → blue fill → white shine) */}
      <rect x="9"  y="9"  width="6" height="7" fill={INK}  />
      <rect x="10" y="10" width="4" height="5" fill={BLUE} />
      <rect x="10" y="10" width="2" height="2" fill={WHITE} />

      {/* ── Right eye ── */}
      <rect x="17" y="8"  width="6" height="7" fill={INK}  />
      <rect x="18" y="9"  width="4" height="5" fill={BLUE} />
      <rect x="18" y="9"  width="2" height="2" fill={WHITE} />

      {/* ── Blush marks ── */}
      <rect x="8"  y="18" width="3" height="2" fill={BLUSH} />
      <rect x="21" y="18" width="3" height="2" fill={BLUSH} />

      {/* ── Mouth ── */}
      <rect x="13" y="21" width="7" height="5" fill={INK}   />
      <rect x="14" y="22" width="5" height="3" fill={MOUTH} />
    </svg>
  );
}
