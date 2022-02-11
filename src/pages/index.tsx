import { GetServerSideProps, GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType } from "next"
import { ReactNode, RefObject, useEffect, useRef, useState } from "react"
import BarChart from '../components/BarChart'
import { CasesType, NewCasesType, TimeSeriesType } from '../types'
import { getNewCasesArray } from '../utils/toArray'
import { Canvas, ThreeEvent, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Reflector } from "../components/Reflector"
import * as THREE from 'three'
import { useRouter } from "next/router"

import historical from '../historical.json'


const GOLDENRATIO = 1.61803398875

export default function Home({ jsonData }: InferGetStaticPropsType<typeof getStaticProps>) {
    const data: TimeSeriesType = jsonData

    return (
        <>
            <main>
                <Canvas>
                    <ambientLight />
                    <Objects data={data} />
                    <Reflector />
                </Canvas>
                <button id='back'>BACK</button>
            </main>
        </>
        
    )
}

const Objects = ({ data }: { data: TimeSeriesType}) => {
    const casesData = getNewCasesArray(data.cases)
    const deathsData = getNewCasesArray(data.deaths)
    const p = new THREE.Vector3(0, 30, 60)
    const q = new THREE.Quaternion(0.4, 0, 0)
    const ref = useRef<THREE.Group>(null!)

    
    const handleClick = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation()
        e.object.parent?.updateWorldMatrix(true, true)
        e.object.parent?.localToWorld(p.set(0, 20, 40))
        e.object.parent?.getWorldQuaternion(q)
    }

    useEffect(() => {
        ref.current.getWorldQuaternion(q)
        console.log(q)
    }, [])

    useFrame((state, delta) => {
        /* state.camera.position.lerp(p, THREE.MathUtils.damp(0, 1, 3, delta))
        state.camera.quaternion.slerp(q, THREE.MathUtils.damp(0, 1, 2, delta)) */
        state.camera.quaternion.slerp(q, THREE.MathUtils.damp(0, 1, 2, delta))
        state.camera.position.lerp(p, THREE.MathUtils.damp(0, 1, 3, delta))
    })


    return (
        <group ref={ref} onClick={handleClick}>
            <BarChart name='cases' data={casesData} position={[0, 0, 10]} />
            <BarChart name='deaths' data={deathsData} position={[20, 0, 0]} rotation={[0, Math.PI/4, 0]} />
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


