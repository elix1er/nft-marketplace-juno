import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const WebGLBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = mountRef.current;
    if (!currentRef) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ depth: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    currentRef.appendChild(renderer.domElement);

    const vertexShader = `
      varying vec3 vUv; 

      void main() {
        vUv = position; 

        vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * modelViewPosition;
      }
    `;

    const fragmentShader = `
      uniform float time;
      varying vec3 vUv;

      void main() {
        float wave = sin(vUv.x * 10.0 + time) * 0.5 + 0.5;
        gl_FragColor = vec4(vec3(1.0, 0.5, 0.8) * wave, 1.0);
      }
    `;

    const uniforms = {
      time: { value: 1.0 }
    };

    const geometry = new THREE.PlaneGeometry(20, 10, 32, 32);
    const material = new THREE.ShaderMaterial({

      vertexShader,
      fragmentShader,
      uniforms,
      wireframe: true
    });

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    camera.position.z = 1;

    const animate = () => {
      requestAnimationFrame(animate);
      uniforms.time.value += 0.02;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      currentRef.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'relative', top: 0, left: 0, width: '100%', height: '100%' }} />;
};

export default WebGLBackground;
