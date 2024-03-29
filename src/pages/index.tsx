import { GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType } from "next"
import React, { useMemo } from "react"
import {  TimeSeriesType } from '../types'
import { getNewCasesArray } from '../utils/toArray'
import { Canvas, ThreeEvent, useFrame } from '@react-three/fiber'
import Head  from "next/head"

import { Reflector } from "../components/Reflector"
import * as THREE from 'three'
import '../styles/index.module.css'
import HistoricalCases from "../components/HistoricalCases"
import Info from "../components/Info"


export default function Home({ jsonData, d }: InferGetStaticPropsType<typeof getStaticProps>) {
    const data: TimeSeriesType = jsonData
    const casesData = getNewCasesArray(data.cases)
    const lastUpdated = useMemo(() => new Date(casesData[casesData.length -1].title).toDateString(), [data])

    return (
        <>
            <Head>
                <title>Covid stats | Worldwide</title>
            </Head>
            <main>
                <p><small>last updated: {lastUpdated}</small></p>
                <section className="section-chart">

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

                </section>
            <Info />
            </main>
        </>
        
    )
}


const getStaticProps: GetStaticProps = async () => {
    const res = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=360')
    const jsonData: TimeSeriesType = await res.json()
    const a = await import('../../covid_data/countries_info.json')
    const d = JSON.parse(JSON.stringify(a))


    return { props: { jsonData, d} }
}




export {getStaticProps}


