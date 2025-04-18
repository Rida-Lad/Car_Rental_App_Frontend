import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

function Model() {
    const gltf = useGLTF('/130.glb')
    return <primitive object={gltf.scene} scale={1.2} />
}

export default function CarModel() {
    return (
        <div style={{ width: '600px', height: '450px', margin: 'auto' }}>
            <Canvas camera={{ position: [1, 2, 4], fov: 45 }}>
                <ambientLight intensity={1} />
                <Model />
                <OrbitControls />
            </Canvas>
        </div>
    )
}
