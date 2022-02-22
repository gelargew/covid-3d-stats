import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Layout from '../components/Layout'
import { ParsedUrlQuery } from "querystring";
import countries from '../countries.json'
import { TimeSeriesType } from "../types";
import { getNewCasesArray } from "../utils/toArray";
import { useEffect, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import HistoricalCases from "../components/HistoricalCases";


export default function Country({ data, countryName }: InferGetStaticPropsType<typeof getStaticProps>) {
    const casesData = data ? getNewCasesArray(data.cases) : null
    const lastUpdated = casesData ? casesData[casesData.length -1].title : null

    return (
        <>
            <main>
                <button onClick={() => console.log(data)}>SSEEEE</button>
{/*                 <h1>COVID-19 PANDEMIC STATISTICS</h1>
                <h2>{countryName}</h2>
                {
                    data ?
                    <>
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
                    </>:
                    <>
                        <h2>Failed to get data from &quot;https://disease.sh/v3/covid-19/historical/{countryName}&quot;</h2>
                    </>
                } */}

                
            </main>
        </>
        
    )
}

interface Props {
    data?: any,
    lastUpdated?: string,
    countryName: string
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

    
    const data = await import('../../covid_data/countries_info.json')


    
    return {
        props: { data, countryName },
        revalidate: 60*60*6
    }
}



export const getStaticPaths: GetStaticPaths<Params> = async () => {
    const paths = []
    
    for (const country in countries) {
        //@ts-ignore
        const slug: string = countries[country].slug
        paths.push({ params: { country: slug }})
    }



    return { paths: [], fallback: 'blocking' }
}