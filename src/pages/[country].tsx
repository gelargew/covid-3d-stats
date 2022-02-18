import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Layout from '../components/Layout'
import { ParsedUrlQuery } from "querystring";
import countries from '../countries.json'
import { TimeSeriesType } from "../types";
import { getNewCasesArray } from "../utils/toArray";
import { useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import HistoricalCases from "../components/HistoricalCases";
import { Reflector } from "../components/Reflector";

export default function Country({ jsonData }: InferGetStaticPropsType<typeof getStaticProps>) {

    const data = jsonData ? jsonData.timeline : null
    const casesData = data ? getNewCasesArray(data.cases) : null
    const lastUpdated = casesData ? casesData[casesData.length -1].title : null


    return (
        <>
            <main>
                <h1>COVID-19 PANDEMIC STATISTICS</h1>
                {
                    jsonData && data ?
                    <>
                        <h2>{jsonData.country}</h2>
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
                                <button className='back-button' >BACK</button>
                            </div>

                        </section>                   
                    </>
                    :
                    <h2>
                        Failed to get data 
                    </h2>
                }

                
            </main>
        </>
        
    )
}

interface Props {
    jsonData: CountryHistoricalType | undefined
}

interface Params extends ParsedUrlQuery {
    country: string
}

interface CountryHistoricalType {
    country: string,
    province : string[],
    timeline: TimeSeriesType
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
    const params = context.params!
    const { country } = params
    const countryName = country.replace(/-/g, ' ')
    let iso3 = ''
    for (const c in countries) {      
        if (c === countryName) {
            //@ts-ignore
            iso3 = countries[countryName].iso3
            break
        }
    }
    const url = `https://disease.sh/v3/covid-19/historical/${iso3}?lastdays=360`
    const res = await fetch(url)
    const jsonData = await res.json()
    
    if (!res.ok) {
        throw new Error(`Failed to get data from "${url}", received status ${res.status}`)
    }
    
    return {
        props: { jsonData },
        revalidate: 60*60*24
    }
}



export const getStaticPaths: GetStaticPaths<Params> = async () => {
    const paths = []
    
    for (const country in countries) {
        //@ts-ignore
        const slug: string = countries[country].slug
        paths.push({ params: { country: slug }})
    }



    return { paths, fallback: true }
}