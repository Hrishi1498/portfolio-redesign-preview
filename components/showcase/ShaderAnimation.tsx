'use client'

import { useEffect, useRef } from 'react'

const vertexShader = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = `
  precision highp float;
  uniform vec2 resolution;
  uniform float time;

  void main(void) {
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
    float t = time * 0.05;
    float lineWidth = 0.0025;

    vec3 color = vec3(0.0);
    for (int j = 0; j < 3; j++) {
      for (int i = 0; i < 5; i++) {
        color[j] += lineWidth * float(i * i) / abs(
          fract(t - 0.01 * float(j) + float(i) * 0.01) * 5.0 - length(uv) + mod(uv.x + uv.y, 0.2)
        );
      }
    }

    gl_FragColor = vec4(color, 1.0);
  }
`

function createRenderer(
  canvas: HTMLCanvasElement,
  THREE: typeof import('three'),
) {
  const options: import('three').WebGLRendererParameters[] = [
    { canvas, antialias: true, alpha: true, powerPreference: 'high-performance' },
    { canvas, antialias: false, alpha: false, powerPreference: 'default' },
    { canvas, antialias: false, alpha: true, failIfMajorPerformanceCaveat: false },
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

export function ShaderAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

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

    const handleResize = () => {
      if (!renderer || !material) return

      const width = container.clientWidth
      const height = container.clientHeight
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

    const startAnimation = () => {
      if (!renderer || !material || !scene || !camera) return

      stopAnimation()

      let lastFrame = performance.now()

      const animate = (now: number) => {
        if (disposed || !renderer || !material || !scene || !camera) return

        animationId = requestAnimationFrame(animate)

        const dt = Math.min(0.05, (now - lastFrame) / 1000)
        lastFrame = now

        material.uniforms.time.value += dt * 3
        renderer.render(scene, camera)
      }

      animationId = requestAnimationFrame(animate)
    }

    const initRenderer = () => {
      if (disposed || renderer || !threeModule) return

      const width = container.clientWidth
      const height = container.clientHeight
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

      const uniforms = {
        time: { value: 1.0 },
        resolution: { value: new THREE.Vector2() },
      }

      material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
      })

      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)
      container.appendChild(canvas)

      handleResize()
      startAnimation()
    }

    const tryInit = () => {
      if (renderer) {
        handleResize()
        return
      }
      initRenderer()
    }

    const resizeObserver = new ResizeObserver(tryInit)
    resizeObserver.observe(container)
    window.addEventListener('resize', handleResize, false)

    import('three').then((THREE) => {
      if (disposed) return
      threeModule = THREE
      tryInit()
    })

    return () => {
      disposed = true
      resizeObserver.disconnect()
      window.removeEventListener('resize', handleResize, false)
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
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 h-full w-full bg-black"
      aria-hidden
    />
  )
}
