import React, { useEffect, useRef } from 'react';
import Head from "next/head";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
// import './styles.css';

const TEXTURE_PATH = "https://res.cloudinary.com/dg5nsedzw/image/upload/v1641657168/blog/vaporwave-threejs-textures/grid.png";

const VaporWaveView = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    /**
     * Base
     */
    // Debug    // Canvas

    const canvas = canvasRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Fog
    // const fog = new THREE.Fog("#000000", 1, 1.5);
    // scene.fog = fog;

    // Textures
    const textureLoader = new THREE.TextureLoader();
    const gridTexture = textureLoader.load(TEXTURE_PATH);
    const heightTexture = textureLoader.load("./displacement-7.png");
    const metalnessTexture = textureLoader.load("./metalness-2.png");

    // Plane
    const parameters = {
      displacementScale: 0.4,
      metalness: 1,
      roughness: 0.5,
    };

    const geometry = new THREE.PlaneGeometry(1, 2, 24, 24);
    const material = new THREE.MeshStandardMaterial({
      map: gridTexture,
      displacementMap: heightTexture,
      displacementScale: parameters.displacementScale,
      metalness: parameters.metalness,
      metalnessMap: metalnessTexture,
      roughness: parameters.roughness,
    });
    const plane = new THREE.Mesh(geometry, material);
    const plane2 = new THREE.Mesh(geometry, material);

    plane.rotation.x = -Math.PI * 0.5;
    plane2.rotation.x = -Math.PI * 0.5;

    plane.position.y = -0.0;
    plane.position.z = 0.15;
    plane2.position.y = 0.0;
    plane2.position.z = -1.85;
    scene.add(plane);
    scene.add(plane2);

    // Lights
    const ambientLight = new THREE.AmbientLight("#ffffff", 10);
    scene.add(ambientLight);

    const spotlight = new THREE.SpotLight(
      "#d53c3d",
      40,
      25,
      Math.PI * 0.1,
      0.25
    );
    spotlight.position.set(0.5, 0.75, 2.1);
    spotlight.target.position.x = -0.25;
    spotlight.target.position.y = 0.25;
    spotlight.target.position.z = 0.25;
    scene.add(spotlight);
    scene.add(spotlight.target);

    const spotlight2 = new THREE.SpotLight(
      "#d53c3d",
      40,
      25,
      Math.PI * 0.1,
      0.25
    );
    spotlight2.position.set(-0.5, 0.75, 2.1);
    spotlight2.target.position.x = 0.25;
    spotlight2.target.position.y = 0.25;
    spotlight2.target.position.z = 0.25;
    scene.add(spotlight2);
    scene.add(spotlight2.target);

    // Sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Base camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.01,
      20
    );
    camera.position.x = 0;
    camera.position.y = 0.06;
    camera.position.z = 0.5;
    camera.rotateOnAxis( new THREE.Vector3(1.2, 0, 0), 50);

    scene.add(camera);

    const canvasElement = canvas as HTMLCanvasElement | null;
    if (!canvasElement) {
      throw new Error("Canvas element is not available");
    }

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasElement,
    });

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.2));

    // Post-processing
    const effectComposer = new EffectComposer(renderer);
    effectComposer.setSize(sizes.width, sizes.height);
    effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const renderPass = new RenderPass(scene, camera);
    effectComposer.addPass(renderPass);

    const rgbShiftPass = new ShaderPass(RGBShiftShader);
    rgbShiftPass.uniforms["amount"].value = 0.011;
    effectComposer.addPass(rgbShiftPass);

    const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader);
    effectComposer.addPass(gammaCorrectionPass);

    const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight), // resolution
        0.1, // strength
        0.4, // radius
        0.15 // threshold
      );

    effectComposer.addPass(bloomPass);

    // Resize handler
    const handleResize = () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio));

      effectComposer.setSize(sizes.width, sizes.height);
      effectComposer.setPixelRatio(Math.min(window.devicePixelRatio));
    };

    window.addEventListener('resize', handleResize);

  
    // Animation
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update plane position
      plane.position.z = (elapsedTime * 0.15) % 2;
      plane2.position.z = ((elapsedTime * 0.15) % 2) - 2;
      // Create a new rectangle every few seconds and animate them towards the screen

      // Render
      effectComposer.render();

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      // controls.dispose();
      renderer.dispose();
      material.dispose();
      geometry.dispose();
      gridTexture.dispose();
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{maxHeight: '800px'}} className="the_vapor"></canvas>
  );
};

export default VaporWaveView;
