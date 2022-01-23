import { Box, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"

interface PropsType {
    title: string,
    count: number
}

export default function BarChart({ data }: { data: PropsType[]}) {
    
    return (
        <Canvas>
            <ambientLight />
            <OrbitControls />
            <Suspense fallback={null}>
                {data.map((n, i) => 
                <Box 
                key={i} 
                args={[0.2, (n.count/data[0].count)**2, 0.2]} 
                position={[i/4 - (data.length / 2 /4), 0, 0]} 
                />)}
            </Suspense>
            
        </Canvas>
    )
}