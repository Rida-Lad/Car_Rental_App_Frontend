import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';



const Car3DModel = () => {
    const { scene } = useGLTF('/car-model.glb');
    return <primitive object={scene} scale={0.5} />;
};

const CarModel = () => {
    return (
        <div>
            <h1>Car Model</h1>
            <p>Welcome to the Car Model page. Here you can find details about various car models available for rent.</p>
            <Canvas style={{ height: '500px' }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} />
                <Car3DModel />
                <OrbitControls />
            </Canvas>
        </div>
    );
};

export default CarModel;