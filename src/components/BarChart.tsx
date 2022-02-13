import { Text, Instance, Instances, Box } from "@react-three/drei"
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

const truncateCount = (str: string) => {
    console.log(str.length)
    if (str.length > 7) {
        return `${str.slice(0, -6)}m`
    }
    else if (str.length > 4) {      
        return `${str.slice(0, -3)}k`
    }
    return str
}

export default function BarChart({ 
    name='', 
    data, 
    color='white',
    position=[0,0,0], 
    rotation=[0,0,0],
    height
}: chartProps) {
    const width = useMemo(() => 50/data.length, [])
    const geometry = new THREE.BoxGeometry(width, 1, width)
    geometry.translate(0, 0.5, -0.5)
    if (!height) height = Math.max(...data.map(d => d.count))/50
    const layoutX = (-2 - data.length/2)*1.1*width
    const line = useRef<THREE.Group>()
    const lineVec3 = new THREE.Vector3(10, 30, 0)
    const text = useMemo(() => {
        const a = Math.ceil(Math.max(...data.map(d => d.count)))
        const b = Math.ceil(a *3/5)
        const c = Math.ceil(a /5)

        return [
            truncateCount(a.toString()), 
            truncateCount(b.toString()), 
            truncateCount(c.toString())
        ]
    }, [data])




    useFrame((state, dt) => {

    })

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

                <group position={[layoutX, 0, 0]} >
                    <mesh geometry={geometry} scale={[0.1, 52, 0.1]} />
                    <group ref={line} position={[-0.5, 50, 0]}>
                        <mesh geometry={geometry}  scale={[2, 0.1, 0.1]} />
                        <Text
                        fontSize={1}
                        position={[-3, 0, 0]}
                        >{text[0]}</Text>
                    </group>
                    <group ref={line} position={[-0.5, 30, 0]}>
                        <mesh geometry={geometry}  scale={[2, 0.1, 0.1]} />
                        <Text
                        fontSize={1}
                        position={[-3, 0, 0]}
                        >{text[1]}</Text>
                    </group>
                    <group ref={line} position={[-0.5, 10, 0]}>
                        <mesh geometry={geometry}  scale={[2, 0.1, 0.1]} />
                        <Text
                        fontSize={1}
                        position={[-3, 0, 0]}
                        >{text[2]}</Text>
                    </group>
    
                </group>

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
        ref.current.color.lerp(color.set(hovered ? '#4CADB0' : props.color), hovered ? 1 : 0.1)
    })


    return (
        <Instance ref={ref} color={props.color} castShadow
        onPointerOver={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)} 
        name={data.title}
        userData={{
            data
        }}
        {...props} />
    )
}



