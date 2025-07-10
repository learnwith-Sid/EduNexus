import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeJSBackground = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount || !window.THREE) return;

        let renderer, scene, camera, animationFrameId;
        const mouse = new THREE.Vector2();

        // Scene setup
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
        camera.position.z = 6;

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        mount.appendChild(renderer.domElement);

        // --- Texture Loading ---
        const textureLoader = new THREE.TextureLoader();
        let envMapTexture;
        textureLoader.load(
            '../../assets/images/colormap-6.png',
            (texture) => {
                texture.mapping = THREE.EquirectangularReflectionMapping;
                scene.background = texture;
                scene.environment = texture;
                envMapTexture = texture; // Store for potential later use
            }
        );

        let colormapTexture;
        textureLoader.load(
            '../../assets/images/colormap-6.png',
            (texture) => {
                colormapTexture = texture;
                // Apply the colormap as a texture to the Sphere
                // sphere.material.map = colormapTexture;
                // sphere.material.needsUpdate = true; // Important: Tell the material to update
            }
        );

        // --- 3D Objects ---
        const objects = [];
        const reflectiveMaterial = new THREE.MeshStandardMaterial({
            metalness: 1.0,
            roughness: 0.0,
            envMap: envMapTexture // Use the loaded environment map
        });
        const texturedMaterial = new THREE.MeshStandardMaterial({ // Material for the textured object
            metalness: 0.5, // Adjust for desired appearance
            roughness: 0.5,
        });

        // 1. Sphere (Replaced Torus Knot)
        // const sphereGeometry = new THREE.SphereGeometry(1.5, 32, 32); // Radius, widthSegments, heightSegments
        // const sphere = new THREE.Mesh(sphereGeometry, texturedMaterial); // Use the textured material initially
        // sphere.position.set(-3.5, 0, 0);
        // scene.add(sphere);
        // objects.push(sphere);

        // // 2. Icosahedron (faceted sphere)
        // const icosahedronGeometry = new THREE.IcosahedronGeometry(1.5, 0);
        // const icosahedron = new THREE.Mesh(icosahedronGeometry, reflectiveMaterial);
        // icosahedron.position.set(3.5, 0, 0);
        // scene.add(icosahedron);
        // objects.push(icosahedron);

        // 3. Torus
        // const torusGeometry = new THREE.TorusGeometry(1, 0.3, 16, 100);
        // const torus = new THREE.Mesh(torusGeometry, reflectiveMaterial);
        // torus.position.set(0, 0, -3);
        // scene.add(torus);
        // objects.push(torus);

        // Mouse move listener for parallax effect
        const onMouseMove = (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', onMouseMove);

        // Animation loop
        const clock = new THREE.Clock();
        const animate = () => {
            const elapsedTime = clock.getElapsedTime();

            // Animate objects
            // sphere.rotation.y = elapsedTime * 0.1;
            // sphere.rotation.x = -elapsedTime * 0.05;

            // icosahedron.rotation.y = -elapsedTime * 0.15;
            // icosahedron.rotation.x = elapsedTime * 0.1;

            // torus.rotation.y = elapsedTime * 0.08;
            // torus.rotation.z = elapsedTime * 0.1;

            // Parallax effect for camera
            camera.position.x += (mouse.x * 2 - camera.position.x) * 0.02;
            camera.position.y += (mouse.y * 2 - camera.position.y) * 0.02;
            camera.lookAt(scene.position);

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
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            if (mount && renderer && renderer.domElement) {
                mount.removeChild(renderer.domElement);
            }
            objects.forEach(obj => {
                obj.geometry.dispose();
                obj.material.dispose();
            });
            renderer.dispose();
            if (envMapTexture) envMapTexture.dispose();
            if (colormapTexture) colormapTexture.dispose();
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className="absolute top-0 left-0 w-full h-full"
        />
    );
};

export default ThreeJSBackground;