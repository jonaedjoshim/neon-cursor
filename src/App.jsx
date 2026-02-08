import { useEffect, useRef } from 'react'
import './App.css'

function App() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const handleMouseMove = (e) => {
      const x = e.clientX
      const y = e.clientY
      console.log(x, y)
    }

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
