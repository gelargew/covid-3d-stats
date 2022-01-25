import { Box, Instance, Instances, MapControls, MeshReflectorMaterial, OrbitControls, Plane, SpotLight } from "@react-three/drei"
import { Canvas, Props, useFrame } from "@react-three/fiber"
import { InstanceProps } from "@react-three/fiber/dist/declarations/src/core/renderer"

import { Suspense, useEffect, useLayoutEffect, useRef } from "react"
import * as THREE from 'three'
import { Vector3 } from "three"

interface PropsType {
    title: string,
    count: number
}

export default function BarChart({ data }: { data: PropsType[]}) {
    const geometry = new THREE.BoxGeometry()
    geometry.translate(0, 0.5, 0)

    return (
        <group>
            <OrbitControls />
            <ambientLight />
            <Suspense fallback={null}>
                <Instances geometry={geometry} limit={100000} range={100000} >
                    <meshStandardMaterial />
                    {data.map((d, i) => 
                    <Bar key={i} 
                    position={[(i - data.length/2)*1.05, 0, 0]} 
                    data={d}
                    />)}
                </Instances>
                <Reflector />
            </Suspense>         
        </group>
    )
}

const Bar = ({data, ...props}: any) => {
    const ref: any = useRef()

    useEffect(() => {
        ref.current.scale.y = data.count/100000
    }, [])


    return (
        <Instance ref={ref} color='lightblue' castShadow {...props} />
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