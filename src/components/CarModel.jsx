import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

function Model() {
  const gltf = useGLTF('/130.glb')
  return (
    <primitive 
      object={gltf.scene} 
      scale={0.5} // Adjust this number to match your model size
    />
  )
}

export default function CarModel() {
  return (
    <div style={{ 
      width: '600px', 
      height: '450px',
      margin: 'auto'
    }}>
      <Canvas
        camera={{ position: [5, 5, 5], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Simple but effective lighting */}
        <ambientLight intensity={1.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={2}
          castShadow
        />

        {/* Model */}
        <Model />

        {/* Controls - only rotation allowed */}
        <OrbitControls
          enableZoom={false} // Disable zoom
          autoRotate={false} // Disable auto-rotation
          minPolarAngle={Math.PI/6} // Limit vertical rotation
          maxPolarAngle={Math.PI/2} // Keep model upright
        />

        {/* Add subtle background */}
        <color attach="background" args={['#f0f0f0']} />
      </Canvas>
    </div>
  )
}