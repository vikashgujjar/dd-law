/**
 * Custom line-art illustrations. Every stroked shape sets pathLength={1}
 * so the parent <DrawOnView> can animate it drawing itself.
 */
type ArtProps = { className?: string; stroke?: string; strokeWidth?: number };

const P = { pathLength: 1 };
// Fixed precision so server and client render identical attribute strings.
const round = (n: number) => Math.round(n * 100) / 100;

/* Neoclassical courthouse façade */
export function Courthouse({ className, stroke = "currentColor", strokeWidth = 1 }: ArtProps) {
  const cols = [92, 168, 244, 356, 432, 508];
  return (
    <svg viewBox="0 0 600 440" fill="none" className={className} stroke={stroke} strokeWidth={strokeWidth}>
      {/* pediment */}
      <path {...P} d="M40 128 L300 22 L560 128 Z" />
      <path {...P} d="M86 118 L300 38 L514 118" />
      <circle {...P} cx="300" cy="86" r="16" />
      {/* entablature */}
      <path {...P} d="M30 128 H570 V146 H30 Z" />
      <path {...P} d="M44 146 V160 H556 V146" />
      {/* columns */}
      {cols.map((x) => (
        <g key={x}>
          <path {...P} d={`M${x - 20} 160 H${x + 20} V170 H${x - 20} Z`} />
          <path {...P} d={`M${x - 14} 170 V362 M${x + 14} 170 V362`} />
          <path {...P} d={`M${x - 5} 176 V356 M${x + 5} 176 V356`} strokeOpacity={0.5} />
          <path {...P} d={`M${x - 20} 362 H${x + 20} V372 H${x - 20} Z`} />
        </g>
      ))}
      {/* doorway */}
      <path {...P} d="M280 372 V266 A20 20 0 0 1 320 266 V372" />
      {/* steps */}
      <path {...P} d="M20 372 H580 M8 388 H592 M0 404 H600" />
      <path {...P} d="M0 420 H600" strokeOpacity={0.4} />
    </svg>
  );
}

/* Minimal scales of justice */
export function Scales({ className, stroke = "currentColor", strokeWidth = 1 }: ArtProps) {
  return (
    <svg viewBox="0 0 240 240" fill="none" className={className} stroke={stroke} strokeWidth={strokeWidth}>
      <circle {...P} cx="120" cy="30" r="6" />
      <path {...P} d="M120 36 V196" />
      <path {...P} d="M40 58 Q120 44 200 58" />
      {/* left pan */}
      <path {...P} d="M40 58 L14 128 M40 58 L66 128" />
      <path {...P} d="M8 128 Q40 156 72 128 Z" />
      {/* right pan */}
      <path {...P} d="M200 58 L174 128 M200 58 L226 128" />
      <path {...P} d="M168 128 Q200 156 232 128 Z" />
      {/* base */}
      <path {...P} d="M92 196 H148 L160 214 H80 Z" />
      <path {...P} d="M64 222 H176" />
    </svg>
  );
}

/* Abstract city skyline */
export function Skyline({ className, stroke = "currentColor", strokeWidth = 1 }: ArtProps) {
  return (
    <svg viewBox="0 0 1440 260" fill="none" preserveAspectRatio="xMidYMax slice" className={className} stroke={stroke} strokeWidth={strokeWidth}>
      <path
        {...P}
        d="M0 260 V214 H46 V176 H88 V198 H120 V132 H140 V110 H166 V132 H184 V188 H226 V150 H262 V206 H300 V96 L326 70 L352 96 V206 H392 V166 H430 V122 H470 V184 H506 V60 H522 V40 H534 V60 H550 V196 H590 V150 H636 V204 H668 V118 L700 92 L732 118 V200 H772 V164 H812 V84 H856 V176 H896 V140 H930 V210 H966 V104 H1004 V74 H1020 V104 H1048 V190 H1086 V150 H1128 V196 H1160 V120 L1196 120 L1196 96 L1214 96 V182 H1252 V156 H1292 V208 H1330 V136 H1372 V188 H1406 V170 H1440 V260"
      />
      {/* window rhythms */}
      <path {...P} d="M314 120 H338 M314 140 H338 M314 160 H338 M314 180 H338" strokeOpacity={0.5} />
      <path {...P} d="M818 104 H850 M818 124 H850 M818 144 H850" strokeOpacity={0.5} />
      <path {...P} d="M512 86 H544 M512 110 H544 M512 134 H544 M512 158 H544" strokeOpacity={0.5} />
      <path {...P} d="M972 124 H998 M972 148 H998 M972 172 H998" strokeOpacity={0.5} />
    </svg>
  );
}

