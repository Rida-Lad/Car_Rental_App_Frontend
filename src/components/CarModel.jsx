import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const CarModel = () => {
    const carModelPath = '/car-model.glb';

    return (
        <Canvas>
            <OrbitControls />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <React.Suspense fallback={null}>
                <Model path={carModelPath} />
            </React.Suspense>
        </Canvas>
    );
};

const Model = ({ path }) => {
    const [gltf, setGltf] = React.useState(null);

    React.useEffect(() => {
        const loader = new GLTFLoader();
        loader.load(path, (loadedGltf) => {
            setGltf(loadedGltf);
        });
    }, [path]);

    return gltf ? <primitive object={gltf.scene} /> : null;
};

export default CarModel;