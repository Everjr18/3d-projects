import * as THREE from 'three'

function getSunMaterial({
  coreColor,
  rimColor,
  textureUrl,
}: {
  coreColor: number
  rimColor: number
  textureUrl: string
}) {
  const textureLoader = new THREE.TextureLoader()
  const sunTexture = textureLoader.load(textureUrl)

  const uniforms = {
    coreColor: { value: new THREE.Color(coreColor) },
    rimColor: { value: new THREE.Color(rimColor) },
    sunTexture: { value: sunTexture },
    time: { value: 0.0 },
  }

  const vs = `
    varying vec3 vNormal;
    varying vec2 vUv;

    void main() {
      vNormal = normalize(normalMatrix * normal);
      vUv = uv; // Pasar las coordenadas UV
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const fs = `
    uniform vec3 coreColor;
    uniform vec3 rimColor;
    uniform sampler2D sunTexture; // Textura del sol
    uniform float time;

    varying vec3 vNormal;
    varying vec2 vUv;

    float random(vec2 co) {
      return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
      float intensity = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
      intensity *= 0.5 + 0.5 * sin(time * 5.0); // Brillo dinámico

      // Generar ruido
      float noise = random(vUv * 10.0 + time) * 0.1;

      // Usar la textura
      vec4 textureColor = texture2D(sunTexture, vUv);
      vec3 color = mix(coreColor, rimColor, intensity + noise) * textureColor.rgb;

      float halo = smoothstep(0.8, 1.0, length(vNormal));
      color += halo * vec3(1.0, 1.0, 0.0) * 0.2;

      gl_FragColor = vec4(color, 1.0);
    }
  `

  const sunMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vs,
    fragmentShader: fs,
    transparent: true,
    side: THREE.FrontSide,
  })

  return sunMaterial
}

export { getSunMaterial }
