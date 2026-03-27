"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function generateParticlesData(count: number, radius: number) {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const colorPalette = [
        new THREE.Color("#10b981"), // Emerald
        new THREE.Color("#0d9488"), // Teal
        new THREE.Color("#fbbf24"), // Gold accent
        new THREE.Color("#ffffff"), // White
    ];

    for (let i = 0; i < count; i++) {
        // Spherical distribution
        const r = radius * Math.cbrt(Math.random());
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);

        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);

        // Assign random color from palette
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
    }
    return { positions, colors };
}


export default function FloatingParticles({ count = 1000 }) {
    const ref = useRef<any>(null);
    const { positions, colors } = useMemo(() => generateParticlesData(count, 20), [count]);

    useFrame((state, delta) => {
        if (ref.current) {
            // Gentle upward drift simulation
            ref.current.rotation.y += delta / 60; // Very slow rotation
            // Note: For true particle animation we'd need a custom shader or material update, 
            // but for now rotating the whole cloud slowly gives a "drifting" feel.

            // To make it look like 'rising', we can rotate on X slightly or just rely on the chaotic placement.
            ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    vertexColors
                    size={0.10}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.8}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    );
}
