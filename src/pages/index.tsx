import { GetServerSideProps, GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType } from "next"
import React, { ReactNode, RefObject, useEffect, useRef, useState } from "react"
import BarChart from '../components/BarChart'
import { CasesType, NewCasesType, TimeSeriesType } from '../types'
import { getNewCasesArray } from '../utils/toArray'
import { Canvas, ThreeEvent, useFrame, useThree } from '@react-three/fiber'
import { Html, MapControls, OrbitControls } from '@react-three/drei'
import { Reflector } from "../components/Reflector"
import * as THREE from 'three'
import '../styles/index.module.css'

import historical from '../historical.json'
import { useControls } from "leva"


const AXIS_ANGLE = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(-1, 0.5, 0.3), Math.PI/6)
const q = new THREE.Quaternion(0, 0, 0)
const p = new THREE.Vector3(0, 10, 30)

export default function Home({ jsonData }: InferGetStaticPropsType<typeof getStaticProps>) {
    const data: TimeSeriesType = jsonData
    const casesData = getNewCasesArray(data.cases)

    return (
        <>
            <main>
                <h1>COVID-19 PANDEMIC STATISTICS</h1>
                <h2>global daily time series data</h2>
                <p><small>last updated: {casesData.at(-1)?.title}</small></p>

                <section>

                    <Canvas>
                        <ambientLight />
                        <Objects data={data} />
                        <Reflector />
                    </Canvas>

                    <div className="canvas-layout">
                        <div className="bar-desc">
                        </div>
                        <button className='back-button' >BACK</button>
                    </div>

                </section>
                
            </main>
        </>
        
    )
}

const Objects = ({ data }: 
{ data: TimeSeriesType }) => {
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
                q.multiply(AXIS_ANGLE) 
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


const getStaticProps: GetStaticProps = async () => {
    /* const res = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
    const jsonData: TimeSeriesType = await res.json() */
    const jsonData: TimeSeriesType = historical

    return { props: { jsonData }, revalidate: 60*60*24 }
}




export {getStaticProps}


