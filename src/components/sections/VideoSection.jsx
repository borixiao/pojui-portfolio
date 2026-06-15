import { useRef, useState, useEffect, useCallback } from 'react'
import '../../css/video.css'
import videoSrc from '../../assets/yibulianghbu-compressed.mp4'

/* ── helpers ─────────────────────────────────────────────── */
const fmt = (s) => {
  if (!isFinite(s)) return '00:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}
const fmtFrames = (s, fps = 24) =>
  String(Math.floor((s % 1) * fps)).padStart(2, '0')

const videoMeta = {
  title: '一步两步',
  titleEn: 'One Step Two Steps',
  year: '2025',
  format: 'MP4 · H.264',
  category: 'FILM / MOTION',
  tools: ['Premiere Pro', 'After Effects'],
  desc: 'A motion piece exploring rhythm, movement, and urban geometry through careful editing and sound synchronisation.',
}

/* ── Tape reel SVG ───────────────────────────────────────── */
function TapeReel({ spin, size = 72 }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 72 72"
      className={`vp-reel${spin ? ' vp-reel--spin' : ''}`}
      aria-hidden="true"
    >
      {/* outer ring */}
      <circle cx="36" cy="36" r="34" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.35"/>
      {/* spokes */}
      {[0,60,120,180,240,300].map(deg => (
        <line key={deg}
          x1="36" y1="36"
          x2={36 + 26 * Math.cos((deg - 90) * Math.PI / 180)}
          y2={36 + 26 * Math.sin((deg - 90) * Math.PI / 180)}
          stroke="currentColor" strokeWidth="1" opacity="0.25"
        />
      ))}
      {/* hub */}
      <circle cx="36" cy="36" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.55"/>
      <circle cx="36" cy="36" r="4" fill="currentColor" opacity="0.4"/>
      {/* reel holes */}
      {[0,120,240].map(deg => (
        <circle key={deg}
          cx={36 + 18 * Math.cos((deg - 90) * Math.PI / 180)}
          cy={36 + 18 * Math.sin((deg - 90) * Math.PI / 180)}
          r="3.5" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3"
        />
      ))}
    </svg>
  )
}

/* ── VU meter ────────────────────────────────────────────── */
function VUMeter({ active }) {
  return (
    <div className="vp-vu" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className={`vp-vu__bar${active ? ' vp-vu__bar--active' : ''}`}
          style={{ animationDelay: `${i * 0.07}s`, height: `${40 + Math.random() * 60}%` }} />
      ))}
    </div>
  )
}

