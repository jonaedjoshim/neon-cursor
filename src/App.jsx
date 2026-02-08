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

    class Particle {
      constructor(x, y) {
        this.x = x
        this.y = y
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
        this.color = `hsl(${Math.random() * 360}, 50%, 50%)`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        if (this.size > 0.1) this.size -= 0.5
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const handleMouseMove = (e) => {
      const x = e.clientX
      const y = e.clientY
      console.log(x, y)
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < particles.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }
      requestAnimationFrame(animate)
    }

    animate()

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])


  return (
    <div className='relative bg-black h-screen m-0 p-0 font-mono select-none text-2xl lg:pt-8 pt-5 text-gray-400 overflow-hidden'>
      <h2 className='relative z-10 w-fit mx-auto p-2'>Hover Your Mouse for Neon Effect</h2>
      <canvas
        ref={canvasRef}
        className='absolute top-0 left-0 w-full h-full' />
    </div>
  )
}

export default App
