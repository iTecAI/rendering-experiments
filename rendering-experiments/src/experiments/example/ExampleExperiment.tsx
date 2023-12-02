import { useFrame, Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";

function Box(props: { position: [number, number, number]; scale: number }) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef<any>();
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false);
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (ref.current.rotation.x += delta));
    // Return the view, these are regular Threejs elements expressed in JSX
    return (
        <mesh
            {...props}
            ref={ref}
            onPointerOver={(event) => (event.stopPropagation(), hover(true))}
            onPointerOut={() => hover(false)}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
        </mesh>
    );
}

export function ExampleExperiment(props: { boxes: number; scale: number }) {
    const boxes: JSX.Element[] = useMemo(() => {
        const items: JSX.Element[] = [];
        for (let i = 0; i < props.boxes; i++) {
            items.push(
                <Box key={i} position={[1.2 * i, 0, 0]} scale={props.scale} />
            );
        }
        return items;
    }, [props.boxes, props.scale]);

    return (
        <Canvas>
            <ambientLight intensity={Math.PI / 2} />
            <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                decay={0}
                intensity={Math.PI}
            />
            <pointLight
                position={[-10, -10, -10]}
                decay={0}
                intensity={Math.PI}
            />
            {boxes}
            <OrbitControls />
        </Canvas>
    );
}
