import { GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType } from "next"
import React, {  useEffect, useMemo, useRef, useState } from "react"
import BarChart from '../components/BarChart'
import {  TimeSeriesType } from '../types'
import { getNewCasesArray } from '../utils/toArray'
import { Canvas, ThreeEvent, useFrame } from '@react-three/fiber'

import { Reflector } from "../components/Reflector"
import * as THREE from 'three'
import '../styles/index.module.css'


import HistoricalCases from "../../covid_data/historical_all.json"


const AXIS_ANGLE = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(-1, 0.5, 0.3), Math.PI/6)
const q = new THREE.Quaternion(0, 0, 0)
const p = new THREE.Vector3(0, 10, 30)

export default function Home({ jsonData }: InferGetStaticPropsType<typeof getStaticProps>) {

    const data: TimeSeriesType = jsonData
    const casesData = getNewCasesArray(data.cases)
    const lastUpdated = useMemo(() => casesData[casesData.length -1].title, [data])


    return (
        <>
            <main>
                <button onClick={() => console.log(HistoricalCases)}>HistoricalCases</button>

{/*                 <h1>COVID-19 PANDEMIC STATISTICS</h1>
                <h2>global daily time series data</h2>
                <p><small>last updated: {lastUpdated}</small></p>
                <section>

                    <Canvas>
                        <ambientLight />
                        <HistoricalCases data={data} />
                        <Reflector />
                    </Canvas>

                    <div className="canvas-layout">
                        <div className="bar-desc">
                        </div>
                        <button className='back-button' ><img src='/icon-back.svg' /></button>
                    </div>

                </section> */}
                
            </main>
        </>
        
    )
}


const getStaticProps: GetStaticProps = async () => {
    const res = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=360')
    const jsonData: TimeSeriesType = await res.json()
/*     const jsonData: TimeSeriesType = historical */

    return { props: { jsonData }, revalidate: 60*60*24 }
}




export {getStaticProps}


