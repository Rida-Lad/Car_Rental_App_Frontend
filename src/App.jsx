// App.jsx
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function App() {
  const containerRef = useRef(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState('#f0f0f0');
  const [rotationSpeed, setRotationSpeed] = useState(0);
  
  // Store model reference to manipulate it later
  const modelRef = useRef(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    let modelScene;
    
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(backgroundColor);
    
    // Get container dimensions
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    const camera = new THREE.PerspectiveCamera(
      75, 
      width / height, 
      0.1, 
      1000
    );
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 10, 10);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    // Add a point light for more dimension
    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    // Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    
    // Load the 3D model from Sketchfab
    // Replace this URL with your actual model URL from Sketchfab
    const modelUrl = '130.glb';
    
    const loader = new GLTFLoader();
    setLoading(true);
    
    loader.load(
      modelUrl,
      (gltf) => {
        modelScene = gltf.scene;
        modelRef.current = gltf.scene;
        
        // Center the model
        const box = new THREE.Box3().setFromObject(modelScene);
        const center = box.getCenter(new THREE.Vector3());
        modelScene.position.x = -center.x;
        modelScene.position.y = -center.y;
        modelScene.position.z = -center.z;
        
        // Enable shadows for all objects in the model
        modelScene.traverse((node) => {
          if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });
        
        // Add the model to the scene
        scene.add(modelScene);
        
        // Adjust camera position based on model size
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        const cameraDistance = maxDim / (2 * Math.tan(fov / 2));
        
        camera.position.z = cameraDistance * 1.5;
        camera.updateProjectionMatrix();
        
        controls.update();
        setModelLoaded(true);
        setLoading(false);
      },
      (progress) => {
        console.log('Loading model...', progress.loaded / progress.total * 100, '%');
      },
      (error) => {
        console.error('Error loading model:', error);
        setLoading(false);
      }
    );
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Apply rotation if speed is set
      if (modelScene && rotationSpeed > 0) {
        modelScene.rotation.y += rotationSpeed / 100;
      }
      
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
    
    // Handle container resize
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    
    // Add resize observer for the container
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    
    // Update scene background when backgroundColor changes
    scene.background = new THREE.Color(backgroundColor);
    
    // Cleanup
    return () => {
      resizeObserver.disconnect();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [backgroundColor, rotationSpeed]);
  
  // Function to handle background color change
  const handleBackgroundChange = (e) => {
    setBackgroundColor(e.target.value);
  };
  
  // Function to handle rotation speed change
  const handleRotationChange = (e) => {
    setRotationSpeed(parseFloat(e.target.value));
  };
  
  return (
    <div className="min-h-screen w-full flex flex-col items-center p-8 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">3D Model Viewer</h1>
      
      {/* Model container - medium sized and centered */}
      <div className="w-full max-w-2xl h-96 bg-white rounded-lg shadow-lg overflow-hidden mb-4">
        <div ref={containerRef} className="w-full h-full relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-white">
              <p className="text-lg">Loading model...</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Controls for customization */}
      <div className="w-full max-w-2xl bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-3">Customize Viewer</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Background color control */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="bg-color">
              Background Color
            </label>
            <div className="flex items-center">
              <input
                type="color"
                id="bg-color"
                value={backgroundColor}
                onChange={handleBackgroundChange}
                className="h-10 w-12 border border-gray-300 rounded mr-2"
              />
              <span className="text-sm">{backgroundColor}</span>
            </div>
          </div>
          
          {/* Rotation speed control */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="rotation">
              Auto-Rotation Speed
            </label>
            <input
              type="range"
              id="rotation"
              min="0"
              max="10"
              step="0.1"
              value={rotationSpeed}
              onChange={handleRotationChange}
              className="w-full"
            />
            <div className="flex justify-between text-xs">
              <span>Off</span>
              <span>Fast</span>
            </div>
          </div>
        </div>
        
        {/* Instructions */}
        <div className="mt-4 text-sm text-gray-600">
          <p>• Click and drag to rotate the model</p>
          <p>• Scroll to zoom in/out</p>
          <p>• Right-click and drag to pan</p>
        </div>
      </div>
    </div>
  );
}

export default App;