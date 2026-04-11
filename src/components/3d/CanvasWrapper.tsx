"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Preload } from "@react-three/drei";

interface CanvasWrapperProps {
    children: React.ReactNode;
    className?: string;
    fov?: number;
    cameraPosition?: [number, number, number];
}

export default function CanvasWrapper({
    children,
    className = "absolute inset-0 -z-10 pointer-events-none",
    fov = 45,
    cameraPosition = [0, 0, 10],
}: CanvasWrapperProps) {
    return (
        <div className={className}>
            <Canvas
                camera={{ position: cameraPosition, fov: fov }}
                dpr={[1, 2]} // Optimize for high DPI screens but cap at 2x
                gl={{ antialias: true, alpha: true }}
            >
                <Suspense fallback={null}>
                    {children}
                    <Preload all />
                </Suspense>
            </Canvas>
        </div>
    );
}
