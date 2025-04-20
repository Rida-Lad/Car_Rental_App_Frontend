import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';



const Car3DModel = () => {
    const { scene } = useGLTF('/car-model.glb');
    return (
        <>
            <ambientLight intensity={0.8} />
            <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={1} castShadow />
            <primitive object={scene} scale={0.5} />
        </>
    );
};

const CarModel = () => {
    return (
        <Canvas>
            <OrbitControls />
            <Car3DModel />
        </Canvas>
    );
};

export default CarModel;