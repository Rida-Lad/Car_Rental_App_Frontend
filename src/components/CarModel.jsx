import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';



const Car3DModel = () => {
    const { scene } = useGLTF('/car-model.glb');
    return <primitive object={scene} scale={0.5} />;
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