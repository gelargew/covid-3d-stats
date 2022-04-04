import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import countries from '../../covid_data/countries_info.json'
import { TimeSeriesType } from "../types";
import { getNewCasesArray } from "../utils/toArray";
import { Canvas } from "@react-three/fiber";
import HistoricalCases from "../components/HistoricalCases";
import { Reflector } from "../components/Reflector";
import Head from "next/head";



export default function Country({ data, countryInfo }: InferGetStaticPropsType<typeof getStaticProps>) {
    const casesData = getNewCasesArray(data.cases)
    const lastUpdated = new Date(casesData[casesData.length -1].title).toDateString()

    return (
        <>
            <Head>
                <title>{countryInfo.name}</title>
            </Head>
            <main>
                {
                    data ?
                    <>
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
                    </>:
                    <>
                        <h2>Failed to get data from &quot;https://disease.sh/v3/covid-19/historical/{countryInfo.name}&quot;</h2>
                    </>
                }

                
            </main>
        </>
        
    )
}



interface Props {
    data: TimeSeriesType,
    lastUpdated?: string,
    countryInfo: {
        name: string,
        slug: string,
        iso3: string,
        flagURL: string
    }
}

interface Params extends ParsedUrlQuery {
    country: string
}



export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
    const params = context.params!
    const { country } = params
    const countryName = country.replace(/-/g, ' ')
    //@ts-ignore
    const countryInfo = countries[countryName]
    const res = await import(`../../covid_data/historical_all/${country}.json`)
    const data: TimeSeriesType = JSON.parse(JSON.stringify(res))



    
    return {
        props: { 
            data, 
            countryInfo: {
                name: countryName,
                slug: country,
                iso3: countryInfo.slug,
                flagURL: countryInfo.flag
            } 
        }
    }
}



export const getStaticPaths: GetStaticPaths<Params> = async () => {
    const paths = []
    
    for (const country in countries) {
        //@ts-ignore
        const slug: string = countries[country].slug
        paths.push({ params: { country: slug }})
    }



    return { paths, fallback: 'blocking' }
}