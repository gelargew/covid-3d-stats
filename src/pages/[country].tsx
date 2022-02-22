import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import countries from '../../covid_data/countries_info.json'
import { TimeSeriesType } from "../types";
import { getNewCasesArray } from "../utils/toArray";
import { Canvas } from "@react-three/fiber";
import HistoricalCases from "../components/HistoricalCases";
import { Reflector } from "../components/Reflector";



export default function Country({ data, countryName }: InferGetStaticPropsType<typeof getStaticProps>) {
    const casesData = data ? getNewCasesArray(data.cases) : null
    const lastUpdated = casesData ? casesData[casesData.length -1].title : null

    return (
        <>
            <main>
                <h1>COVID-19 PANDEMIC STATISTICS</h1>
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
                                <button className='back-button' ><img src='/icon-back.svg' /></button>
                            </div>

                        </section>                   
                    </>:
                    <>
                        <h2>Failed to get data from &quot;https://disease.sh/v3/covid-19/historical/{countryName}&quot;</h2>
                    </>
                }

                
            </main>
        </>
        
    )
}



interface Props {
    data: TimeSeriesType,
    lastUpdated?: string,
    countryName: string
}

interface Params extends ParsedUrlQuery {
    country: string
}



export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
    const params = context.params!
    const { country } = params
    const countryName = country.replace(/-/g, ' ')
    const res = await import(`../../covid_data/historical_all/${country}.json`)
    const data: TimeSeriesType = JSON.parse(JSON.stringify(res))



    
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



    return { paths, fallback: 'blocking' }
}