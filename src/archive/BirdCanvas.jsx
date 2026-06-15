import { useEffect, useRef, useCallback } from 'react'

/* ── Bird class ported from Processing bird_silhouette_v3.pde ── */
class Bird {
  constructor(x, y, col) {
    this.x = x
    this.y = y
    this.col = col ?? `hsl(${Math.random() * 40 + 20},30%,20%)`
    this.vx = (Math.random() - 0.5) * 3
    this.vy = -(Math.random() * 10 + 8)
    this.flap = Math.random() * Math.PI * 2
    this.flapSpeed = (Math.random() * 0.8 + 28) * (Math.PI / 180) * 8
    this.angle = (Math.random() - 0.5) * 0.16
    this.rotSpeed = (Math.random() - 0.5) * 0.008
    this.size = Math.random() * 16 + 12
    this.windX = (Math.random() - 0.5) * 0.02
    this.gravity = 0.06
    this.life = 255
  }

  update() {
    this.vy += this.gravity
    this.vx += this.windX
    this.x += this.vx + Math.sin(this.flap) * 0.4
    this.y += this.vy
    this.flap += this.flapSpeed
    this.angle += this.rotSpeed
    this.life -= 2.2
  }

  draw(ctx) {
    const s = this.size / 50
    const alpha = Math.max(0, this.life / 255)
    const wingLift = Math.sin(this.flap) * 10 * s
    const wingLift2 = Math.sin(this.flap) * 6.5 * s
    const bodyBob = Math.sin(this.flap) * 0.8 * s

    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle)

    // Parse col to rgba
    ctx.globalAlpha = alpha
    ctx.fillStyle = this.col
    ctx.strokeStyle = `rgba(20,20,20,${alpha * 0.5})`
    ctx.lineWidth = 0.5

    ctx.beginPath()
    const v = (vx, vy) => ({ x: vx * s, y: vy * s })
    const pts = [
      v(-50,  0 + wingLift / s),  v(-45, -2 + wingLift / s),
      v(-38, -5 + wingLift / s),  v(-30, -10 + wingLift2 / s),
      v(-20, -15 + wingLift2 / s), v(-11, -18 + wingLift2 / s),
      v(-4, -11 + wingLift2 / s), v(-2,  -8 + bodyBob / s),
      v( 0, -15 + bodyBob / s),
      v( 2,  -8 + bodyBob / s),   v( 4, -11 + wingLift2 / s),
      v(11, -18 + wingLift2 / s), v(20, -15 + wingLift2 / s),
      v(30, -10 + wingLift2 / s), v(38,  -5 + wingLift / s),
      v(45,  -2 + wingLift / s),  v(50,   0 + wingLift / s),
      v(30,   3 - wingLift2 / s * 0.2), v(17, 6 - wingLift2 / s * 0.1),
      v( 5,  15 + bodyBob / s),   v( 2.5, 23 + bodyBob / s),
      v( 0,  31 + bodyBob / s),   v(-2.5, 23 + bodyBob / s),
      v(-5,  15 + bodyBob / s),
      v(-17,  6 - wingLift2 / s * 0.1), v(-30, 3 - wingLift2 / s * 0.2),
    ]

    ctx.moveTo(pts[0].x, pts[0].y)
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    ctx.restore()
  }

  isDead(w, h) {
    return this.life < 0 || this.y > h + 50 || this.x < -80 || this.x > w + 80
  }
}

/* ── BirdCanvas component ── */
export default function BirdCanvas({ className = '', style = {} }) {
  const canvasRef = useRef(null)
  const birdsRef = useRef([])
  const rafRef = useRef(null)
  const hovering = useRef(false)
  const frameRef = useRef(0)

  const COLORS = [
    '#1a1714', '#3a2a1a', '#4a3828', '#2a1a0a',
    '#5a4030', '#6a5040', '#222222',
  ]

  const spawnBird = useCallback((canvas) => {
    const x = Math.random() * canvas.width
    const y = canvas.height - Math.random() * 40
    const col = COLORS[Math.floor(Math.random() * COLORS.length)]
    if (birdsRef.current.length < 60) {
      birdsRef.current.push(new Bird(x, y, col))
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio
      canvas.height = canvas.offsetHeight * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const loop = () => {
      frameRef.current++
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight

      ctx.clearRect(0, 0, w, h)

      // Ambient birds: spawn slowly when not hovering
      if (frameRef.current % (hovering.current ? 4 : 18) === 0) {
        spawnBird(canvas)
      }

      birdsRef.current = birdsRef.current.filter(b => !b.isDead(w, h))
      birdsRef.current.forEach(b => { b.update(); b.draw(ctx) })

      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [spawnBird])

  const handleEnter = () => { hovering.current = true }
  const handleLeave = () => { hovering.current = false }
  const handleClick = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const cx = e.clientX - rect.left
    const cy = e.clientY - rect.top
    for (let i = 0; i < 6; i++) {
      const col = COLORS[Math.floor(Math.random() * COLORS.length)]
      const b = new Bird(cx + (Math.random() - 0.5) * 30, cy, col)
      b.vy = -(Math.random() * 14 + 10)
      birdsRef.current.push(b)
    }
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', cursor: 'crosshair', ...style }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
    />
  )
}
