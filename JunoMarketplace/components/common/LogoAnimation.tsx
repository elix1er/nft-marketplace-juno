import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const LogoAnimation = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentRef = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    currentRef.appendChild(renderer.domElement);

    const logoGeometry = new THREE.CircleGeometry(5, 32);
    const logoMaterial = new THREE.MeshBasicMaterial({ color: 0xFF7B7C });
    const logo = new THREE.Mesh(logoGeometry, logoMaterial);
    scene.add(logo);

    camera.position.z = 20;

    const animate = () => {
      requestAnimationFrame(animate);
      logo.rotation.x += 0.01;
      logo.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    gsap.to(logo.scale, {
      duration: 2,
      x: 1.5,
      y: 1.5,
      z: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    return () => {
      currentRef.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef}  />;
};

export default LogoAnimation;