/* ── Main component ─────────────────────────────────────── */
export default function VideoSection() {
  const videoRef = useRef(null)
  const progressRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [progress, setProgress] = useState(0)
  const [muted, setMuted] = useState(false)
  const [hovering, setHovering] = useState(false)

  const toggle = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    playing ? v.pause() : v.play()
    setPlaying(p => !p)
  }, [playing])

  const handleTimeUpdate = () => {
    const v = videoRef.current
    if (!v) return
    setCurrentTime(v.currentTime)
    setProgress(v.currentTime / (v.duration || 1))
  }

  const handleLoaded = () => {
    setDuration(videoRef.current?.duration ?? 0)
  }

  const handleEnded = () => setPlaying(false)

  const seekTo = (e) => {
    const bar = progressRef.current
    if (!bar || !videoRef.current) return
    const rect = bar.getBoundingClientRect()
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    videoRef.current.currentTime = pct * (videoRef.current.duration || 0)
  }

  const skip = (sec) => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = Math.max(0, Math.min(v.duration, v.currentTime + sec))
  }

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onKey = (e) => {
      if (e.code === 'Space' && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault(); toggle()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toggle])

  return (
    <section className="video-section" id="video">
      <div className="video-section__inner">

        {/* ── Header ─────────────────────────────────── */}
        <div className="video-section__header">
          <div>
            <p className="section-label">Film &amp; Motion</p>
            <h2 className="video-section__title">Video <em>Works</em></h2>
          </div>
          <div className="video-section__counter">
            <span className="vp-mono vp-mono--dim">SCREENING</span>
            <span className="vp-mono">01 / 01</span>
          </div>
        </div>

        {/* ── Player shell ───────────────────────────── */}
        <div
          className={`vp${playing ? ' vp--playing' : ''}`}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {/* top bar */}
          <div className="vp__topbar">
            <span className="vp-mono vp-mono--dim">CASSETTE PLAYER · MK1</span>
            <div className="vp__status-row">
              <span className={`vp__dot${playing ? ' vp__dot--play' : ''}`} />
              <span className="vp-mono vp-mono--dim">{playing ? 'PLAY' : 'STOP'}</span>
            </div>
          </div>

          {/* cassette body */}
          <div className="vp__cassette">
            {/* left reel */}
            <div className="vp__reel-side vp__reel-side--left">
              <TapeReel spin={playing} size={68} />
              <span className="vp-mono vp-mono--dim" style={{ fontSize: '0.55rem', marginTop: 4 }}>L REEL</span>
            </div>

            {/* screen */}
            <div className="vp__screen-wrap" onClick={toggle}>
              <video
                ref={videoRef}
                src={videoSrc}
                className="vp__video"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoaded}
                onEnded={handleEnded}
                playsInline
                muted={muted}
              />
              {/* overlay when paused */}
              {!playing && (
                <div className="vp__play-overlay">
                  <div className="vp__play-btn-big">▶</div>
                </div>
              )}
              {/* corner label */}
              <div className="vp__corner-label">
                <span className="vp-mono" style={{ fontSize: '0.55rem' }}>
                  {videoMeta.category}
                </span>
              </div>
            </div>

            {/* right reel */}
            <div className="vp__reel-side vp__reel-side--right">
              <TapeReel spin={playing} size={68} />
              <span className="vp-mono vp-mono--dim" style={{ fontSize: '0.55rem', marginTop: 4 }}>R REEL</span>
            </div>
          </div>

          {/* tape strip */}
          <div className="vp__tape-strip" aria-hidden="true">
            <div className={`vp__tape-track${playing ? ' vp__tape-track--run' : ''}`} />
          </div>

          {/* progress bar */}
          <div className="vp__progress-wrap" onClick={seekTo} ref={progressRef}>
            <div className="vp__progress-bg">
              <div className="vp__progress-fill" style={{ width: `${progress * 100}%` }} />
              <div className="vp__progress-head" style={{ left: `${progress * 100}%` }} />
            </div>
          </div>

          {/* controls */}
          <div className="vp__controls">
            {/* transport */}
            <div className="vp__transport">
              <button className="vp__ctrl" onClick={() => skip(-10)} title="Rewind 10s">
                <span>◀◀</span>
              </button>
              <button className="vp__ctrl vp__ctrl--play" onClick={toggle}>
                <span>{playing ? '▐▐' : '▶'}</span>
                <span className="vp-mono" style={{ fontSize: '0.6rem', marginLeft: 4 }}>
                  {playing ? 'PAUSE' : 'PLAY'}
                </span>
              </button>
              <button className="vp__ctrl" onClick={() => skip(10)} title="Forward 10s">
                <span>▶▶</span>
              </button>
              <button className="vp__ctrl" onClick={() => setMuted(m => !m)} title="Mute">
                <span style={{ fontSize: '0.75rem' }}>{muted ? '🔇' : '🔊'}</span>
              </button>
            </div>

            {/* timecode */}
            <div className="vp__timecode">
              <VUMeter active={playing} />
              <div className="vp__time-display">
                <span className="vp-mono">{fmt(currentTime)}</span>
                <span className="vp-mono vp-mono--dim">:</span>
                <span className="vp-mono vp-mono--dim" style={{ fontSize: '0.7rem' }}>
                  {fmtFrames(currentTime)}F
                </span>
                <span className="vp-mono vp-mono--dim" style={{ margin: '0 0.35rem' }}>/</span>
                <span className="vp-mono vp-mono--dim">{fmt(duration)}</span>
              </div>
            </div>
          </div>

          {/* metadata panel */}
          <div className="vp__meta">
            <div className="vp__meta-col">
              <div className="vp__meta-field">
                <span className="vp-mono vp-mono--dim">TITLE</span>
                <span className="vp-mono vp__meta-val">{videoMeta.title}</span>
              </div>
              <div className="vp__meta-field">
                <span className="vp-mono vp-mono--dim">—</span>
                <span className="vp-mono vp__meta-val vp__meta-val--sub">{videoMeta.titleEn}</span>
              </div>
            </div>
            <div className="vp__meta-col">
              <div className="vp__meta-field">
                <span className="vp-mono vp-mono--dim">YEAR</span>
                <span className="vp-mono vp__meta-val">{videoMeta.year}</span>
              </div>
              <div className="vp__meta-field">
                <span className="vp-mono vp-mono--dim">FORMAT</span>
                <span className="vp-mono vp__meta-val">{videoMeta.format}</span>
              </div>
            </div>
            <div className="vp__meta-col">
              <div className="vp__meta-field">
                <span className="vp-mono vp-mono--dim">DURATION</span>
                <span className="vp-mono vp__meta-val">{fmt(duration)}</span>
              </div>
              <div className="vp__meta-field">
                <span className="vp-mono vp-mono--dim">TOOLS</span>
                <span className="vp-mono vp__meta-val">{videoMeta.tools.join(' · ')}</span>
              </div>
            </div>
            <div className="vp__meta-col vp__meta-col--desc">
              <p className="vp__meta-desc">{videoMeta.desc}</p>
            </div>
          </div>

        </div>
        {/* end .vp */}

      </div>
    </section>
  )
}
