import { useRef, useEffect } from 'react'

const MAX_BIRDS = 160
const WARMUP_FRAMES = 80
const BG_THRESHOLD = 35

export default function BirdSilhouette() {
  const containerRef = useRef(null)

  useEffect(() => {
    let p5Instance = null
    let cancelled = false

    import('p5').then(({ default: P5 }) => {
      if (cancelled || !containerRef.current) return

      const sketch = (p) => {
        // ── Sketch state ─────────────────────────────────────────────
        let video = null
        let birds = []
        let state = -1
        let dissolveLine = 0
        const dissolveSpeed = 0.7
        let timer = 0
        let coverStartTime = 0
        let frameCounter = 0
        let bgModel = null       // Float32Array rolling average background
        let fgPixels = null      // Uint8Array binary foreground mask
        let fgW = 0, fgH = 0
        let hasCamera = true

        // ── Bird class ──────────────────────────────────────────────
        class Bird {
          constructor(x, y, col) {
            this.x = x; this.y = y
            this.col = col
            this.vx = p.random(-1.5, 1.5)
            this.vy = p.random(-30, -20)
            this.flap = p.random(p.TWO_PI)
            this.flapSpeed = p.random(28, 28.8)
            this.angle = p.random(-0.08, 0.08)
            this.rotSpeed = p.random(-0.004, 0.004)
            this.size = p.random(20, 36)
            this.windX = p.random(-0.01, 0.01)
            this.gravity = 0.0015
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
          display() {
            const s = this.size / 50
            const wL  = Math.sin(this.flap) * 10.0 * s
            const wL2 = Math.sin(this.flap) * 6.5  * s
            const bB  = Math.sin(this.flap) * 0.8  * s
            p.push()
            p.translate(this.x, this.y)
            p.rotate(this.angle)
            p.stroke(20, this.life * 0.5)
            p.strokeWeight(0.5)
            p.fill(p.red(this.col), p.green(this.col), p.blue(this.col), this.life)
            p.beginShape()
            p.vertex(-50*s,   0*s + wL);  p.vertex(-45*s,  -2*s + wL)
            p.vertex(-38*s,  -5*s + wL);  p.vertex(-30*s, -10*s + wL2)
            p.vertex(-20*s, -15*s + wL2); p.vertex(-11*s, -18*s + wL2)
            p.vertex( -4*s, -11*s + wL2); p.vertex( -2*s,  -8*s + bB)
            p.vertex(  0*s, -15*s + bB)
            p.vertex(  2*s,  -8*s + bB);  p.vertex(  4*s, -11*s + wL2)
            p.vertex( 11*s, -18*s + wL2); p.vertex( 20*s, -15*s + wL2)
            p.vertex( 30*s, -10*s + wL2); p.vertex( 38*s,  -5*s + wL)
            p.vertex( 45*s,  -2*s + wL);  p.vertex( 50*s,   0*s + wL)
            p.vertex( 30*s,   3*s - wL2 * 0.2); p.vertex( 17*s,  6*s - wL2 * 0.1)
            p.vertex(  5*s,  15*s + bB);  p.vertex(  2.5*s, 23*s + bB)
            p.vertex(  0*s,  31*s + bB);  p.vertex( -2.5*s, 23*s + bB)
            p.vertex( -5*s,  15*s + bB)
            p.vertex(-17*s,   6*s - wL2 * 0.1); p.vertex(-30*s,  3*s - wL2 * 0.2)
            p.endShape(p.CLOSE)
            p.pop()
          }
          isDead(w, h) {
            return this.life < 0 || this.y > h + 50 || this.x < -80 || this.x > w + 80
          }
        }

        // ── Background subtraction helpers ──────────────────────────
        function buildBackground() {
          if (!video) return
          video.loadPixels()
          const px = video.pixels
          if (!px || px.length === 0) return
          const n = video.width * video.height
          if (!bgModel || bgModel.length !== n * 3) {
            bgModel = new Float32Array(n * 3)
            for (let i = 0; i < n; i++) {
              bgModel[i*3]   = px[i*4]
              bgModel[i*3+1] = px[i*4+1]
              bgModel[i*3+2] = px[i*4+2]
            }
            return
          }
          for (let i = 0; i < n; i++) {
            bgModel[i*3]   = bgModel[i*3]   * 0.92 + px[i*4]   * 0.08
            bgModel[i*3+1] = bgModel[i*3+1] * 0.92 + px[i*4+1] * 0.08
            bgModel[i*3+2] = bgModel[i*3+2] * 0.92 + px[i*4+2] * 0.08
          }
        }

        function computeForeground() {
          if (!video || !bgModel) return
          video.loadPixels()
          const px = video.pixels
          const n = video.width * video.height
          if (!fgPixels || fgPixels.length !== n) {
            fgPixels = new Uint8Array(n)
            fgW = video.width; fgH = video.height
          }
          for (let i = 0; i < n; i++) {
            const dr = Math.abs(px[i*4]   - bgModel[i*3])
            const dg = Math.abs(px[i*4+1] - bgModel[i*3+1])
            const db = Math.abs(px[i*4+2] - bgModel[i*3+2])
            fgPixels[i] = (dr + dg + db) / 3 > BG_THRESHOLD ? 255 : 0
          }
          // Simple dilate
          const tmp = new Uint8Array(n)
          for (let y = 1; y < fgH - 1; y++) {
            for (let x = 1; x < fgW - 1; x++) {
              const i = y * fgW + x
              if (fgPixels[i] || fgPixels[i-1] || fgPixels[i+1] ||
                  fgPixels[i-fgW] || fgPixels[i+fgW]) tmp[i] = 255
            }
          }
          fgPixels = tmp
        }

        function countFG() {
          if (!fgPixels) return 0
          let c = 0
          for (let i = 0; i < fgPixels.length; i += 60) if (fgPixels[i] > 128) c++
          return c
        }

        function drawCoverScreen() {
          p.background(255); p.noStroke()
          p.textAlign(p.CENTER, p.CENTER)
          p.fill(30); p.textSize(36); p.textStyle(p.BOLD)
          p.text('THE SHAPE OF FREEDOM', p.width/2, p.height/2 - 55)
          p.textStyle(p.NORMAL)
          p.fill(90); p.textSize(17)
          p.text('Do humans long to become birds,\nor simply to become free?', p.width/2, p.height/2 + 18)
          p.fill(160); p.textSize(13)
          p.text('Allow camera access to begin…', p.width/2, p.height/2 + 100)
          p.textAlign(p.LEFT, p.BASELINE)
        }

        function showWaitingHint() {
          p.fill(180); p.noStroke()
          p.textAlign(p.CENTER, p.CENTER); p.textSize(22)
          p.text('STAND IN FRONT OF THE CAMERA', p.width/2, p.height/2)
          p.textAlign(p.LEFT, p.BASELINE)
        }

        function drawFastSilhouette(limitY) {
          if (!fgPixels) return
          const W = p.width, H = p.height
          const step = 2
          const scaleX = W / fgW, scaleY = H / fgH
          p.noStroke()
          for (let y = 0; y < fgH; y += step) {
            const screenY = y * scaleY
            for (let x = 0; x < fgW; x += step) {
              if (fgPixels[y * fgW + x] > 128) {
                const n = p.noise(x * 0.1, y * 0.1, frameCounter * 0.01) * 150
                if (screenY > limitY - n) {
                  p.fill(0, 200)
                  p.ellipse(x * scaleX, screenY, step * scaleX * 1.2, step * scaleY * 1.2)
                }
              }
            }
          }
        }

        function spawnBirdsContinuous(lineY, spawnBoost) {
          if (!fgPixels || birds.length >= MAX_BIRDS) return
          const W = p.width, H = p.height
          const scaleX = W / fgW, scaleY = H / fgH
          const currentY = Math.floor(p.map(lineY, 0, H, 0, fgH))
          const tries = Math.floor(80 * spawnBoost)
          for (let i = 0; i < tries; i++) {
            if (birds.length >= MAX_BIRDS) break
            const rx = Math.floor(p.random(fgW))
            let ry = currentY + Math.floor(p.random(-40, 40))
            ry = p.constrain(ry, 0, fgH - 1)
            if (fgPixels[ry * fgW + rx] > 128) {
              const screenY = ry * scaleY
              const noiseVal = p.noise(rx * 0.05, ry * 0.05, frameCounter * 0.01) * 150
              if (Math.abs(screenY - (lineY - noiseVal)) < 12) {
                let col = p.color(0)
                if (video) {
                  video.loadPixels()
                  const vi = ry * fgW + rx
                  if (vi * 4 + 2 < video.pixels.length)
                    col = p.color(video.pixels[vi*4], video.pixels[vi*4+1], video.pixels[vi*4+2])
                }
                birds.push(new Bird(rx * scaleX, screenY, col))
              }
            }
          }
        }

        // ── p5 lifecycle ─────────────────────────────────────────────
        p.setup = () => {
          p.createCanvas(640, 480)
          p.smooth(); p.frameRate(30); p.pixelDensity(1)
          coverStartTime = p.millis()

          try {
            video = p.createCapture(p.VIDEO)
            video.size(640, 480)
            video.hide()
          } catch (e) {
            hasCamera = false
          }
        }

        p.draw = () => {
          frameCounter++
          const W = p.width, H = p.height

          if (state === -1) {
            drawCoverScreen()
            if (p.millis() - coverStartTime > 3500) state = 0
            return
          }

          p.background(255)

          if (!hasCamera || !video) {
            p.fill(180); p.noStroke()
            p.textAlign(p.CENTER, p.CENTER); p.textSize(18)
            p.text('Camera not available\n(allow camera access and reload)', W/2, H/2)
            return
          }

          if (state === 0) {
            buildBackground()
            if (frameCounter < WARMUP_FRAMES) {
              p.fill(160); p.noStroke()
              p.textAlign(p.CENTER, p.CENTER); p.textSize(20)
              const sLeft = Math.ceil((WARMUP_FRAMES - frameCounter) / 30)
              p.text(`Calibrating… ${sLeft}s  (step away from camera)`, W/2, H/2)
              p.textAlign(p.LEFT, p.BASELINE)
              return
            }
            computeForeground()
            showWaitingHint()
            if (frameCounter % 10 === 0 && countFG() > 40) {
              state = 1; timer = p.millis()
            }
          } else if (state === 1) {
            computeForeground()
            drawFastSilhouette(0)
            if (p.millis() - timer > 4000) { state = 2; dissolveLine = 0 }
          } else if (state === 2) {
            computeForeground()
            drawFastSilhouette(dissolveLine)
            const progress = p.constrain(dissolveLine / H, 0, 1)
            let speed = dissolveSpeed, boost = 1.0
            if (progress > 0.45) {
              const t = p.map(progress, 0.45, 1.0, 0.0, 1.0)
              speed = dissolveSpeed + Math.pow(t, 2.4) * 4.5
              boost = 1.0 + t * 3.5
            }
            spawnBirdsContinuous(dissolveLine, boost)
            dissolveLine += speed
            if (dissolveLine > H + 50) { state = 3; timer = p.millis() }
          } else if (state === 3) {
            if (birds.length === 0 || p.millis() - timer > 4000) {
              state = 0; dissolveLine = 0; birds = []; frameCounter = 0
            }
          }

          birds = birds.filter(b => !b.isDead(W, H))
          birds.forEach(b => { b.update(); b.display() })

          p.fill(160); p.noStroke()
          p.textAlign(p.LEFT, p.TOP); p.textSize(11)
          p.text(`state:${state}  birds:${birds.length}  fps:${p.frameRate().toFixed(1)}`, 8, 8)
          p.textAlign(p.LEFT, p.BASELINE)
        }

        p.keyPressed = () => {
          if (p.key === ' ') {
            state = 0; dissolveLine = 0; birds = []
            bgModel = null; fgPixels = null; frameCounter = 0
          }
        }
      }

      p5Instance = new P5(sketch, containerRef.current)
    })

    return () => {
      cancelled = true          // stop pending import from creating an instance
      if (p5Instance) {
        p5Instance.remove()
        p5Instance = null
      }
    }
  }, []) // empty deps = run once

  return (
    <div style={{ width: '100%', maxWidth: 640, margin: '0 auto', borderRadius: 8, overflow: 'hidden', border: '1.5px solid rgba(26,23,20,0.15)', background: '#fff' }}>
      <div ref={containerRef} />
      <p style={{
        textAlign: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--ink-muted)',
        padding: '0.5rem',
        margin: 0,
        borderTop: '1px solid rgba(26,23,20,0.08)'
      }}>
        Space = reset · requires camera permission
      </p>
    </div>
  )
}