/* Concentric rings with crosshair + compass ticks */
export function Rings({ className, stroke = "currentColor", strokeWidth = 1 }: ArtProps) {
  const ticks = Array.from({ length: 72 }, (_, i) => i * 5);
  return (
    <svg viewBox="0 0 600 600" fill="none" className={className} stroke={stroke} strokeWidth={strokeWidth}>
      <circle {...P} cx="300" cy="300" r="296" strokeOpacity={0.35} />
      <circle {...P} cx="300" cy="300" r="250" />
      <circle {...P} cx="300" cy="300" r="180" strokeOpacity={0.6} />
      <circle {...P} cx="300" cy="300" r="110" strokeOpacity={0.4} />
      <path {...P} d="M300 0 V600 M0 300 H600" strokeOpacity={0.25} />
      <g strokeOpacity={0.5}>
        {ticks.map((deg) => {
          const r1 = 250;
          const r2 = deg % 45 === 0 ? 268 : 258;
          const a = (deg * Math.PI) / 180;
          return (
            <line
              key={deg}
              {...P}
              x1={round(300 + r1 * Math.cos(a))}
              y1={round(300 + r1 * Math.sin(a))}
              x2={round(300 + r2 * Math.cos(a))}
              y2={round(300 + r2 * Math.sin(a))}
            />
          );
        })}
      </g>
    </svg>
  );
}

/* Tall arch frame (used behind portraits) */
export function Arch({ className, stroke = "currentColor", strokeWidth = 1 }: ArtProps) {
  return (
    <svg viewBox="0 0 400 600" fill="none" preserveAspectRatio="none" className={className} stroke={stroke} strokeWidth={strokeWidth}>
      <path {...P} d="M10 600 V200 A190 190 0 0 1 390 200 V600" />
      <path {...P} d="M34 600 V204 A166 166 0 0 1 366 204 V600" strokeOpacity={0.45} />
    </svg>
  );
}

/* Architectural measurement lines */
export function Blueprint({ className, stroke = "currentColor", strokeWidth = 1 }: ArtProps) {
  return (
    <svg viewBox="0 0 800 800" fill="none" className={className} stroke={stroke} strokeWidth={strokeWidth}>
      <path {...P} d="M0 160 H800 M0 640 H800 M160 0 V800 M640 0 V800" strokeOpacity={0.5} />
      <path {...P} d="M160 160 L640 640 M640 160 L160 640" strokeOpacity={0.25} />
      <circle {...P} cx="400" cy="400" r="240" />
      <rect {...P} x="230" y="230" width="340" height="340" strokeOpacity={0.6} />
      <path {...P} d="M150 120 H650 M150 112 V128 M650 112 V128" />
    </svg>
  );
}

/* Classical column (single) */
export function Column({ className, stroke = "currentColor", strokeWidth = 1 }: ArtProps) {
  return (
    <svg viewBox="0 0 120 600" fill="none" preserveAspectRatio="xMidYMax meet" className={className} stroke={stroke} strokeWidth={strokeWidth}>
      <path {...P} d="M4 8 H116 V26 H4 Z" />
      <path {...P} d="M14 26 Q60 44 106 26" />
      <path {...P} d="M22 44 V560 M98 44 V560" />
      <path {...P} d="M42 52 V552 M60 52 V552 M78 52 V552" strokeOpacity={0.45} />
      <path {...P} d="M12 560 H108 V576 H12 Z M2 576 H118 V592 H2 Z" />
    </svg>
  );
}

/* Ornamental quotation mark */
export function QuoteMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 90" className={className} aria-hidden>
      <defs>
        <linearGradient id="qgold" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#e9d1a6" />
          <stop offset="1" stopColor="#9c7a48" />
        </linearGradient>
      </defs>
      <path
        fill="url(#qgold)"
        d="M0 90V54C0 24 14 6 44 0l6 12C34 17 26 28 25 44h23v46H0Zm66 0V54C66 24 80 6 110 0l6 12c-16 5-24 16-25 32h23v46H66Z"
      />
    </svg>
  );
}

/* Gold diamond separator */
export function Diamond({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className} aria-hidden>
      <path d="M6 0 L12 6 L6 12 L0 6 Z" fill="currentColor" />
    </svg>
  );
}

/* Tiled pattern of fine lattice for dark backgrounds */
export function LatticeBg({ className, id = "lattice" }: { className?: string; id?: string }) {
  return (
    <svg className={className} aria-hidden width="100%" height="100%">
      <defs>
        <pattern id={id} width="56" height="56" patternUnits="userSpaceOnUse">
          <path d="M28 0 L56 28 L28 56 L0 28 Z" fill="none" stroke="currentColor" strokeWidth="0.6" />
          <circle cx="28" cy="28" r="1" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
