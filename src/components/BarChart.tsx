import { Text, Instance, Instances } from "@react-three/drei"
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
    rotation?: [x: number, y: number, z: number, order?: string | undefined],
    color?: string,
    height?: number
}

const color = new THREE.Color()


export default function BarChart({ 
    name='', 
    data, 
    color='white',
    position=[0,0,0], 
    rotation=[0,0,0],
    height=undefined
}: chartProps) {
    const width = useMemo(() => 50/data.length, [])
    const geometry = new THREE.BoxGeometry(width, 1, width)
    geometry.translate(0, 0.5, -0.5)

    if (!height) height = Math.max(...data.map(d => d.count))/50



    return (
        <group scale={0.2} position={position} rotation={rotation}  >          
            <Suspense fallback={null}>
                <Instances geometry={geometry} limit={100000} range={100000} name={name}  >
                    <meshLambertMaterial  />
                    {data.map((d, i) => 
                    <Bar key={i} 
                    position={[(i - data.length/2)*1.1*width, 0, 0]} 
                    data={d}
                    height={height}
                    color={color}
                    />)}
                </Instances>
                <Text
                position={[0, 0.1, 8]}
                fontSize={10}
                rotation={[-Math.PI/2, 0, 0]}
                castShadow={false}
                >
                    {name}
                </Text>
                <Text
                position={[0, 0.1, 15]}
                fontSize={2}
                rotation={[-Math.PI/2, 0, 0]}
                castShadow={false}
                >
                    {data.at(0)?.title} - {data.at(-1)?.title}
                </Text>
            </Suspense>      
            

        </group>
    )
}

const Bar = ({data, height, ...props}: any) => {
    const ref: any = useRef()
    const yScale = useMemo(() => data.count/height, [height])
    const [hovered, setHovered] = useState(false)

    useFrame((st, dt) => {
        ref.current.scale.y = THREE.MathUtils.damp(ref.current.scale.y, yScale, 0.01, 5)
        ref.current.color.lerp(color.set(hovered ? 'red' : props.color), hovered ? 1 : 0.1)
    })


    return (
        <Instance ref={ref} color={props.color} castShadow
        onPointerOver={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)} 
        name={data.title}
        {...props} />
    )
}



