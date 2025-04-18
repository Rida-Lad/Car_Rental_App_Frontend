import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

function Model() {
  const gltf = useGLTF('/130.glb')
  return <primitive object={gltf.scene} scale={0.5} />
}

export default function CarModel() {
  return (
    <div style={{ 
      width: '600px', 
      height: '450px', // Updated height
      margin: 'auto'
    }}>
      <Canvas
        camera={{ position: [2, 2, 5], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Improved Lighting Setup */}
        <ambientLight intensity={1.5} />
        <pointLight position={[5, 5, 5]} intensity={2} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={3}
          castShadow
        />
        <hemisphereLight intensity={1} />

        {/* Model & Controls */}
        <Model />
        <OrbitControls 
          enableZoom={true}
          autoRotate={true}
          autoRotateSpeed={2}
          maxPolarAngle={Math.PI / 2}
        />

        {/* Add ground plane for better lighting reflection */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#808080" />
        </mesh>
      </Canvas>
    </div>
  )
}