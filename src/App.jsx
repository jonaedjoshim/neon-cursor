import { useEffect, useRef } from 'react'
import './App.css'

function App() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let particles = []
    let hue = 0

    class Particle {
      constructor(x, y) {
        this.x = x
        this.y = y
        this.size = Math.random() * 10 + 2
        this.speedX = Math.random() * 6 - 3
        this.speedY = Math.random() * 6 - 3
        this.color = `hsl(${hue}, 100%, 50%)`
        this.gravity = 0.5
        this.friction = 0.95
        this.isCircle = Math.random() > 0.5
        this.angle = Math.random() * 360
        this.spinSpeed = Math.random() * 0.2 - 0.1
      }

      update() {
        this.speedY += this.gravity
        this.x += this.speedX
        this.y += this.speedY
        this.angle += this.spinSpeed

        if (this.y + this.size > canvas.height) {
          this.y = canvas.height - this.size
          this.speedY *= -0.6
        }

        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
          this.speedX *= -1
        }

        this.speedX *= this.friction
        this.speedY *= this.friction

        if (this.size > 0.2) this.size -= 0.1
      }

      draw() {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle)
        
        ctx.fillStyle = this.color
        ctx.shadowBlur = 15; // উজ্জ্বলতা বাড়ালাম
        ctx.shadowColor = this.color;

        ctx.beginPath()
        if (this.isCircle) {
          ctx.arc(0, 0, this.size, 0, Math.PI * 2)
        } else {
          ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size)
        }
        ctx.fill()
        ctx.restore()
      }
    }

    const handleMouseMove = (e) => {
      for (let i = 0; i < 3; i++) {
        particles.push(new Particle(e.clientX, e.clientY))
      }
    }

    const handleClick = (e) => {
      for (let i = 0; i < 15; i++) {
        particles.push(new Particle(e.clientX, e.clientY))
      }
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
        if (particles[i].size <= 0.3) {
          particles.splice(i, 1)
          i--
        }
      }
      hue += 2
      requestAnimationFrame(animate)
    }

    animate()

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('click', handleClick)
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <div className='relative bg-black h-screen m-0 p-0 overflow-hidden'>
      <h2 className='absolute top-10 left-1/2 -translate-x-1/2 z-10 font-mono text-gray-400 pointer-events-none'>
        Hover or Click for Neon Chaos
      </h2>
      <canvas ref={canvasRef} className='block' />
    </div>
  )
}

export default App