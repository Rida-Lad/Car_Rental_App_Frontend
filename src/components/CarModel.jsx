import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

function Model() {
  const gltf = useGLTF('/130.glb')
  return (
    <primitive 
      object={gltf.scene} 
      scale={0.9} // Increased scale
      rotation={[0, Math.PI / 4, 0]} // Initial angled rotation
    />
  )
}

export default function CarModel() {
  return (
    <div style={{ 
      width: '600px', 
      height: '450px',
      margin: 'auto',
      background: 'transparent' // No background
    }}>
      <Canvas
        camera={{ position: [0, 2, 0], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Dramatic Lighting Setup */}
        <ambientLight intensity={0.8} />
        <directionalLight
          position={[10, 10, 10]}
          intensity={1.5}
          color="#ffffff"
        />
        <directionalLight
          position={[-10, 10, -10]}
          intensity={0.8}
          color="#444444"
        />
        <hemisphereLight
          intensity={0.5}
          groundColor="#000000"
        />

        <Model />

        <OrbitControls
          enableZoom={false}
          autoRotate={false}
          minPolarAngle={Math.PI/6}
          maxPolarAngle={Math.PI/2}
          enablePan={false}
        />
      </Canvas>
    </div>
  )
}