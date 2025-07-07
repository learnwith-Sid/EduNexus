import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeJSBackground = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        let renderer, scene, camera, animationFrameId;

        // Scene setup
        scene = new THREE.Scene();
        camera = new THREE.OrthographicCamera(mount.clientWidth / -2, mount.clientWidth / 2, mount.clientHeight / 2, mount.clientHeight / -2, 1, 1000);
        camera.position.z = 1;

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        mount.appendChild(renderer.domElement);
        
        // --- Create Floating Circles ---
        const circles = [];
        const circleCount = 20;
        const colors = [0x0077be, 0x00a8e8, 0xffffff, 0x90e0ef]; // Shades of blue and white

        for (let i = 0; i < circleCount; i++) {
            const radius = Math.random() * 50 + 20;
            const geometry = new THREE.CircleGeometry(radius, 32);
            const material = new THREE.MeshBasicMaterial({
                color: colors[Math.floor(Math.random() * colors.length)],
                transparent: true,
                opacity: Math.random() * 0.3 + 0.1
            });

            const circle = new THREE.Mesh(geometry, material);

            // Position circles within the viewport
            circle.position.x = (Math.random() - 0.5) * mount.clientWidth;
            circle.position.y = (Math.random() - 0.5) * mount.clientHeight;
            circle.position.z = (Math.random() - 0.5) * 500;

            // Add custom properties for animation
            circle.userData.velocity = new THREE.Vector3(
                (Math.random() - 0.5) * 0.5,
                (Math.random() - 0.5) * 0.5,
                0
            );
            circle.userData.initialOpacity = material.opacity;
            
            scene.add(circle);
            circles.push(circle);
        }

        // Animation loop
        const animate = () => {
            circles.forEach(circle => {
                circle.position.add(circle.userData.velocity);

                // Bounce off edges
                if (circle.position.x > mount.clientWidth / 2 || circle.position.x < -mount.clientWidth / 2) {
                    circle.userData.velocity.x *= -1;
                }
                if (circle.position.y > mount.clientHeight / 2 || circle.position.y < -mount.clientHeight / 2) {
                    circle.userData.velocity.y *= -1;
                }
                
                // Fade in and out
                circle.material.opacity = circle.userData.initialOpacity * (Math.sin(Date.now() * 0.001 + circle.position.x) * 0.5 + 0.5);
            });

            renderer.render(scene, camera);
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        // Handle resize
        const handleResize = () => {
            if (!renderer || !camera || !mount) return;
            const width = mount.clientWidth;
            const height = mount.clientHeight;
            
            renderer.setSize(width, height);
            camera.left = width / -2;
            camera.right = width / 2;
            camera.top = height / 2;
            camera.bottom = height / -2;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            if (mount && renderer && renderer.domElement) {
                mount.removeChild(renderer.domElement);
            }
            circles.forEach(circle => {
                circle.geometry.dispose();
                circle.material.dispose();
            });
            renderer.dispose();
        };
    }, []);

    return (
        <div 
            ref={mountRef} 
            className="fixed top-0 left-0 -z-10 w-full h-full bg-gray-900" 
            style={{ backgroundColor: '#020617' }} // Dark navy blue
        />
    );
};

export default ThreeJSBackground;
