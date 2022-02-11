import { Box, Instance, Instances, MapControls, MeshReflectorMaterial, OrbitControls, Plane, SpotLight, TrackballControls } from "@react-three/drei"
import { Canvas, Props, ThreeEvent, useFrame, useThree } from "@react-three/fiber"

import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import * as THREE from 'three'

interface PropsType {
    title: string,
    count: number
}

interface chartProps {
    name?: string,
    data: PropsType[],
    position?: [x: number, y: number, z: number],
    rotation?: [x: number, y: number, z: number, order?: string | undefined]
}

const color = new THREE.Color()


export default function BarChart({ name='sd', data, position=[0,0,0], rotation=[0,0,0] }: chartProps) {
    const height = Math.max(...data.map(d => d.count))/50
    const width = useMemo(() => 50/data.length, [])
    const geometry = new THREE.BoxGeometry(width, 1, width)
    geometry.translate(0, 0.5, -0.5)




    return (
        <group scale={0.1} position={position} rotation={rotation}  >          
            <Suspense fallback={null}>
                <Instances geometry={geometry} limit={100000} range={100000} name={name}  >
                    <meshLambertMaterial  />
                    {data.map((d, i) => 
                    <Bar key={i} 
                    position={[(i - data.length/2)*1.1*width, 0, 0]} 
                    data={d}
                    height={height}
                    />)}
                </Instances>
            </Suspense>         
        </group>
    )
}

const Bar = ({data, height, ...props}: any) => {
    const ref: any = useRef()
    const yScale = data.count/height
    const zScale = data.count/height/10
    const [hovered, setHovered] = useState(false)

    useFrame((st, dt) => {
        ref.current.scale.y = THREE.MathUtils.damp(ref.current.scale.y, yScale, 0.01, 5)
        ref.current.scale.z = THREE.MathUtils.damp(ref.current.scale.z, zScale, 0.01, 5)
        ref.current.color.lerp(color.set(hovered ? 'red' : 'blue'), hovered ? 1 : 0.1)
    })


    return (
        <Instance ref={ref} color={'blue'} castShadow
        onPointerOver={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)} 
        name={data.title}
        {...props} />
    )
}

