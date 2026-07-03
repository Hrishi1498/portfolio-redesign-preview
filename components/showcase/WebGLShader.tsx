'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

const vertexShader = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = `
  precision highp float;
  uniform vec2 resolution;
  uniform float time;
  uniform float xScale;
  uniform float yScale;
  uniform float distortion;
  uniform float intensity;

  void main() {
    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    float d = length(p) * distortion;

    float rx = p.x * (1.0 + d);
    float gx = p.x;
    float bx = p.x * (1.0 - d);

    float amp = 0.08 * intensity;
    float r = amp / abs(p.y + sin((rx + time) * xScale) * yScale);
    float g = amp / abs(p.y + sin((gx + time) * xScale) * yScale);
    float b = amp / abs(p.y + sin((bx + time) * xScale) * yScale);

    gl_FragColor = vec4(r, g, b, 1.0);
  }
`

function createRenderer(
  canvas: HTMLCanvasElement,
  THREE: typeof import('three'),
) {
  const options: import('three').WebGLRendererParameters[] = [
    { canvas, antialias: true, alpha: false, powerPreference: 'high-performance' },
    { canvas, antialias: false, alpha: false, powerPreference: 'default' },
    { canvas, antialias: false, alpha: false, failIfMajorPerformanceCaveat: false },
  ]

  for (const params of options) {
    try {
      const renderer = new THREE.WebGLRenderer(params)
      if (renderer.getContext()) return renderer
      renderer.dispose()
    } catch {
      // Try the next renderer configuration.
    }
  }

  return null
}

interface WebGLShaderProps {
  className?: string
  /** Size the canvas to the viewport instead of the parent container. */
  viewport?: boolean
  /** When false, the shader renders a static frame and the time uniform does not advance. */
  playing?: boolean
  /** Wave brightness and motion strength, 0–1. */
  intensity?: number
}

export function WebGLShader({
  className,
  viewport = false,
  playing = true,
  intensity = 1,
}: WebGLShaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const playingRef = useRef(playing)
  const intensityRef = useRef(intensity)
  const controlsRef = useRef<{
    start: () => void
    stop: () => void
    renderFrame: () => void
    reset: () => void
  } | null>(null)

  playingRef.current = playing
  intensityRef.current = intensity

  useEffect(() => {
    if (playing) {
      controlsRef.current?.start()
      return
    }

    controlsRef.current?.stop()
    controlsRef.current?.reset()
  }, [playing])

  useEffect(() => {
    controlsRef.current?.renderFrame()
  }, [intensity])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let disposed = false
    let animationId = 0
    let threeModule: typeof import('three') | null = null
    let renderer: import('three').WebGLRenderer | null = null
    let geometry: import('three').PlaneGeometry | null = null
    let material: import('three').ShaderMaterial | null = null
    let scene: import('three').Scene | null = null
    let camera: import('three').OrthographicCamera | null = null

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reducedMotion = motionQuery.matches

    const readSize = () => {
      if (viewport) {
        return { width: window.innerWidth, height: window.innerHeight }
      }

      const width = container.clientWidth
      const height = container.clientHeight
      return { width, height }
    }

    const handleResize = () => {
      if (!renderer || !material) return

      const { width, height } = readSize()
      if (width === 0 || height === 0) return

      renderer.setSize(width, height, false)
      material.uniforms.resolution.value.set(
        renderer.domElement.width,
        renderer.domElement.height,
      )
    }

    const stopAnimation = () => {
      cancelAnimationFrame(animationId)
      animationId = 0
    }

    const renderFrame = () => {
      if (!renderer || !material || !scene || !camera) return
      material.uniforms.intensity.value = intensityRef.current
      renderer.render(scene, camera)
    }

    const startAnimation = () => {
      if (!renderer || !material || !scene || !camera || reducedMotion) return
      if (!playingRef.current) return

      stopAnimation()

      const animate = () => {
        if (disposed || !renderer || !material || !scene || !camera) return
        if (!playingRef.current) {
          animationId = 0
          renderFrame()
          return
        }

        animationId = requestAnimationFrame(animate)
        const motion = Math.max(intensityRef.current, 0)
        material.uniforms.intensity.value = motion
        material.uniforms.time.value += 0.01 * motion
        renderer.render(scene, camera)
      }

      animationId = requestAnimationFrame(animate)
    }

    const resetShader = () => {
      if (!material) return
      material.uniforms.time.value = 0
      material.uniforms.intensity.value = 0
      renderFrame()
    }

    controlsRef.current = { start: startAnimation, stop: stopAnimation, renderFrame, reset: resetShader }

    const initRenderer = () => {
      if (disposed || renderer || !threeModule) return

      const { width, height } = readSize()
      if (width === 0 || height === 0) return

      const THREE = threeModule
      const canvas = document.createElement('canvas')
      canvas.style.display = 'block'
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      canvas.style.position = 'absolute'
      canvas.style.inset = '0'

      const createdRenderer = createRenderer(canvas, THREE)
      if (!createdRenderer) return

      renderer = createdRenderer
      scene = new THREE.Scene()
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
      geometry = new THREE.PlaneGeometry(2, 2)

      material = new THREE.ShaderMaterial({
        uniforms: {
          resolution: { value: new THREE.Vector2() },
          time: { value: 0 },
          xScale: { value: 1.0 },
          yScale: { value: 0.5 },
          distortion: { value: 0.05 },
          intensity: { value: intensityRef.current },
        },
        vertexShader,
        fragmentShader,
      })

      scene.add(new THREE.Mesh(geometry, material))
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 1)
      container.appendChild(canvas)

      handleResize()
      renderFrame()
      if (playingRef.current) startAnimation()
    }

    const tryInit = () => {
      if (renderer) {
        handleResize()
        return
      }
      initRenderer()
    }

    const onMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches
      if (reducedMotion) stopAnimation()
      else if (playingRef.current) startAnimation()
    }

    if (!viewport) {
      const resizeObserver = new ResizeObserver(tryInit)
      resizeObserver.observe(container)

      import('three').then((THREE) => {
        if (disposed) return
        threeModule = THREE
        tryInit()
      })

      window.addEventListener('resize', handleResize, false)
      motionQuery.addEventListener('change', onMotionChange)

      return () => {
        disposed = true
        controlsRef.current = null
        resizeObserver.disconnect()
        window.removeEventListener('resize', handleResize, false)
        motionQuery.removeEventListener('change', onMotionChange)
        stopAnimation()

        if (renderer) {
          renderer.forceContextLoss()
          renderer.dispose()

          if (container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement)
          }
        }

        geometry?.dispose()
        material?.dispose()
        renderer = null
        scene = null
        camera = null
      }
    }

    window.addEventListener('resize', handleResize, false)
    motionQuery.addEventListener('change', onMotionChange)

    import('three').then((THREE) => {
      if (disposed) return
      threeModule = THREE
      tryInit()
    })

    return () => {
      disposed = true
      controlsRef.current = null
      window.removeEventListener('resize', handleResize, false)
      motionQuery.removeEventListener('change', onMotionChange)
      stopAnimation()

      if (renderer) {
        renderer.forceContextLoss()
        renderer.dispose()

        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement)
        }
      }

      geometry?.dispose()
      material?.dispose()
      renderer = null
      scene = null
      camera = null
    }
  }, [viewport])

  return (
    <div
      ref={containerRef}
      className={cn('absolute inset-0 h-full w-full bg-black', className)}
      aria-hidden
    />
  )
}
