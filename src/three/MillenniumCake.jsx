import { useRef, useMemo, useLayoutEffect, Component } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float, Sparkles, ContactShadows, Environment } from '@react-three/drei'
import * as THREE from 'three'

class EnvironmentErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    console.warn('3D Environment HDR failed to load, using fallback lighting:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <group>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 8, 5]} intensity={1.5} color="#e9d5ff" />
          <directionalLight position={[-5, 3, -5]} intensity={0.6} color="#a78bfa" />
        </group>
      )
    }
    return this.props.children
  }
}

function Flame({ lit, onExtinguish }) {
  const group = useRef()
  const mat = useRef()
  const core = useRef()

  useFrame((state) => {
    if (!lit) return
    const t = state.clock.elapsedTime
    const pulse = 1 + Math.sin(t * 19) * 0.11 + Math.sin(t * 37) * 0.05
    if (group.current) group.current.scale.setScalar(pulse)
    if (mat.current) {
      mat.current.emissiveIntensity = 2.1 + Math.sin(t * 24) * 0.45
    }
    if (core.current) {
      core.current.scale.setScalar(0.55 + Math.sin(t * 30) * 0.06)
    }
  })

  if (!lit) return null

  return (
    <group ref={group} position={[0, 1.42, 0]}>
      <mesh
        onClick={(e) => {
          e.stopPropagation()
          onExtinguish?.()
        }}
      >
        <sphereGeometry args={[0.55, 24, 24]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <mesh
        ref={core}
        onClick={(e) => {
          e.stopPropagation()
          onExtinguish?.()
        }}
      >
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial
          ref={mat}
          color="#fffbeb"
          emissive="#ff5a1f"
          emissiveIntensity={2.2}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, 0.06, 0]} scale={[0.45, 0.9, 0.45]}>
        <sphereGeometry args={[0.2, 24, 24]} />
        <meshStandardMaterial
          color="#fff"
          emissive="#ffd27a"
          emissiveIntensity={1.6}
          transparent
          opacity={0.55}
        />
      </mesh>
      <pointLight position={[0, 0.1, 0]} intensity={2.2} color="#ffb454" distance={2.2} decay={2} />
    </group>
  )
}

function CakeBody() {
  const pink = useMemo(() => new THREE.Color('#fb7185'), [])
  const cream = useMemo(() => new THREE.Color('#fde68a'), [])

  return (
    <group position={[0, -0.15, 0]}>
      <mesh castShadow receiveShadow position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.92, 0.98, 0.36, 48]} />
        <meshPhysicalMaterial
          color={pink}
          roughness={0.35}
          metalness={0.05}
          clearcoat={0.4}
          clearcoatRoughness={0.2}
        />
      </mesh>
      <mesh castShadow position={[0, 0.52, 0]}>
        <cylinderGeometry args={[0.78, 0.86, 0.34, 48]} />
        <meshPhysicalMaterial color="#f472b6" roughness={0.32} metalness={0.08} clearcoat={0.55} />
      </mesh>
      <mesh castShadow position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.62, 0.72, 0.28, 48]} />
        <meshPhysicalMaterial color="#fbcfe8" roughness={0.28} clearcoat={0.65} />
      </mesh>
      <mesh castShadow position={[0, 1.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.58, 0.05, 12, 48]} />
        <meshPhysicalMaterial color={cream} roughness={0.22} clearcoat={0.7} />
      </mesh>
      <mesh castShadow position={[0, 1.12, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.52, 24]} />
        <meshStandardMaterial color="#fffef5" roughness={0.4} metalness={0.02} />
      </mesh>
    </group>
  )
}

function CameraRig({ shake }) {
  const { camera } = useThree()
  const base = useRef(null)
  useLayoutEffect(() => {
    base.current = { x: camera.position.x, y: camera.position.y, z: camera.position.z }
  }, [camera])
  useFrame((state) => {
    const b = base.current
    if (!b) return
    if (shake > 0) {
      camera.position.x = b.x + (Math.random() - 0.5) * 0.16 * shake
      camera.position.y = b.y + (Math.random() - 0.5) * 0.12 * shake
      camera.position.z = b.z + (Math.random() - 0.5) * 0.1 * shake
    } else {
      const t = state.clock.elapsedTime
      camera.position.x = b.x + Math.sin(t * 0.35) * 0.06
      camera.position.y = b.y + Math.sin(t * 0.5) * 0.04
      camera.position.z = b.z + Math.cos(t * 0.28) * 0.05
    }
    camera.lookAt(0, 0.75, 0)
  })
  return null
}

export function MillenniumCakeScene({ candleLit, cameraShake, onBlowRequest }) {
  return (
    <>
      <CameraRig shake={cameraShake} />
      <color attach="background" args={['#050208']} />
      <ambientLight intensity={0.35} />
      <spotLight
        position={[4, 6, 4]}
        angle={0.45}
        penumbra={0.65}
        intensity={1.8}
        color="#e9d5ff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-3, 2, 2]} intensity={0.6} color="#a78bfa" />
      <EnvironmentErrorBoundary>
        <Environment files="/environments/potsdamer_platz_1k.hdr" />
      </EnvironmentErrorBoundary>
      <Float speed={1.4} rotationIntensity={0.18} floatIntensity={0.42}>
        <group>
          <CakeBody />
          <Flame lit={candleLit} onExtinguish={onBlowRequest} />
        </group>
      </Float>
      <Sparkles count={120} scale={7} size={1.2} speed={0.45} color="#f0abfc" opacity={0.55} />
      <ContactShadows
        position={[0, -0.62, 0]}
        opacity={0.55}
        scale={14}
        blur={2.8}
        far={9}
        color="#000000"
      />
    </>
  )
}
