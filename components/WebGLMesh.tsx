'use client'

import { useEffect, useRef } from 'react'

const VERT = `
  attribute vec2 a_pos;
  void main() {
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`

const FRAG = `
  precision mediump float;
  uniform vec2 u_res;
  uniform float u_time;

  float blob(vec2 uv, vec2 center, float falloff) {
    float d = length(uv - center);
    return exp(-d * d * falloff);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_res;
    float asp = u_res.x / u_res.y;

    // Animate blob centers — slow lissajous paths
    vec2 b1 = vec2(
      0.22 + 0.16 * sin(u_time * 0.28),
      0.38 + 0.14 * cos(u_time * 0.23)
    );
    vec2 b2 = vec2(
      0.70 + 0.13 * cos(u_time * 0.35),
      0.44 + 0.17 * sin(u_time * 0.29)
    );
    vec2 b3 = vec2(
      0.48 + 0.11 * sin(u_time * 0.48),
      0.70 + 0.10 * cos(u_time * 0.38)
    );

    // Aspect-corrected UV for circular blobs
    vec2 uvA  = vec2(uv.x  * asp, uv.y);
    vec2 b1A  = vec2(b1.x  * asp, b1.y);
    vec2 b2A  = vec2(b2.x  * asp, b2.y);
    vec2 b3A  = vec2(b3.x  * asp, b3.y);

    float f1 = blob(uvA, b1A, 3.2);
    float f2 = blob(uvA, b2A, 3.8);
    float f3 = blob(uvA, b3A, 4.4);

    // Amber palette
    vec3 c1 = vec3(0.910, 0.588, 0.039) * f1;   // #E8960A
    vec3 c2 = vec3(0.784, 0.471, 0.039) * f2;   // #C87807
    vec3 c3 = vec3(0.627, 0.353, 0.020) * f3;   // #A05A05

    vec3 col = (c1 + c2 + c3) * 0.28;

    // Base dark — matches #060607
    vec3 base = vec3(0.024, 0.024, 0.027);
    gl_FragColor = vec4(base + col, 1.0);
  }
`

function compileShader(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  return shader
}

export default function WebGLMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
    })
    if (!gl) return

    // Compile & link
    const vert = compileShader(gl, gl.VERTEX_SHADER, VERT)
    const frag = compileShader(gl, gl.FRAGMENT_SHADER, FRAG)
    const prog = gl.createProgram()!
    gl.attachShader(prog, vert)
    gl.attachShader(prog, frag)
    gl.linkProgram(prog)
    gl.useProgram(prog)

    // Fullscreen quad
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    )
    const posLoc = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'u_res')
    const uTime = gl.getUniformLocation(prog, 'u_time')

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    const start = performance.now()
    const frame = () => {
      const t = (performance.now() - start) / 1000
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, t)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      rafRef.current = requestAnimationFrame(frame)
    }
    rafRef.current = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      gl.deleteProgram(prog)
      gl.deleteBuffer(buf)
      gl.deleteShader(vert)
      gl.deleteShader(frag)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ display: 'block' }}
      aria-hidden
    />
  )
}
