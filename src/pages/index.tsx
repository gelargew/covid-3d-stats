import { GetServerSideProps, GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType } from "next"
import { ReactNode, RefObject, useEffect, useRef, useState } from "react"
import BarChart from '../components/BarChart'
import { CasesType, NewCasesType, TimeSeriesType } from '../types'
import { getNewCasesArray } from '../utils/toArray'
import { Canvas, ThreeEvent, useFrame, useThree } from '@react-three/fiber'
import { MapControls, OrbitControls } from '@react-three/drei'
import { Reflector } from "../components/Reflector"
import * as THREE from 'three'
import { useRouter } from "next/router"

import historical from '../historical.json'
import { useControls } from "leva"


const GOLDENRATIO = 1.61803398875

export default function Home({ jsonData }: InferGetStaticPropsType<typeof getStaticProps>) {
    const data: TimeSeriesType = jsonData
    const q = new THREE.Quaternion(0, 0, 0)
    const p = new THREE.Vector3(0, 10, 30)
    const handleBack = () => {
        q.set(0, 0, 0, 1)
        p.set(0, 10, 30)
    }

    return (
        <>
            <main>
                <Canvas>
                    <ambientLight />
                    <Objects data={data} q={q} p={p} />
                    <Reflector />
                </Canvas>
                <button id='back' onClick={handleBack} >BACK</button>
            </main>
        </>
        
    )
}

const Objects = ({ data, q= new THREE.Quaternion(0, 0, 0), p = new THREE.Vector3(0, 0, 0) }: 
{ data: TimeSeriesType, q?: THREE.Quaternion, p?: THREE.Vector3 }) => {
    const casesData = getNewCasesArray(data.cases)
    const deathsData = getNewCasesArray(data.deaths)
    const ref = useRef<THREE.Group>(null!)
    const height = Math.max(...casesData.map(d => d.count))/50
    const {zoom} = useControls({
        zoom: {
            value: 1,
            min: 0.5,
            max: 4
        }
    })
    const clicked = useRef<THREE.Object3D>()

    
    const handleClick = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation()
        if (e.object.parent) {
            if (clicked.current === e.object.parent) {
                e.object.updateWorldMatrix(true, true)
                e.object.localToWorld(p.set(0, 0.4, 45))
                e.object.getWorldQuaternion(q)       
                console.log(e.object.position)            
            }
            else {
                clicked.current = e.object.parent
                clicked.current.updateWorldMatrix(true, true)
                clicked.current.localToWorld(p.set(0, 20, 45))
                clicked.current.getWorldQuaternion(q)
            }

        }
    }

    useEffect(() => {
        ref.current.getWorldQuaternion(q)

    }, [])

    useFrame((state, delta) => {
        state.camera.quaternion.slerp(q, THREE.MathUtils.damp(0, 1, 2, delta))
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


const getStaticProps: GetStaticProps = async () => {
    /* const res = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
    const jsonData: TimeSeriesType = await res.json() */
    const jsonData: TimeSeriesType = historical

    return { props: { jsonData }, revalidate: 60*60*24 }
}




export {getStaticProps}


