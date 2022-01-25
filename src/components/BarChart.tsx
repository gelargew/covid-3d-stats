import { Box, Instance, Instances, MapControls, MeshReflectorMaterial, OrbitControls, Plane, SpotLight, TrackballControls } from "@react-three/drei"
import { Canvas, Props, useFrame } from "@react-three/fiber"
import { InstanceProps } from "@react-three/fiber/dist/declarations/src/core/renderer"

import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react"
import * as THREE from 'three'
import { Vector3 } from "three"

interface PropsType {
    title: string,
    count: number
}

const color = new THREE.Color()

export default function BarChart({ data }: { data: PropsType[]}) {
    const [height, setHeight] = useState(100000)
    const geometry = new THREE.BoxGeometry()
    geometry.translate(0, 0.5, 0)
    const handleClick = () => {
        setHeight(height < 200000 ? 200000 : 100000)
        console.log('click')
    }

    return (
        <group>
            <OrbitControls />
            <ambientLight />
            <Suspense fallback={null}>
                <Instances geometry={geometry} limit={100000} range={100000} onClick={handleClick} >
                    <meshStandardMaterial />
                    {data.map((d, i) => 
                    <Bar key={i} 
                    position={[(i - data.length/2)*1.1, 0, 0]} 
                    data={d}
                    height={height}
                    />)}
                </Instances>
                <Reflector />
            </Suspense>         
        </group>
    )
}

const Bar = ({data, height, ...props}: any) => {
    const ref: any = useRef()
    const yScale = data.count/height
    const [hovered, setHovered] = useState(false)

    useFrame(() => {
        ref.current.scale.y = THREE.MathUtils.damp(ref.current.scale.y, yScale, 0.01, 5)
        ref.current.color.lerp(color.set(hovered ? 'red' : 'lightblue'), hovered ? 1 : 0.1)
    })


    return (
        <Instance ref={ref} color='lightblue' castShadow
        onPointerOver={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)} 
        {...props} />
    )
}

const Reflector = () => {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[1000, 1000]} />
        <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={2048}
            mixBlur={1}
            mixStrength={60}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#151515"
            metalness={0.5}
            mirror={0}
        />
    </mesh>
    )
}