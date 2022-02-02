import Head from 'next/head'
import { GetServerSideProps, GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType } from "next"
import { useEffect, useState } from "react"
import BarChart from '../components/BarChart'
import { CasesType, NewCasesType, TimeSeriesType } from '../types'
import TimeSeriesChart from '../components/TimeSeriesChart'
import Layout from '../components/Layout'
import { fetchSummary } from '../utils/fetch'
import { useAtom } from 'jotai'
import { allCountries } from '../storage'




export default function Home({ jsonData }: InferGetStaticPropsType<typeof getStaticProps>) {
    const {cases, deaths}: TimeSeriesType = jsonData


    return (
        <>
            <main>
                <TimeSeriesChart data={cases} />
            </main>
        </>
        
    )
}


const getStaticProps: GetStaticProps = async () => {
    const res = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=360')
    const jsonData: TimeSeriesType = await res.json()

    return { props: { jsonData }, revalidate: 60*60*24 }
}




export {getStaticProps}


