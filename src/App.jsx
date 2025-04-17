// App.jsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function App() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 10, 10);
    scene.add(directionalLight);
    
    // Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    
    // Load the 3D model from Sketchfab
    // Replace this URL with your actual model URL from Sketchfab
    // You'll need to download your model as glTF format
    const modelUrl = 'path/to/your/model.glb';
    
    const loader = new GLTFLoader();
    loader.load(
      modelUrl,
      (gltf) => {
        // Center the model
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        gltf.scene.position.x = -center.x;
        gltf.scene.position.y = -center.y;
        gltf.scene.position.z = -center.z;
        
        // Add the model to the scene
        scene.add(gltf.scene);
        
        // Adjust camera position based on model size
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        const cameraDistance = maxDim / (2 * Math.tan(fov / 2));
        
        camera.position.z = cameraDistance * 1.5;
        camera.updateProjectionMatrix();
        
        controls.update();
      },
      (progress) => {
        console.log('Loading model...', progress);
      },
      (error) => {
        console.error('Error loading model:', error);
      }
    );
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);
  
  return (
    <div className="h-screen w-full">
      <div ref={containerRef} className="w-full h-full"></div>
    </div>
  );
}

export default App;