import { useId } from "react";

// Pencil illustration reconstructed as inline SVG from Figma design
// (wXDJEDVGgydSZMCVWRDnP3). Drawn as inline SVG instead of raster so
// bodyColor / eraserColor props work without CSS filter hacks.

export default function Pencil({
  size = 200,
  bodyColor = "#c4933a",   // --accent-gold
  eraserColor = "#c94040", // --accent-red
  className = "",
  style = {},
}) {
  const uid = useId().replace(/:/g, "");
  const gid = (name) => `${name}-${uid}`;
  const url = (name) => `url(#${gid(name)})`;

  // viewBox: -135 -190 310 400  (accounts for 30-deg rotation bounding box + shadow)
  // Aspect ratio ≈ 310 / 400 = 0.775
  const svgHeight = Math.round(size / (310 / 400));

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-135 -190 310 400"
      width={size}
      height={svgHeight}
      className={className}
      style={{ display: "block", overflow: "visible", ...style }}
      role="img"
      aria-label="Pencil illustration"
    >
      <defs>
        {/* Shading overlay applied on top of flat bodyColor/eraserColor */}
        <linearGradient id={gid("bodyShade")} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#000" stopOpacity="0.14" />
          <stop offset="22%"  stopColor="#fff" stopOpacity="0.07" />
          <stop offset="62%"  stopColor="#fff" stopOpacity="0.11" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.17" />
        </linearGradient>
        <linearGradient id={gid("eraserShade")} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#fff" stopOpacity="0.28" />
          <stop offset="60%"  stopColor="#fff" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.14" />
        </linearGradient>
        {/* Warm neutral band matching --paper palette */}
        <linearGradient id={gid("bandGrad")} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#beb5a8" />
          <stop offset="50%"  stopColor="#ede7d9" />
          <stop offset="100%" stopColor="#cec8be" />
        </linearGradient>
        <radialGradient id={gid("shadowGrad")} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#7a7268" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#7a7268" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Drop shadow beneath graphite tip */}
      <ellipse
        cx="-78" cy="164" rx="58" ry="8"
        fill={url("shadowGrad")}
        transform="rotate(-3, -78, 164)"
      />

      {/* Pencil — rotated 30° clockwise: eraser → upper-right, tip → lower-left */}
      <g transform="rotate(30)">

        {/* Eraser cap */}
        <rect x="-40" y="-175" width="80" height="47" rx="13" fill={eraserColor} />
        <rect x="-40" y="-175" width="80" height="47" rx="13" fill={url("eraserShade")} />
        {/* Eraser shine streak */}
        <rect x="-26" y="-172" width="22" height="7" rx="3.5" fill="white" opacity="0.35" />

        {/* Metal ferrule band */}
        <rect x="-40" y="-130" width="80" height="22" fill={url("bandGrad")} />
        <line x1="-40" y1="-121.5" x2="40" y2="-121.5" stroke="#beb5a8" strokeWidth="1.5" />
        <line x1="-40" y1="-117"   x2="40" y2="-117"   stroke="white"   strokeWidth="1"   opacity="0.65" />
        <line x1="-40" y1="-113"   x2="40" y2="-113"   stroke="#cec8be" strokeWidth="0.8" />

        {/* Pencil body */}
        <rect x="-40" y="-108" width="80" height="220" fill={bodyColor} />
        <rect x="-40" y="-108" width="80" height="220" fill={url("bodyShade")} />
        {/* Highlight streaks */}
        <rect x="-29" y="-108" width="11" height="220" rx="4" fill="white" opacity="0.20" />
        <rect x="-22" y="-108" width="5"  height="220" rx="2" fill="white" opacity="0.12" />
        <rect x="8"   y="-108" width="5"  height="220"        fill="white" opacity="0.25" />

        {/* Tip section (exposed wood) */}
        <path d="M -40,112 L 40,112 L 7,165 L -7,165 Z" fill={bodyColor} />
        <path d="M -40,112 L 40,112 L 7,165 L -7,165 Z" fill={url("bodyShade")} />
        <path d="M -28,112 L -18,112 L -15,163 L -20,163 Z" fill="white" opacity="0.18" />

        {/* Graphite tip — ink color */}
        <path d="M -7,165 L 7,165 L 0,177 Z" fill="#1a1714" />
        <path d="M -2,165 L 2,165 L 0,172 Z" fill="#3d3830" opacity="0.5" />

      </g>
    </svg>
  );
}
