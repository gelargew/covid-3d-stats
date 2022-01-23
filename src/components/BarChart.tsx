import { Box, MapControls, OrbitControls, SpotLight } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"

interface PropsType {
    title: string,
    count: number
}

export default function BarChart({ data }: { data: PropsType[]}) {
    
    return (
        <Canvas>
            <OrbitControls />
            <SpotLight position={[-5, 5, 5]} power={10} distance={15} angle={0.9} />
            <Suspense fallback={null}>
                {data.map((n, i) => 
                <Box 
                key={i} 
                args={[0.05, n.count/1000000, 1]} 
                position={[i/18 - (data.length / 2 /18), 0, 0]} 
                >
                    <meshLambertMaterial />
                </Box>)}
            </Suspense>
            
        </Canvas>
    )
}