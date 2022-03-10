import * as THREE from 'three'
import { ThreeEvent, useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { TimeSeriesType } from "../types"
import { getNewCasesArray } from "../utils/toArray"
import BarChart from "./BarChart"

const BAR_QUATERNION = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(-2, 0.5, 0.3), Math.PI/6)
const q = new THREE.Quaternion(0, 0, 0)
const p = new THREE.Vector3(0, 10, 30)

export default function HistoricalCases({ data }: { data: TimeSeriesType}) {
    const casesData = getNewCasesArray(data.cases)
    const deathsData = getNewCasesArray(data.deaths)
    const ref = useRef<THREE.Group>(null!)
    const clicked = useRef<THREE.Object3D>()
    const backButton = useRef(document.querySelector('.back-button'))
    const canvasLayout = useRef(document.querySelector('.canvas-layout'))

    const handleBack = () => {
        q.set(0, 0, 0, 1);
        p.set(0, 10, 30);
        (canvasLayout.current as HTMLElement).style.display = 'none'
        clicked.current = undefined
    }

    const handleClick = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation()
        if (e.object.parent) {
            if (clicked.current === e.object.parent) {
                e.object.updateWorldMatrix(true, true)
                e.object.getWorldQuaternion(q)    
                q.multiply(BAR_QUATERNION) 
                e.object.localToWorld(p.set(0, 1.1, 20));
            }
            else {
                clicked.current = e.object.parent
                clicked.current.updateWorldMatrix(true, true)
                clicked.current.localToWorld(p.set(0, 20, 45))
                clicked.current.getWorldQuaternion(q)
            }
        }
        (canvasLayout.current as HTMLElement).style.display = 'flex'
    }

    useEffect(() => {
        ref.current.getWorldQuaternion(q)
        backButton.current?.addEventListener('click', () => {
            handleBack()
        })
    }, [])

    useFrame((state, delta) => {
        state.camera.quaternion.slerp(q, THREE.MathUtils.damp(0, 1, 1, delta))
        state.camera.position.lerp(p, THREE.MathUtils.damp(0, 1, 4, delta))
    })

    return (
        <group ref={ref} onClick={handleClick} >
            <BarChart 
            name='cases' 
            data={casesData} 
            position={[-7, 0, 5]} 
            rotation={[0, -Math.PI/10, 0]} 
            color='orange' />
            <BarChart 
            name='deaths' 
            data={deathsData} 
            position={[7, 0, 5]} 
            rotation={[0, Math.PI/10, 0]}
            color='#C66651'
            />

        </group>        
    )
}
