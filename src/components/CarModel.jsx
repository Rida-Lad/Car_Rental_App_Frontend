import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

function Model() {
  // Load the model file
  const gltf = useGLTF('/130.glb')
  
  return (
    <primitive 
      object={gltf.scene}
      scale={[1, 1, 1]} // Adjust scale if needed
      position={[0, 0, 0]} // Adjust position if needed
    />
  )
}

export default function CarModel() {
  return (
    <div style={{ 
      width: '600px', 
      height: '450px',
      margin: 'auto',
    }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Model />
        <OrbitControls 
          enableZoom={true}
          autoRotate={true}
          maxPolarAngle={Math.PI / 2} // Prevent flipping
        />
      </Canvas>
    </div>
  )
}