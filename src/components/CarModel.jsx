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
        <div>
            <h1>Car Model</h1>
            <p>Welcome to the Car Model page. Here you can find details about various car models available for rent.</p>
            <Canvas>
                <ambientLight intensity={1} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} />
                <hemisphereLight intensity={0.6} groundColor="white" />
                <OrbitControls 
                    enableZoom={false} 
                    maxPolarAngle={Math.PI / 2} 
                    minPolarAngle={Math.PI / 2} 
                />
                <Car3DModel />
            </Canvas>
        </div>
    );
};

export default CarModel;