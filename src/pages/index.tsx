import { GetServerSideProps, GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType } from "next"
import { useEffect, useState } from "react"
import BarChart from '../components/BarChart'
import { CasesType, NewCasesType, TimeSeriesType } from '../types'
import { getNewCasesArray } from '../utils/toArray'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Reflector } from "../components/Reflector"
import * as THREE from 'three'




export default function Home({ jsonData }: InferGetStaticPropsType<typeof getStaticProps>) {
    const data: TimeSeriesType = jsonData

    return (
        <>
            <main>
                <Canvas>

                    <ambientLight />
                    <Objects data={data} />
                </Canvas>
            </main>
        </>
        
    )
}

const Objects = ({ data }: { data: TimeSeriesType}) => {
    const casesData = getNewCasesArray(data.cases)
    const deathsData = getNewCasesArray(data.deaths)
    const {camera} = useThree()
    const q = new THREE.Quaternion(100, 55, 100, 5)

    useFrame((state, dt) => {
        state.camera.quaternion.slerp(q, dt)
    })


    return (
        <>
            <BarChart data={casesData} />
            <BarChart data={deathsData} position={[100, 0, 0]}/>
            <Reflector />
        </>
    )
}


const getStaticProps: GetStaticProps = async () => {
    const res = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=15')
    const jsonData: TimeSeriesType = await res.json()

    return { props: { jsonData }, revalidate: 60*60*24 }
}




export {getStaticProps}


